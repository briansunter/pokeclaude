#!/usr/bin/env node

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
	defineCommand,
	defineConfig,
	defineOptions,
	processConfig,
} from '@robingenz/zli';
import { z } from 'zod';
import {
	CardFormatter,
	type DeckAnalysis,
	type SynergyResult,
} from './formatters.js';
import { type Card, DuckDBClient } from './index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CSV_PATH = path.join(__dirname, '../data/pokemon_pocket_cards.csv');

// Read package version
const VERSION = '1.2.1';

// Output format option
const outputOption = z
	.enum(['json', 'table', 'compact'])
	.default('json')
	.describe('Output format: json, table, or compact');

// Initialize database client
const db = new DuckDBClient(CSV_PATH);

// Helper to extract output option and return rest
function separateOutput<T extends { output?: string }>(
	options: T
): { output: 'json' | 'table' | 'compact'; rest: Omit<T, 'output'> } {
	const { output = 'json', ...rest } = options;
	return {
		output: output as 'json' | 'table' | 'compact',
		rest: rest as Omit<T, 'output'>,
	};
}

// ============================================================================
// COMMAND DEFINITIONS
// ============================================================================

// 1. Search command
const searchCommand = defineCommand({
	description: 'Search for Pokemon cards with filters',
	options: defineOptions(
		z.object({
			name: z.string().optional().describe('Card name (partial match)'),
			type: z.string().optional().describe('Pokemon type (Fire, Water, etc.)'),
			minHp: z.coerce.number().optional().describe('Minimum HP'),
			maxHp: z.coerce.number().optional().describe('Maximum HP'),
			set: z.string().optional().describe('Set code (A1, A2, etc.)'),
			hasAttacks: z.boolean().optional().describe('Filter by attacks'),
			retreatCost: z.coerce.number().optional().describe('Retreat cost'),
			weakness: z.string().optional().describe('Weakness type'),
			limit: z.coerce.number().optional().describe('Max results (default 50)'),
			uniqueOnly: z
				.boolean()
				.optional()
				.describe('Unique cards only (default true)'),
			output: outputOption,
		}),
		{ n: 'name', t: 'type', o: 'output', s: 'set' }
	),
	action: async (options) => {
		const { output, rest } = separateOutput(options);
		const cards = await db.searchCards(rest);
		console.log(CardFormatter.formatCards(cards, output));
	},
});

// 2. Get command
const getCommand = defineCommand({
	description: 'Get specific card by name',
	options: defineOptions(
		z.object({
			name: z.string().describe('Card name'),
			output: outputOption,
		}),
		{ n: 'name', o: 'output' }
	),
	action: async (options) => {
		const { output, rest } = separateOutput(options);

		if (!rest.name) {
			console.error('Error: --name is required');
			process.exit(1);
		}

		const card = await db.getCardByName(rest.name);

		if (!card) {
			console.error(`Card not found: ${rest.name}`);
			process.exit(1);
		}

		console.log(CardFormatter.formatCard(card, output));
	},
});

// 3. Synergies command
const synergiesCommand = defineCommand({
	description: 'Find synergies for a card',
	options: defineOptions(
		z.object({
			cardName: z.string().describe('Card name'),
			output: outputOption,
		}),
		{ c: 'cardName', o: 'output' }
	),
	action: async (options) => {
		const { output, rest } = separateOutput(options);

		if (!rest.cardName) {
			console.error('Error: --card-name is required');
			process.exit(1);
		}

		try {
			const result = await db.findSynergies(rest.cardName);
			console.log(
				CardFormatter.formatSynergies(result as SynergyResult, output)
			);
		} catch (error) {
			console.error(
				`Error: ${error instanceof Error ? error.message : String(error)}`
			);
			process.exit(1);
		}
	},
});

// 4. Counters command
const countersCommand = defineCommand({
	description: 'Find counters for a Pokemon type',
	options: defineOptions(
		z.object({
			targetType: z.string().describe('Target type to counter'),
			limit: z.coerce.number().optional().describe('Max results'),
			output: outputOption,
		}),
		{ t: 'targetType', l: 'limit', o: 'output' }
	),
	action: async (options) => {
		const { output, rest } = separateOutput(options);

		if (!rest.targetType) {
			console.error('Error: --target-type is required');
			process.exit(1);
		}

		// Note: findCounters doesn't support limit, so we do it manually after
		const cards = await db.findCounters(rest.targetType);
		const limited = rest.limit ? cards.slice(0, rest.limit) : cards;
		console.log(CardFormatter.formatCards(limited, output));
	},
});

// 5. Stats command
const statsCommand = defineCommand({
	description: 'Show type statistics',
	options: defineOptions(
		z.object({
			output: outputOption,
		}),
		{ o: 'output' }
	),
	action: async (options) => {
		const { output } = separateOutput(options);
		const stats = await db.getTypeStats();
		console.log(CardFormatter.formatStats(stats, output));
	},
});

// 6. Query command
const queryCommand = defineCommand({
	description: 'Run custom SQL query',
	options: defineOptions(
		z.object({
			sql: z.string().describe('SQL query to execute'),
			output: outputOption,
		}),
		{ o: 'output' }
	),
	action: async (options) => {
		const { output, rest } = separateOutput(options);

		if (!rest.sql) {
			console.error('Error: --sql is required');
			process.exit(1);
		}

		// Safety check: only SELECT queries
		const sql = rest.sql.trim();
		if (!sql.toLowerCase().startsWith('select')) {
			console.error('Error: Only SELECT queries are allowed');
			process.exit(1);
		}

		try {
			const cards = await db.query(sql);
			console.log(CardFormatter.formatCards(cards, output));
		} catch (error) {
			console.error(
				`Query error: ${error instanceof Error ? error.message : String(error)}`
			);
			process.exit(1);
		}
	},
});

// 7. Trainers command
const trainersCommand = defineCommand({
	description: 'List all trainer and item cards',
	options: defineOptions(
		z.object({
			limit: z.coerce.number().optional().describe('Max results (default 50)'),
			output: outputOption,
		}),
		{ l: 'limit', o: 'output' }
	),
	action: async (options) => {
		const { output, rest } = separateOutput(options);
		const limit = rest.limit || 50;

		const trainers = await db.query(`
      SELECT DISTINCT ON (name, type, hp, attacks, weakness, retreat_cost)
        name, type, hp, attacks, weakness, retreat_cost
      FROM cards
      WHERE type IS NULL
        AND name NOT LIKE '%Energy%'
      ORDER BY name
      LIMIT ${limit}
    `);

		console.log(CardFormatter.formatCards(trainers, output));
	},
});

// 8. Analyze command
const analyzeCommand = defineCommand({
	description: 'Analyze deck composition',
	options: defineOptions(
		z.object({
			cardNames: z.array(z.string()).describe('Card names in deck'),
			output: outputOption,
		}),
		{ c: 'card-names', o: 'output' }
	),
	action: async (options) => {
		const { output, rest } = separateOutput(options);

		if (!rest.cardNames || rest.cardNames.length === 0) {
			console.error('Error: --card-names is required');
			process.exit(1);
		}

		const cards = await Promise.all(
			rest.cardNames.map((name) => db.getCardByName(name))
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

				if (card.name.includes(' ex')) {
					exCount++;
				}

				if (!card.name.includes('(')) {
					basicCount++;
				}
			} else {
				trainerCount++;
			}

			if (card.attacks) {
				const energyCost = await db.analyzeEnergyCost(card.attacks);
				for (const [type, count] of Object.entries(energyCost.types)) {
					energyTypes[type] = (energyTypes[type] || 0) + count;
					uniqueEnergyTypes.add(type);
				}
			}
		}

		const energyTypeCount = uniqueEnergyTypes.size;
		const errors: string[] = [];
		const warnings: string[] = [];
		const recommendations: string[] = [];

		// Rule compliance checks
		if (rest.cardNames.length !== 20) {
			warnings.push(
				`Deck must be exactly 20 cards (current: ${rest.cardNames.length})`
			);
		}
		if (energyTypeCount > 2) {
			warnings.push(
				`${energyTypeCount}+ Energy types detected. Recommend 1-2 types for Energy Zone consistency`
			);
		}
		if (basicCount < 5) {
			warnings.push(
				`Only ${basicCount} Basic Pokemon detected. Recommend 5-6 minimum`
			);
		}
		if (pokemonCount < 12 || pokemonCount > 15) {
			warnings.push(
				`Pokemon count (${pokemonCount}) outside recommended range. Suggest 12-15 Pokemon, 5-8 Trainers`
			);
		}

		// Recommendations
		if (trainerCount < 5) {
			recommendations.push(
				'Add more Trainer cards for consistency (aim for 5-8)'
			);
		}
		if (exCount === 0) {
			recommendations.push(
				'Consider adding Pokemon ex for faster wins (2 points per KO)'
			);
		}
		if (basicCount < 5) {
			recommendations.push(
				'Add more Basic Pokemon to ensure consistent starts'
			);
		}

		const analysis: DeckAnalysis = {
			isValid: warnings.length === 0 && rest.cardNames.length === 20,
			errors,
			warnings,
			summary: {
				totalCards: rest.cardNames.length,
				pokemonCount,
				trainerCount,
				energyTypes: Array.from(uniqueEnergyTypes),
				basicPokemon: basicCount,
				evolutionPokemon: pokemonCount - basicCount,
				exPokemon: exCount,
			},
			typeDistribution: typeCount,
			energyCurve: energyTypes,
			recommendations,
		};

		console.log(CardFormatter.formatDeckAnalysis(analysis, output));
	},
});

// ============================================================================
// CLI CONFIGURATION
// ============================================================================

export const cliConfig = defineConfig({
	meta: {
		name: 'pokemon-pocket-mcp',
		version: VERSION,
		description: 'Pokemon TCG Pocket card database CLI',
	},
	commands: {
		search: searchCommand,
		get: getCommand,
		synergies: synergiesCommand,
		counters: countersCommand,
		stats: statsCommand,
		query: queryCommand,
		trainers: trainersCommand,
		analyze: analyzeCommand,
	},
});

// ============================================================================
// CLI ENTRY POINT
// ============================================================================

export async function runCli(args: string[]): Promise<number> {
	try {
		const result = processConfig(cliConfig, args);
		if (result.command) {
			await result.command.action(result.options, result.args);
		}
		return 0;
	} catch (error) {
		if (error instanceof Error) {
			// Zli handles help/version, so we only need to handle other errors
			if (error.message && !error.message.includes('Unknown command')) {
				console.error(`Error: ${error.message}`);
			}
		} else {
			console.error('Error:', String(error));
		}
		return 1;
	}
}
