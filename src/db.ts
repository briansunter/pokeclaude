// DuckDB client for Pokemon Pocket card database

import { type DuckDBConnection, DuckDBInstance } from '@duckdb/node-api';
import type { Card, TypeStats } from './types.js';

export class DuckDBClient {
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
