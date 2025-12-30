import Table from 'cli-table3';
import type { Card, TypeStats } from './index.js';

export interface SynergyResult {
	card?: Card;
	sameTypeCards?: Card[];
	trainers?: Card[];
}

export interface DeckAnalysis {
	isValid: boolean;
	errors: string[];
	warnings: string[];
	summary: {
		totalCards: number;
		pokemonCount: number;
		trainerCount: number;
		energyTypes: string[];
		basicPokemon: number;
		evolutionPokemon: number;
		exPokemon: number;
	};
	typeDistribution?: Record<string, number>;
	energyCurve?: Record<string, number>;
	recommendations?: string[];
}

export type OutputFormat = 'json' | 'table' | 'compact';

// Truncate text to fit table column
function truncate(text: string | undefined, maxLen: number): string {
	if (!text) return '-';
	const str = String(text);
	return str.length > maxLen ? `${str.substring(0, maxLen - 2)}..` : str;
}

// Format attacks for display
function formatAttacks(attacks: string | undefined): string {
	if (!attacks) return '-';
	// Try to parse and format attacks nicely
	const attackList = attacks.split(', ').map((a) => a.trim());
	return attackList.map((a) => truncate(a, 40)).join(', ');
}

export class CardFormatter {
	static formatCards(cards: Card[], format: OutputFormat): string {
		if (cards.length === 0) {
			return 'No cards found.';
		}

		switch (format) {
			case 'json':
				return JSON.stringify(cards, null, 2);
			case 'table':
				return CardFormatter.formatCardsAsTable(cards);
			case 'compact':
				return CardFormatter.formatCardsAsCompact(cards);
			default:
				return JSON.stringify(cards, null, 2);
		}
	}

	static formatCard(card: Card, format: OutputFormat): string {
		switch (format) {
			case 'json':
				return JSON.stringify(card, null, 2);
			case 'table':
				return CardFormatter.formatSingleCardAsTable(card);
			case 'compact':
				return CardFormatter.formatSingleCardAsCompact(card);
			default:
				return JSON.stringify(card, null, 2);
		}
	}

	static formatSynergies(result: SynergyResult, format: OutputFormat): string {
		if (format === 'json') {
			return JSON.stringify(result, null, 2);
		}

		let output = '';

		if (result.card) {
			output += `\n${'='.repeat(60)}\n`;
			output += `  Synergies for ${result.card.name}\n`;
			output += `${'='.repeat(60)}\n\n`;
		}

		if (result.sameTypeCards && result.sameTypeCards.length > 0) {
			output += `Same Type (${result.sameTypeCards.length} cards):\n`;
			output += `${CardFormatter.formatCardsAsCompact(result.sameTypeCards)}\n\n`;
		}

		if (result.trainers && result.trainers.length > 0) {
			output += `Recommended Trainers/Items (${result.trainers.length} cards):\n`;
			output += `${CardFormatter.formatCardsAsCompact(result.trainers)}\n`;
		}

		return output;
	}

	static formatStats(stats: TypeStats[], format: OutputFormat): string {
		if (format === 'json') {
			return JSON.stringify(stats, null, 2);
		}

		const table = new Table({
			head: ['Type', 'Count', 'Avg HP', 'Avg Retreat'],
			style: { head: ['cyan', 'bold'] },
			colWidths: [12, 8, 10, 14],
		});

		for (const stat of stats) {
			table.push([
				stat.type,
				String(stat.count),
				String(stat.avg_hp),
				String(stat.avg_retreat_cost),
			]);
		}

		return table.toString();
	}

	static formatDeckAnalysis(
		analysis: DeckAnalysis,
		format: OutputFormat
	): string {
		if (format === 'json') {
			return JSON.stringify(analysis, null, 2);
		}

		let output = '\n';
		output += `${'='.repeat(50)}\n`;
		output += `  Deck Analysis\n`;
		output += `${'='.repeat(50)}\n\n`;

		// Summary
		output += `Summary:\n`;
		output += `  Total Cards: ${analysis.summary.totalCards}/20\n`;
		output += `  Pokemon: ${analysis.summary.pokemonCount}\n`;
		output += `  Trainers: ${analysis.summary.trainerCount}\n`;
		output += `  Energy Types: ${analysis.summary.energyTypes.join(', ') || 'None'}\n`;
		output += `  Basic Pokemon: ${analysis.summary.basicPokemon}\n`;
		output += `  Evolution Pokemon: ${analysis.summary.evolutionPokemon}\n`;
		output += `  Pokemon ex: ${analysis.summary.exPokemon}\n\n`;

		// Validation
		if (analysis.errors.length > 0) {
			output += `Errors:\n`;
			for (const error of analysis.errors) {
				output += `  ❌ ${error}\n`;
			}
			output += '\n';
		}

		if (analysis.warnings.length > 0) {
			output += `Warnings:\n`;
			for (const warning of analysis.warnings) {
				output += `  ⚠️  ${warning}\n`;
			}
			output += '\n';
		}

		// Type distribution
		if (analysis.typeDistribution) {
			output += `Type Distribution:\n`;
			for (const [type, count] of Object.entries(analysis.typeDistribution)) {
				output += `  ${type || 'Trainer'}: ${count}\n`;
			}
			output += '\n';
		}

		// Recommendations
		if (analysis.recommendations && analysis.recommendations.length > 0) {
			output += `Recommendations:\n`;
			for (const rec of analysis.recommendations) {
				output += `  💡 ${rec}\n`;
			}
		}

		return output;
	}

	private static formatCardsAsTable(cards: Card[]): string {
		const table = new Table({
			head: ['Name', 'Type', 'HP', 'Attacks', 'Weakness', 'Retreat'],
			style: { head: ['cyan', 'bold'] },
			wordWrap: true,
			colWidths: [25, 12, 6, 40, 12, 8],
		});

		for (const card of cards) {
			table.push([
				truncate(card.name, 23),
				card.type || '-',
				card.hp || '-',
				truncate(formatAttacks(card.attacks), 38),
				card.weakness || '-',
				card.retreat_cost || '-',
			]);
		}

		return `\n${table.toString()}\nFound ${cards.length} card(s)`;
	}

	private static formatSingleCardAsTable(card: Card): string {
		const table = new Table({
			style: { head: ['cyan', 'bold'] },
		});

		table.push(
			[{ content: card.name, colSpan: 2 }],
			['Field', 'Value'],
			['Name', card.name],
			['Set', `${card.set_name} (${card.set_code})`],
			['Card Number', card.card_number],
			['Type', card.type || 'Trainer/Item'],
			['HP', card.hp || '-'],
			['Rarity', card.rarity || '-'],
			['Weakness', card.weakness || '-'],
			['Resistance', card.resistance || '-'],
			['Retreat Cost', card.retreat_cost || '-']
		);

		let output = `${table.toString()}\n`;

		if (card.abilities) {
			output += `\nAbilities:\n  ${card.abilities}\n`;
		}

		if (card.attacks) {
			output += `\nAttacks:\n  ${formatAttacks(card.attacks)}\n`;
		}

		if (card.image_url) {
			output += `\nImage: ${card.image_url}\n`;
		}

		if (card.card_url) {
			output += `More Info: ${card.card_url}\n`;
		}

		return output;
	}

	private static formatCardsAsCompact(cards: Card[]): string {
		return cards
			.map((card) => {
				const parts = [
					card.name,
					card.type || 'Trainer',
					card.hp ? `HP:${card.hp}` : '',
					truncate(card.attacks || '', 50),
				];
				return parts.filter(Boolean).join(' | ');
			})
			.join('\n');
	}

	private static formatSingleCardAsCompact(card: Card): string {
		const parts = [
			`${card.name} (${card.set_name} ${card.card_number})`,
			card.type || 'Trainer/Item',
			card.hp ? `HP:${card.hp}` : '',
			card.weakness ? `Weak:${card.weakness}` : '',
			card.retreat_cost ? `Retreat:${card.retreat_cost}` : '',
		];
		return parts.filter(Boolean).join(' | ');
	}
}
