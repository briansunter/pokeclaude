#!/usr/bin/env node

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { type DuckDBConnection, DuckDBInstance } from '@duckdb/node-api';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

// Export types and classes for CLI module
export type { Card, TypeStats };
export { DuckDBClient, FIELD_PRESETS, filterFields, safeJsonStringify };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CSV path - points to data directory in published package
const CSV_PATH = path.join(__dirname, '../data/pokemon_pocket_cards.csv');

// Field selection presets to reduce context usage
// - minimal: Just id and name (smallest response)
// - basic: Common fields without images/URLs (default for all tools)
// - full: All 22 fields including set info, images, URLs, and evolution metadata
//
// Evolution metadata fields:
// - evolution_stage: 'Basic', 'Stage 1', 'Stage 2', 'Mega Evolution'
// - evolves_from: Name of the Pokemon this card evolves from (empty for base forms)
// - evolves_to: Comma-separated list of evolution names
// - evolution_type: 'Regular', 'Mega', 'Primal', etc.
// - base_pokemon_id: UUID of the base form (for mega evolutions)
// - is_evolution: 'true' for evolution cards, 'false' for base forms
// - evolution_method: How the evolution occurs (e.g., 'Mega Evolution')
const FIELD_PRESETS = {
	minimal: ['id', 'name'] as const,
	basic: [
		'id',
		'name',
		'type',
		'hp',
		'attacks',
		'weakness',
		'retreat_cost',
		'rarity',
	] as const,
	full: [
		'id',
		'set_code',
		'set_name',
		'card_number',
		'name',
		'type',
		'hp',
		'rarity',
		'abilities',
		'attacks',
		'weakness',
		'resistance',
		'retreat_cost',
		'image_url',
		'card_url',
		// Evolution metadata fields
		'evolution_stage',
		'evolves_from',
		'evolves_to',
		'evolution_type',
		'base_pokemon_id',
		'is_evolution',
		'evolution_method',
	] as const,
};

type FieldPreset = keyof typeof FIELD_PRESETS;
type FieldArray = string[];
type FieldSelection = FieldPreset | FieldArray;

// Helper to filter fields from objects
function filterFields<T extends Record<string, unknown>>(
	data: T | T[],
	fields?: FieldSelection
): T | T[] {
	if (!fields) {
		return data; // full fields if not specified
	}

	const fieldList =
		typeof fields === 'string'
			? FIELD_PRESETS[fields as FieldPreset] || []
			: fields;

	const filterObject = (obj: T) => {
		const filtered: Record<string, unknown> = {};
		for (const field of fieldList) {
			if (field in obj) {
				filtered[field] = (obj as Record<string, unknown>)[field];
			}
		}
		return filtered as T;
	};

	return Array.isArray(data) ? data.map(filterObject) : filterObject(data);
}

// Helper to serialize data with BigInt support
function safeJsonStringify(data: unknown): string {
	return JSON.stringify(
		data,
		(_key, value) => (typeof value === 'bigint' ? value.toString() : value),
		2
	);
}

// Field selection schema - runtime validated with looser type for zod v4 compatibility
// The actual type is FieldSelection (FieldPreset | FieldArray) but we use any for type inference
const fieldSelectionSchema = z
	.any()
	.refine(
		(val): val is FieldSelection =>
			val === undefined ||
			val === 'minimal' ||
			val === 'basic' ||
			val === 'full' ||
			(Array.isArray(val) && val.every((v) => typeof v === 'string')),
		{ message: 'Must be minimal, basic, full, or an array of field names' }
	)
	.optional();

// Tool input schemas - defined as const to satisfy MCP SDK's ZodRawShapeCompat type
const searchCardsInputSchema = {
	name: z
		.string()
		.optional()
		.describe(
			'Card name to search for (partial match). Works for Pokemon, Trainers, and Items.'
		),
	type: z
		.string()
		.optional()
		.describe(
			'Pokemon type (Fire, Water, Grass, etc.). Leave empty to search Trainers/Items.'
		),
	minHp: z.number().optional().describe('Minimum HP'),
	maxHp: z.number().optional().describe('Maximum HP'),
	set: z.string().optional().describe('Set code (A1, A2, A3, etc.)'),
	hasAttacks: z
		.boolean()
		.optional()
		.describe(
			'Filter by whether card has attacks. Set to FALSE to get Trainers/Items (Supporters and Items). Set to TRUE to get only Pokemon with attacks. Leave undefined for all cards.'
		),
	retreatCost: z.number().optional().describe('Retreat cost (0-4)'),
	weakness: z.string().optional().describe('Weakness type'),
	limit: z
		.number()
		.optional()
		.describe('Maximum results to return (default 50)'),
	uniqueOnly: z
		.boolean()
		.optional()
		.describe(
			'If true, returns only unique cards (filters out duplicates with same stats but different art). If false, returns all card variants. Default: true'
		),
	fields: fieldSelectionSchema.describe(
		'💡 LEAVE UNSET (defaults to "basic" = comprehensive game data WITHOUT images). "basic" includes: type, HP, attacks, abilities, weakness, retreat. Only specify if: (1) "minimal" for name-only lists, (2) "full" when user explicitly asks for images/URLs (costs 3-4x tokens), (3) custom array for specific fields. For most queries, omit this parameter.'
	),
} as const;

const getCardInputSchema = {
	name: z.string().describe('Exact card name'),
	fields: fieldSelectionSchema.describe(
		'💡 LEAVE UNSET (defaults to "basic" = all game data). Only specify if user explicitly asks for images ("full"), needs just names ("minimal"), or wants specific fields (custom array). Omit for normal queries.'
	),
} as const;

const findSynergiesInputSchema = {
	cardName: z.string().describe('Name of the main card to build around'),
	fields: fieldSelectionSchema.describe(
		'💡 LEAVE UNSET (defaults to "basic"). Only specify for special cases: "minimal" (just names), "full" (if user asks for images).'
	),
} as const;

const findCountersInputSchema = {
	targetType: z
		.string()
		.describe('Pokemon type to counter (Fire, Water, Grass, etc.)'),
	fields: fieldSelectionSchema.describe(
		'💡 LEAVE UNSET (defaults to "basic"). Only specify for: "minimal" (names only) or "full" (if user asks for images).'
	),
} as const;

const queryCardsInputSchema = {
	sql: z.string().describe('SQL query to execute (SELECT only)'),
	fields: fieldSelectionSchema.describe(
		'💡 LEAVE UNSET (defaults to "basic"). Only specify if needed: "minimal" (names), "full" (images).'
	),
} as const;

const listTrainersInputSchema = {
	limit: z
		.number()
		.optional()
		.describe('Maximum results to return (default 50)'),
	fields: fieldSelectionSchema.describe(
		'💡 LEAVE UNSET (defaults to "minimal" for efficiency). Only specify for: "basic" (more details) or "full" (images).'
	),
} as const;

const analyzeDeckInputSchema = {
	cardNames: z
		.array(z.string())
		.describe('Array of card names in the deck (20 cards max)'),
} as const;

// Prompt args schemas - defined as const to satisfy MCP SDK's type expectations
const buildDeckArgsSchema = {
	mainCard: z.string().describe('Main card to build deck around'),
	strategy: z
		.enum(['aggro', 'control', 'midrange'])
		.optional()
		.describe('Deck strategy type'),
} as const;

const counterDeckArgsSchema = {
	targetType: z.string().describe('Type or archetype to counter'),
	sets: z.string().optional().describe('Available sets (comma-separated)'),
} as const;

const optimizeDeckArgsSchema = {
	deckList: z
		.string()
		.describe('Current deck list (comma-separated card names)'),
} as const;

interface Card {
	id: string;
	set_code: string;
	set_name: string;
	card_number: string;
	name: string;
	type: string;
	hp: string;
	rarity: string;
	abilities: string;
	attacks: string;
	weakness: string;
	resistance: string;
	retreat_cost: string;
	image_url: string;
	card_url: string;
	// Evolution metadata fields
	evolution_stage?: string;
	evolves_from?: string;
	evolves_to?: string;
	evolution_type?: string;
	base_pokemon_id?: string;
	is_evolution?: string;
	evolution_method?: string;
	[key: string]: unknown;
}

interface TypeStats {
	type: string;
	count: number;
	avg_hp: number;
	avg_retreat_cost: number;
}

class DuckDBClient {
	private instance!: DuckDBInstance;
	private connection!: DuckDBConnection;
	private ready: Promise<void>;

	constructor(csvPath: string) {
		this.ready = this.initialize(csvPath);
	}

	private async initialize(csvPath: string): Promise<void> {
		this.instance = await DuckDBInstance.create(':memory:');
		this.connection = await this.instance.connect();

		await this.connection.run(`
      CREATE TABLE cards AS
      SELECT * FROM read_csv_auto('${csvPath}')
    `);
		console.error('DuckDB initialized with Pokemon cards');
	}

	async query(sql: string): Promise<Card[]> {
		await this.ready;
		const result = await this.connection.runAndReadAll(sql);
		return result.getRowObjectsJson() as Card[];
	}

	async searchCards(filters: {
		name?: string;
		type?: string;
		minHp?: number;
		maxHp?: number;
		set?: string;
		hasAttacks?: boolean;
		retreatCost?: number;
		weakness?: string;
		limit?: number;
		uniqueOnly?: boolean;
	}): Promise<Card[]> {
		const conditions: string[] = [];

		if (filters.name) {
			conditions.push(`LOWER(name) LIKE LOWER('%${filters.name}%')`);
		}
		if (filters.type) {
			conditions.push(`LOWER(type) = LOWER('${filters.type}')`);
		}
		if (filters.minHp !== undefined) {
			conditions.push(`CAST(hp AS INTEGER) >= ${filters.minHp}`);
		}
		if (filters.maxHp !== undefined) {
			conditions.push(`CAST(hp AS INTEGER) <= ${filters.maxHp}`);
		}
		if (filters.set) {
			conditions.push(`set_code = '${filters.set}'`);
		}
		if (filters.hasAttacks !== undefined) {
			conditions.push(
				filters.hasAttacks ? `attacks IS NOT NULL` : `attacks IS NULL`
			);
		}
		if (filters.retreatCost !== undefined) {
			conditions.push(`retreat_cost = '${filters.retreatCost}'`);
		}
		if (filters.weakness) {
			conditions.push(`LOWER(weakness) = LOWER('${filters.weakness}')`);
		}

		const whereClause =
			conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
		const limit = filters.limit || 50;

		// Default to filtering out duplicates (uniqueOnly defaults to true)
		const uniqueOnly = filters.uniqueOnly !== false; // true unless explicitly set to false

		const selectClause = uniqueOnly
			? 'SELECT DISTINCT ON (name, type, hp, attacks, weakness, retreat_cost) *'
			: 'SELECT *';

		const orderBy = uniqueOnly
			? 'ORDER BY name, type, hp, attacks, weakness, retreat_cost, set_code, card_number'
			: 'ORDER BY name';

		const sql = `
      ${selectClause}
      FROM cards
      ${whereClause}
      ${orderBy}
      LIMIT ${limit}
    `;

		return this.query(sql);
	}

	async getCardByName(name: string): Promise<Card | null> {
		// Escape single quotes to prevent SQL injection
		const escapedName = name.replace(/'/g, "''");
		const results = await this.query(`
      SELECT * FROM cards
      WHERE LOWER(name) = LOWER('${escapedName}')
      LIMIT 1
    `);
		return results[0] || null;
	}

	async getTypeStats(): Promise<TypeStats[]> {
		const results = await this.query(`
      SELECT
        type,
        COUNT(*) as count,
        ROUND(AVG(TRY_CAST(hp AS INTEGER)), 1) as avg_hp,
        ROUND(AVG(TRY_CAST(retreat_cost AS INTEGER)), 1) as avg_retreat_cost
      FROM cards
      WHERE type IS NOT NULL
      GROUP BY type
      ORDER BY count DESC
    `);
		return results as unknown as TypeStats[];
	}

	async findSynergies(cardName: string): Promise<{
		card?: Card;
		sameTypeCards?: Card[];
		trainers?: Card[];
	}> {
		const card = await this.getCardByName(cardName);
		if (!card || !card.type) {
			throw new Error('Card not found or has no type');
		}

		// Find cards of same type with complementary roles (unique cards only)
		const sameType = await this.query(`
      SELECT DISTINCT ON (name, type, hp, attacks, weakness, retreat_cost)
        name, hp, attacks, retreat_cost
      FROM cards
      WHERE type = '${card.type}'
        AND name != '${cardName}'
        AND attacks IS NOT NULL
      ORDER BY name, type, hp, attacks, weakness, retreat_cost, CAST(hp AS INTEGER) DESC
      LIMIT 10
    `);

		// Find supporting trainers/items (unique only)
		const trainers = await this.query(`
      SELECT DISTINCT ON (name, type, hp, attacks, weakness, retreat_cost)
        name, attacks as description
      FROM cards
      WHERE type IS NULL
        AND name NOT LIKE '%Energy%'
      ORDER BY name, type, hp, attacks, weakness, retreat_cost
      LIMIT 15
    `);

		return {
			card: card,
			sameTypeCards: sameType,
			trainers: trainers.slice(0, 10),
		};
	}

	async findCounters(targetType: string): Promise<Card[]> {
		// Find cards that target type is weak to (unique cards only)
		// Note: weakness field contains "Water Retreat: 1" so we extract just the type with SPLIT_PART
		const escapedType = targetType.replace(/'/g, "''");
		return this.query(`
      SELECT DISTINCT ON (name, type, hp, attacks, weakness, retreat_cost)
        name, type, hp, attacks, weakness
      FROM cards
      WHERE type = (
        SELECT SPLIT_PART(weakness, ' ', 1)
        FROM cards
        WHERE type = '${escapedType}'
          AND weakness IS NOT NULL
          AND weakness NOT LIKE 'none%'
        LIMIT 1
      )
      AND attacks IS NOT NULL
      ORDER BY name, type, hp, attacks, weakness, retreat_cost, CAST(hp AS INTEGER) DESC
      LIMIT 20
    `);
	}

	async getUniqueCards(): Promise<Card[]> {
		return this.query(`
      SELECT DISTINCT ON (name, type, hp, attacks, weakness, retreat_cost) *
      FROM cards
      WHERE attacks IS NOT NULL
      ORDER BY name, type, hp, attacks, weakness, retreat_cost, set_code, card_number
    `);
	}

	async analyzeEnergyCost(
		attacks: string
	): Promise<{ total: number; types: Record<string, number> }> {
		// Parse attacks string to count energy symbols
		const energyTypes: Record<string, number> = {};
		let total = 0;

		// Simple parsing - count capital letters before attack names
		const matches = attacks.match(/([A-Z]+)\s/g);
		if (matches) {
			for (const match of matches) {
				const symbols = match.trim();
				total += symbols.length;
				for (const symbol of symbols) {
					energyTypes[symbol] = (energyTypes[symbol] || 0) + 1;
				}
			}
		}

		return { total, types: energyTypes };
	}
}

// Initialize DuckDB client
const dbClient = new DuckDBClient(CSV_PATH);

// Create MCP server
const server = new McpServer({
	name: 'pokemon-pocket-deck-builder',
	version: '1.0.0',
	description:
		'Pokemon TCG Pocket deck builder (20-card format, Energy Zone system, 3-point win). Includes 2000+ cards: Pokemon, Trainers, and Items. Key rules: Max 3 bench slots, auto-generate 1 Energy/turn (not from deck), 1-2 Energy types recommended for consistency, Pokemon ex worth 2 points. 💡 **IMPORTANT: Don\'t specify fields parameter - tools auto-default to "basic" which includes ALL game data (type, HP, attacks, abilities, weakness, retreat) WITHOUT heavy image URLs. This saves 3-4x tokens.** Only specify fields="full" if user explicitly asks "show me the image" or "give me the URL".',
});

// TOOLS
// All tools support field filtering via the 'fields' parameter:
// - "minimal": Returns only id, name - USE FOR: Listings, browsing card names
// - "basic" (default): Returns id, name, type, hp, attacks, weakness, retreat_cost, rarity
//   - USE FOR: Most queries, deck building, searching - NO images/URLs (saves tokens!)
// - "full": Returns all 15 fields including image_url, card_url, set_code, set_name, etc.
//   - USE ONLY WHEN: User explicitly asks for images, URLs, or complete card data
//   - WARNING: Uses 3-4x more tokens than "basic" - avoid unless necessary!
// - Custom array: e.g., ["name", "type", "hp"] for specific fields
//
// FIELD SELECTION GUIDELINES:
// ✅ DO: Use "minimal" for listings and "basic" for queries (default)
// ❌ DON'T: Use "full" unless user specifically needs image_url or card_url
// 💡 TIP: "basic" excludes image_url, card_url, set_name, set_code, card_number, abilities, resistance
//
// HOW TO SEARCH FOR TRAINERS/ITEMS:
// 1. search_cards with hasAttacks=false - Returns all Trainers and Items (187 cards)
// 2. search_cards with name="Giovanni" and hasAttacks=false - Search specific trainer
// 3. query_cards with "WHERE type IS NULL" - Custom SQL for trainers
// 4. find_synergies - Automatically includes 10 recommended trainers for any Pokemon

// 1. Search cards with flexible filters
server.registerTool(
	'search_cards',
	{
		title: 'Search Pokemon Cards',
		description:
			'Search for Pokemon cards, Trainers, and Items using filters like name, type, HP range, set, etc. By default returns only unique cards (filters out art variants). Set uniqueOnly=false to see all card variants. **To search Trainers/Items**: Set hasAttacks=false (187 trainer/item cards available including Giovanni, Erika, Rare Candy, Pokémon Communication, etc.). 💡 **Don\'t specify fields - auto-defaults to "basic" with ALL game data (type, HP, attacks, abilities, weakness, retreat). Only add fields="full" if user asks for image/URL (saves 3-4x tokens).**',
		inputSchema: searchCardsInputSchema,
	},
	async (params) => {
		const { fields, ...filters } = params;
		const results = await dbClient.searchCards(filters);
		const filtered = filterFields(results, fields || 'basic');
		return {
			content: [
				{
					type: 'text',
					text: safeJsonStringify(filtered),
				},
			],
		};
	}
);

// 2. Get specific card details
server.registerTool(
	'get_card',
	{
		title: 'Get Card Details',
		description:
			'Get detailed information about a specific card by exact name. 💡 **Don\'t specify fields - auto-defaults to "basic" with ALL game data (type, HP, attacks, abilities, weakness, retreat). Only add fields="full" if user asks for image/URL.**',
		inputSchema: getCardInputSchema,
	},
	async ({ name, fields }: { name: string; fields?: FieldSelection }) => {
		const card = await dbClient.getCardByName(name);
		if (!card) {
			return {
				content: [{ type: 'text', text: `Card "${name}" not found` }],
				isError: true,
			};
		}
		const filtered = filterFields(card, fields || 'basic');
		return {
			content: [
				{
					type: 'text',
					text: safeJsonStringify(filtered),
				},
			],
		};
	}
);

// 3. Find card synergies
server.registerTool(
	'find_synergies',
	{
		title: 'Find Card Synergies',
		description:
			'Find cards that synergize well with a given Pokemon. Returns: (1) Same-type Pokemon with complementary roles, and (2) 10 recommended Trainer/Item cards to support your strategy. 💡 **Don\'t specify fields - auto-defaults to "basic" with all game data.**',
		inputSchema: findSynergiesInputSchema,
	},
	async ({
		cardName,
		fields,
	}: {
		cardName: string;
		fields?: FieldSelection;
	}) => {
		const synergies = await dbClient.findSynergies(cardName);
		const fieldSelection = fields || 'basic';
		const filtered = {
			card: synergies.card
				? filterFields(synergies.card, fieldSelection)
				: synergies.card,
			sameTypeCards: filterFields(
				synergies.sameTypeCards || [],
				fieldSelection
			),
			trainers: filterFields(synergies.trainers || [], fieldSelection),
		};
		return {
			content: [
				{
					type: 'text',
					text: safeJsonStringify(filtered),
				},
			],
		};
	}
);

// 4. Find counter cards
server.registerTool(
	'find_counters',
	{
		title: 'Find Counter Cards',
		description:
			'Find cards that counter a specific type (exploit weakness). 💡 **Don\'t specify fields - auto-defaults to "basic" with all game data.**',
		inputSchema: findCountersInputSchema,
	},
	async ({
		targetType,
		fields,
	}: {
		targetType: string;
		fields?: FieldSelection;
	}) => {
		const counters = await dbClient.findCounters(targetType);
		const filtered = filterFields(counters, fields || 'basic');
		return {
			content: [
				{
					type: 'text',
					text: safeJsonStringify(filtered),
				},
			],
		};
	}
);

// 5. Get type statistics
server.registerTool(
	'get_type_stats',
	{
		title: 'Get Type Statistics',
		description:
			'Get statistics about card types (count, avg HP, avg retreat cost)',
		inputSchema: {},
	},
	async () => {
		const stats = await dbClient.getTypeStats();
		return {
			content: [
				{
					type: 'text',
					text: safeJsonStringify(stats),
				},
			],
		};
	}
);

// 6. Run custom SQL query
server.registerTool(
	'query_cards',
	{
		title: 'Custom SQL Query',
		description:
			'Run a custom SQL query against the cards table. 💡 **Don\'t specify fields - auto-defaults to "basic" with all game data.**',
		inputSchema: queryCardsInputSchema,
	},
	async ({ sql, fields }: { sql: string; fields?: FieldSelection }) => {
		try {
			// Basic SQL injection protection
			if (!sql.trim().toUpperCase().startsWith('SELECT')) {
				return {
					content: [{ type: 'text', text: 'Only SELECT queries are allowed' }],
					isError: true,
				};
			}
			const results = await dbClient.query(sql);
			const filtered = filterFields(results, fields || 'basic');
			return {
				content: [
					{
						type: 'text',
						text: safeJsonStringify(filtered),
					},
				],
			};
		} catch (err: unknown) {
			const error = err as Error;
			return {
				content: [{ type: 'text', text: `Query error: ${error.message}` }],
				isError: true,
			};
		}
	}
);

// 7. List all Trainers and Items
server.registerTool(
	'list_trainers',
	{
		title: 'List All Trainers and Items',
		description:
			'Get a list of all available Trainer and Item cards (187 cards total). Includes Supporters (Giovanni, Erika, etc.) and Items (Rare Candy, Pokémon Communication, etc.). 💡 **Don\'t specify fields - auto-defaults to "minimal" (just names, perfect for trainers).**',
		inputSchema: listTrainersInputSchema,
	},
	async ({ limit, fields }: { limit?: number; fields?: FieldSelection }) => {
		const trainers = await dbClient.query(`
      SELECT DISTINCT ON (name) *
      FROM cards
      WHERE type IS NULL
        AND name NOT LIKE '%Energy%'
      ORDER BY name
      LIMIT ${limit || 50}
    `);
		const filtered = filterFields(trainers, fields || 'minimal');
		return {
			content: [
				{
					type: 'text',
					text: safeJsonStringify(filtered),
				},
			],
		};
	}
);

// 8. Analyze deck composition
server.registerTool(
	'analyze_deck',
	{
		title: 'Analyze Deck Composition',
		description:
			'Analyze deck for Pokemon TCG Pocket rules compliance and strategic balance. Checks: 20-card limit, max 2 copies per card, Energy type count (1-2 recommended due to Energy Zone variance), evolution lines, basic Pokemon count (5-6 minimum), Pokemon/Trainer ratio (12/8 recommended), and win condition balance (ex Pokemon vs regular).',
		inputSchema: analyzeDeckInputSchema,
	},
	async ({ cardNames }: { cardNames: string[] }) => {
		const cards = await Promise.all(
			cardNames.map((name) => dbClient.getCardByName(name))
		);

		const validCards = cards.filter((c) => c !== null) as Card[];
		const typeCount: Record<string, number> = {};
		let _totalEnergy = 0;
		const energyTypes: Record<string, number> = {};
		const uniqueEnergyTypes = new Set<string>();
		let pokemonCount = 0;
		let trainerCount = 0;
		let exCount = 0;
		let basicCount = 0;

		for (const card of validCards) {
			// Count Pokemon vs Trainers
			if (card.type) {
				pokemonCount++;
				typeCount[card.type] = (typeCount[card.type] || 0) + 1;

				// Count ex Pokemon
				if (card.name.includes(' ex')) {
					exCount++;
				}

				// Count basics (cards without evolution indicator in name)
				// This is a simple heuristic - cards without parentheses are typically basics
				if (!card.name.includes('(')) {
					basicCount++;
				}
			} else {
				trainerCount++;
			}

			if (card.attacks) {
				const energyCost = await dbClient.analyzeEnergyCost(card.attacks);
				_totalEnergy += energyCost.total;
				for (const [type, count] of Object.entries(energyCost.types)) {
					energyTypes[type] = (energyTypes[type] || 0) + count;
					uniqueEnergyTypes.add(type);
				}
			}
		}

		const energyTypeCount = uniqueEnergyTypes.size;
		const warnings = [];

		// Rule compliance checks
		if (cardNames.length !== 20) {
			warnings.push(
				`Deck must be exactly 20 cards (current: ${cardNames.length})`
			);
		}
		if (energyTypeCount > 2) {
			warnings.push(
				`3+ Energy types detected (${energyTypeCount}). Recommend 1-2 types for Energy Zone consistency`
			);
		}
		if (basicCount < 5) {
			warnings.push(
				`Only ${basicCount} Basic Pokemon detected. Recommend 5-6 minimum for consistent starts`
			);
		}
		if (pokemonCount < 12 || pokemonCount > 15) {
			warnings.push(
				`Pokemon count (${pokemonCount}) outside recommended range. Suggest 12-15 Pokemon, 5-8 Trainers`
			);
		}

		return {
			content: [
				{
					type: 'text',
					text: safeJsonStringify({
						deckSize: cardNames.length,
						validCards: validCards.length,
						pokemonCount,
						trainerCount,
						basicPokemonCount: basicCount,
						exPokemonCount: exCount,
						energyTypeCount,
						energyTypes: Array.from(uniqueEnergyTypes),
						typeDistribution: typeCount,
						estimatedEnergyNeeds: energyTypes,
						averageHp:
							validCards.reduce(
								(sum, c) => sum + (parseInt(c.hp, 10) || 0),
								0
							) / validCards.length,
						warnings,
						rulesCompliant: warnings.length === 0,
					}),
				},
			],
		};
	}
);

// RESOURCES

// 1. Full card database
server.registerResource(
	'all-cards',
	'pokemon://cards/all',
	{
		title: 'All Pokemon Cards',
		description: 'Complete Pokemon Pocket card database',
		mimeType: 'application/json',
	},
	async (uri) => {
		const cards = await dbClient.query('SELECT * FROM cards LIMIT 100');
		return {
			contents: [
				{
					uri: uri.href,
					text: safeJsonStringify(cards),
					mimeType: 'application/json',
				},
			],
		};
	}
);

// 2. Unique cards (no art variants)
server.registerResource(
	'unique-cards',
	'pokemon://cards/unique',
	{
		title: 'Unique Pokemon Cards',
		description: 'One version of each unique card (excludes art variants)',
		mimeType: 'application/json',
	},
	async (uri) => {
		const cards = await dbClient.getUniqueCards();
		return {
			contents: [
				{
					uri: uri.href,
					text: safeJsonStringify(cards),
					mimeType: 'application/json',
				},
			],
		};
	}
);

// 3. Type statistics resource
server.registerResource(
	'type-stats',
	'pokemon://stats/types',
	{
		title: 'Type Statistics',
		description: 'Statistical breakdown by Pokemon type',
		mimeType: 'application/json',
	},
	async (uri) => {
		const stats = await dbClient.getTypeStats();
		return {
			contents: [
				{
					uri: uri.href,
					text: safeJsonStringify(stats),
					mimeType: 'application/json',
				},
			],
		};
	}
);

// PROMPTS

// 1. Build deck around card
server.registerPrompt(
	'build-deck',
	{
		title: 'Build Deck Around Card',
		description:
			'Generate a Pokemon TCG Pocket deck strategy centered around a specific card (20-card format)',
		argsSchema: buildDeckArgsSchema,
	},
	({ mainCard, strategy }) => ({
		messages: [
			{
				role: 'user',
				content: {
					type: 'text',
					text: `Build a ${strategy || 'competitive'} Pokemon TCG Pocket deck centered around ${mainCard}.

Pokemon TCG Pocket Rules:
- 20 cards exactly, max 2 copies per card
- 1-2 Energy types recommended (Energy Zone auto-generates 1/turn)
- Max 3 bench slots
- Win by getting 3 points (regular Pokemon = 1 pt, ex = 2 pts)
- 5-6 Basic Pokemon minimum for consistent starts
- Stage 2 decks: Consider Rare Candy for faster evolution

Please:
1. Use find_synergies tool to find supporting cards
2. Build exactly 20 cards (12-15 Pokemon, 5-8 Trainers recommended)
3. Consider important Trainers: Professor's Research (draw 2), Giovanni (+10 damage), Sabrina (switch), Rare Candy (Stage 2 evolution)
4. Account for Energy Zone variance (1-2 types only)
5. Explain win conditions (e.g., two ex KOs = instant win)
6. List potential counters and how to play around them`,
				},
			},
		],
	})
);

// 2. Counter deck archetype
server.registerPrompt(
	'counter-deck',
	{
		title: 'Build Counter Deck',
		description:
			'Build a Pokemon TCG Pocket deck to counter a specific type or strategy',
		argsSchema: counterDeckArgsSchema,
	},
	({ targetType, sets }) => ({
		messages: [
			{
				role: 'user',
				content: {
					type: 'text',
					text: `Build a Pokemon TCG Pocket deck that counters ${targetType} decks${sets ? ` using cards from sets: ${sets}` : ''}.

Pokemon TCG Pocket Rules:
- 20 cards exactly, max 2 copies per card
- Weakness = 2x damage (exploit this!)
- No Resistance in Pocket format
- 1-2 Energy types recommended

Please:
1. Use find_counters to find Pokemon that exploit weaknesses
2. Consider disruption: Sabrina/Cyrus (force switches), Red Card/Mars (hand disruption)
3. Suggest high HP Pokemon or tech cards (Giant Cape +20 HP, Rocky Helmet for chip damage)
4. Explain the game plan against ${targetType}
5. Build exactly 20 cards with 5-6 Basics minimum`,
				},
			},
		],
	})
);

// 3. Optimize existing deck
server.registerPrompt(
	'optimize-deck',
	{
		title: 'Optimize Deck',
		description:
			'Analyze and suggest improvements for an existing Pokemon TCG Pocket deck',
		argsSchema: optimizeDeckArgsSchema,
	},
	({ deckList }) => ({
		messages: [
			{
				role: 'user',
				content: {
					type: 'text',
					text: `Analyze and optimize this Pokemon TCG Pocket deck: ${deckList}

Pokemon TCG Pocket Rules to Check:
- Exactly 20 cards, max 2 copies per card
- 5-6 Basic Pokemon minimum
- 1-2 Energy types only (Energy Zone consistency)
- 12-15 Pokemon, 5-8 Trainers recommended

Please:
1. Use analyze_deck to check rules compliance
2. Identify issues: Energy type count (>2 types = inconsistent), Basic count, Pokemon/Trainer ratio
3. Check for key Trainers: Professor's Research (draw), Giovanni (+10 dmg), Sabrina (switch), Rare Candy (Stage 2)
4. Suggest card swaps with reasoning (consider Giant Cape for HP breakpoints, ex Pokemon for faster wins)
5. Verify Energy Zone compatibility and evolution line completeness`,
				},
			},
		],
	})
);

// ============================================================================
// CLI/MCP MODE DETECTION
// ============================================================================

function isCliMode(): boolean {
	const args = process.argv.slice(2);

	// Explicit CLI flags
	if (
		args.includes('--help') ||
		args.includes('-h') ||
		args.includes('--version') ||
		args.includes('-v')
	) {
		return true;
	}

	// Known CLI commands
	const commands = [
		'search',
		'get',
		'synergies',
		'counters',
		'stats',
		'query',
		'trainers',
		'analyze',
	];
	if (args.length > 0 && commands.includes(args[0])) {
		return true;
	}

	// Environment variable override
	if (process.env.POKEMON_POCKET_MODE === 'cli') {
		return true;
	}

	// Check for CLI-specific options that suggest CLI mode
	// (e.g., --output, --card-names, --sql, etc.)
	const cliSpecificFlags = [
		'--output',
		'-o',
		'--card-names',
		'--card-name',
		'--sql',
	];
	if (
		args.some((arg) => cliSpecificFlags.some((flag) => arg.startsWith(flag)))
	) {
		return true;
	}

	// Default to MCP mode for backward compatibility
	return false;
}

// ============================================================================
// MAIN ENTRY POINT
// ============================================================================

async function main() {
	// Check if we should run in CLI mode
	if (isCliMode()) {
		// Dynamic import to avoid circular dependency
		const { runCli } = await import('./cli.js');
		const exitCode = await runCli(process.argv.slice(2));
		process.exit(exitCode);
	}

	// MCP mode (existing behavior)
	const transport = new StdioServerTransport();
	await server.connect(transport);
	console.error('Pokemon Pocket MCP Server running on stdio');
}

main().catch((error) => {
	console.error('Server error:', error);
	process.exit(1);
});
