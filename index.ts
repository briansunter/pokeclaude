#!/usr/bin/env bun

import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import {
	FIELD_PRESETS,
	type FieldSelection,
	filterFields,
	safeJsonStringify,
} from './src/common.js';
import { DuckDBClient } from './src/db.js';
import type { Card, TypeStats } from './src/types.js';

// Re-export for backward compatibility
export type { Card, TypeStats };
export { DuckDBClient, FIELD_PRESETS, filterFields, safeJsonStringify };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Find data directory by searching upward from current location
function findDataDirectory(): string {
	// When running from source (index.ts at root), data is in ./data
	// When running from compiled (dist/index.js), data is in ../data
	// When running from installed package, data is in ./data

	const possiblePaths = [
		path.join(__dirname, '../data/pokemon_pocket_cards.csv'), // dist/index.js -> project root
		path.join(__dirname, './data/pokemon_pocket_cards.csv'), // installed package or source
	];

	for (const dataPath of possiblePaths) {
		if (existsSync(dataPath)) {
			return dataPath;
		}
	}

	// Fallback to relative path (will fail if file doesn't exist)
	return path.join(__dirname, './data/pokemon_pocket_cards.csv');
}

const CSV_PATH = findDataDirectory();

// Field selection schema
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

// Tool input schemas
const searchCardsInputSchema = {
	name: z
		.string()
		.optional()
		.describe('Card name to search for (partial match)'),
	type: z
		.string()
		.optional()
		.describe('Pokemon type (Fire, Water, Grass, etc.)'),
	minHp: z.number().optional().describe('Minimum HP'),
	maxHp: z.number().optional().describe('Maximum HP'),
	set: z.string().optional().describe('Set code (A1, A2, A3, etc.)'),
	hasAttacks: z
		.boolean()
		.optional()
		.describe('Filter by whether card has attacks'),
	retreatCost: z.number().optional().describe('Retreat cost (0-4)'),
	weakness: z.string().optional().describe('Weakness type'),
	limit: z
		.number()
		.optional()
		.describe('Maximum results to return (default 50)'),
	uniqueOnly: z
		.boolean()
		.optional()
		.describe('Return only unique cards (default: true)'),
	fields: fieldSelectionSchema.describe(
		'Field selection: minimal, basic (default), full, or custom array'
	),
} as const;

const getCardInputSchema = {
	name: z.string().describe('Exact card name'),
	fields: fieldSelectionSchema.describe('Field selection'),
} as const;

const findSynergiesInputSchema = {
	cardName: z.string().describe('Name of the main card to build around'),
	fields: fieldSelectionSchema.describe('Field selection'),
} as const;

const findCountersInputSchema = {
	targetType: z
		.string()
		.describe('Pokemon type to counter (Fire, Water, Grass, etc.)'),
	fields: fieldSelectionSchema.describe('Field selection'),
} as const;

const queryCardsInputSchema = {
	sql: z.string().describe('SQL query to execute (SELECT only)'),
	fields: fieldSelectionSchema.describe('Field selection'),
} as const;

const listTrainersInputSchema = {
	limit: z
		.number()
		.optional()
		.describe('Maximum results to return (default 50)'),
	fields: fieldSelectionSchema.describe('Field selection'),
} as const;

const analyzeDeckInputSchema = {
	cardNames: z
		.array(z.string())
		.describe('Array of card names in the deck (20 cards max)'),
} as const;

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

// Initialize DuckDB client
const dbClient = new DuckDBClient(CSV_PATH);

// Create MCP server
const server = new McpServer({
	name: 'pokeclaude',
	version: '2.0.0',
	description:
		'Pokemon TCG Pocket deck builder (20-card format, Energy Zone system, 3-point win). Includes 2000+ cards.',
});

// Register tools
server.registerTool(
	'search_cards',
	{
		title: 'Search Pokemon Cards',
		description: 'Search for Pokemon cards, Trainers, and Items using filters.',
		inputSchema: searchCardsInputSchema,
	},
	async (params) => {
		const { fields, ...filters } = params;
		const results = await dbClient.searchCards(filters);
		const filtered = filterFields(results, fields || 'basic');
		return { content: [{ type: 'text', text: safeJsonStringify(filtered) }] };
	}
);

server.registerTool(
	'get_card',
	{
		title: 'Get Card Details',
		description:
			'Get detailed information about a specific card by exact name.',
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
		return { content: [{ type: 'text', text: safeJsonStringify(filtered) }] };
	}
);

server.registerTool(
	'find_synergies',
	{
		title: 'Find Card Synergies',
		description: 'Find cards that synergize well with a given Pokemon.',
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
		return { content: [{ type: 'text', text: safeJsonStringify(filtered) }] };
	}
);

server.registerTool(
	'find_counters',
	{
		title: 'Find Counter Cards',
		description: 'Find cards that counter a specific type.',
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
		return { content: [{ type: 'text', text: safeJsonStringify(filtered) }] };
	}
);

server.registerTool(
	'get_type_stats',
	{
		title: 'Get Type Statistics',
		description: 'Get statistics about card types.',
		inputSchema: {},
	},
	async () => {
		const stats = await dbClient.getTypeStats();
		return { content: [{ type: 'text', text: safeJsonStringify(stats) }] };
	}
);

server.registerTool(
	'query_cards',
	{
		title: 'Custom SQL Query',
		description: 'Run a custom SQL query against the cards table.',
		inputSchema: queryCardsInputSchema,
	},
	async ({ sql, fields }: { sql: string; fields?: FieldSelection }) => {
		try {
			if (!sql.trim().toUpperCase().startsWith('SELECT')) {
				return {
					content: [{ type: 'text', text: 'Only SELECT queries are allowed' }],
					isError: true,
				};
			}
			const results = await dbClient.query(sql);
			const filtered = filterFields(results, fields || 'basic');
			return { content: [{ type: 'text', text: safeJsonStringify(filtered) }] };
		} catch (err: unknown) {
			const error = err as Error;
			return {
				content: [{ type: 'text', text: `Query error: ${error.message}` }],
				isError: true,
			};
		}
	}
);

server.registerTool(
	'list_trainers',
	{
		title: 'List All Trainers and Items',
		description: 'Get a list of all available Trainer and Item cards.',
		inputSchema: listTrainersInputSchema,
	},
	async ({ limit, fields }: { limit?: number; fields?: FieldSelection }) => {
		const trainers = await dbClient.query(`
			SELECT DISTINCT ON (name) *
			FROM cards
			WHERE type IS NULL AND name NOT LIKE '%Energy%'
			ORDER BY name
			LIMIT ${limit || 50}
		`);
		const filtered = filterFields(trainers, fields || 'minimal');
		return { content: [{ type: 'text', text: safeJsonStringify(filtered) }] };
	}
);

server.registerTool(
	'analyze_deck',
	{
		title: 'Analyze Deck Composition',
		description: 'Analyze deck for Pokemon TCG Pocket rules compliance.',
		inputSchema: analyzeDeckInputSchema,
	},
	async ({ cardNames }: { cardNames: string[] }) => {
		const cards = await Promise.all(
			cardNames.map((name) => dbClient.getCardByName(name))
		);
		const validCards = cards.filter((c) => c !== null) as Card[];

		const typeCount: Record<string, number> = {};
		const energyTypes: Record<string, number> = {};
		const uniqueEnergyTypes = new Set<string>();
		let pokemonCount = 0;
		let trainerCount = 0;
		let exCount = 0;
		let basicCount = 0;

		for (const card of validCards) {
			if (card.type) {
				pokemonCount++;
				typeCount[card.type] = (typeCount[card.type] || 0) + 1;
				if (card.name.includes(' ex')) exCount++;
				if (!card.name.includes('(')) basicCount++;
			} else {
				trainerCount++;
			}

			if (card.attacks) {
				const energyCost = await dbClient.analyzeEnergyCost(card.attacks);
				for (const [type, count] of Object.entries(energyCost.types)) {
					energyTypes[type] = (energyTypes[type] || 0) + count;
					uniqueEnergyTypes.add(type);
				}
			}
		}

		const warnings = [];
		if (cardNames.length !== 20)
			warnings.push(
				`Deck must be exactly 20 cards (current: ${cardNames.length})`
			);
		if (uniqueEnergyTypes.size > 2)
			warnings.push(`3+ Energy types detected. Recommend 1-2 types`);
		if (basicCount < 5)
			warnings.push(`Only ${basicCount} Basic Pokemon. Recommend 5-6 minimum`);
		if (pokemonCount < 12 || pokemonCount > 15)
			warnings.push(
				`Pokemon count (${pokemonCount}) outside recommended range`
			);

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
						energyTypeCount: uniqueEnergyTypes.size,
						energyTypes: Array.from(uniqueEnergyTypes),
						typeDistribution: typeCount,
						warnings,
						rulesCompliant: warnings.length === 0,
					}),
				},
			],
		};
	}
);

// Register resources
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

server.registerResource(
	'unique-cards',
	'pokemon://cards/unique',
	{
		title: 'Unique Pokemon Cards',
		description: 'One version of each unique card',
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

// Register prompts
server.registerPrompt(
	'build-deck',
	{
		title: 'Build Deck Around Card',
		description: 'Generate a Pokemon TCG Pocket deck strategy',
		argsSchema: buildDeckArgsSchema,
	},
	({ mainCard, strategy }) => ({
		messages: [
			{
				role: 'user',
				content: {
					type: 'text',
					text: `Build a ${strategy || 'competitive'} Pokemon TCG Pocket deck centered around ${mainCard}.`,
				},
			},
		],
	})
);

server.registerPrompt(
	'counter-deck',
	{
		title: 'Build Counter Deck',
		description: 'Build a deck to counter a specific type or strategy',
		argsSchema: counterDeckArgsSchema,
	},
	({ targetType, sets }) => ({
		messages: [
			{
				role: 'user',
				content: {
					type: 'text',
					text: `Build a Pokemon TCG Pocket deck that counters ${targetType} decks${sets ? ` using cards from sets: ${sets}` : ''}.`,
				},
			},
		],
	})
);

server.registerPrompt(
	'optimize-deck',
	{
		title: 'Optimize Deck',
		description: 'Analyze and suggest improvements for an existing deck',
		argsSchema: optimizeDeckArgsSchema,
	},
	({ deckList }) => ({
		messages: [
			{
				role: 'user',
				content: {
					type: 'text',
					text: `Analyze and optimize this Pokemon TCG Pocket deck: ${deckList}`,
				},
			},
		],
	})
);

// Export serve function for CLI integration
export async function serveMcp(): Promise<void> {
	const transport = new StdioServerTransport();
	await server.connect(transport);
	console.error('PokeClaude MCP Server running on stdio');
}

// Export runCli for CLI integration
export { runCli } from './src/cli.js';
