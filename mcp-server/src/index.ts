#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { DuckDBInstance, DuckDBConnection } from '@duckdb/node-api';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CSV path - adjust relative to the built dist folder
const CSV_PATH = path.join(__dirname, '../../pokemon_pocket_cards.csv');

// Helper to serialize data with BigInt support
function safeJsonStringify(data: any): string {
  return JSON.stringify(data, (key, value) =>
    typeof value === 'bigint' ? value.toString() : value
  , 2);
}

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

  async query(sql: string): Promise<any[]> {
    await this.ready;
    const result = await this.connection.runAndReadAll(sql);
    return result.getRowObjectsJson();
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
      conditions.push(filters.hasAttacks ? `attacks != ''` : `attacks = ''`);
    }
    if (filters.retreatCost !== undefined) {
      conditions.push(`retreat_cost = '${filters.retreatCost}'`);
    }
    if (filters.weakness) {
      conditions.push(`LOWER(weakness) = LOWER('${filters.weakness}')`);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
    const limit = filters.limit || 50;

    const sql = `
      SELECT * FROM cards
      ${whereClause}
      ORDER BY name
      LIMIT ${limit}
    `;

    return this.query(sql);
  }

  async getCardByName(name: string): Promise<Card | null> {
    const results = await this.query(`
      SELECT * FROM cards
      WHERE LOWER(name) = LOWER('${name}')
      LIMIT 1
    `);
    return results[0] || null;
  }

  async getTypeStats(): Promise<any[]> {
    return this.query(`
      SELECT
        type,
        COUNT(*) as count,
        ROUND(AVG(TRY_CAST(hp AS INTEGER)), 1) as avg_hp,
        ROUND(AVG(TRY_CAST(retreat_cost AS INTEGER)), 1) as avg_retreat_cost
      FROM cards
      WHERE type != ''
      GROUP BY type
      ORDER BY count DESC
    `);
  }

  async findSynergies(cardName: string): Promise<any> {
    const card = await this.getCardByName(cardName);
    if (!card || !card.type) {
      return { error: 'Card not found or has no type' };
    }

    // Find cards of same type with complementary roles
    const sameType = await this.query(`
      SELECT name, hp, attacks, retreat_cost
      FROM cards
      WHERE type = '${card.type}'
        AND name != '${cardName}'
        AND attacks != ''
      ORDER BY CAST(hp AS INTEGER) DESC
      LIMIT 10
    `);

    // Find supporting trainers/items
    const trainers = await this.query(`
      SELECT name, attacks as description
      FROM cards
      WHERE type = ''
        AND name NOT LIKE '%Energy%'
      LIMIT 15
    `);

    return {
      card: card,
      sameTypeCards: sameType,
      trainers: trainers.slice(0, 10)
    };
  }

  async findCounters(targetType: string): Promise<Card[]> {
    // Find cards that target type is weak to
    return this.query(`
      SELECT DISTINCT name, type, hp, attacks, weakness
      FROM cards
      WHERE type = (
        SELECT DISTINCT weakness
        FROM cards
        WHERE type = '${targetType}'
        LIMIT 1
      )
      AND attacks != ''
      ORDER BY CAST(hp AS INTEGER) DESC
      LIMIT 20
    `);
  }

  async getUniqueCards(): Promise<Card[]> {
    return this.query(`
      SELECT DISTINCT ON (name, type, hp, attacks, weakness, retreat_cost) *
      FROM cards
      WHERE attacks != ''
      ORDER BY name, type, hp, attacks, weakness, retreat_cost, set_code, card_number
    `);
  }

  async analyzeEnergyCost(attacks: string): Promise<{ total: number; types: Record<string, number> }> {
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
  version: '1.0.0'
});

// TOOLS

// 1. Search cards with flexible filters
server.registerTool(
  'search_cards',
  {
    title: 'Search Pokemon Cards',
    description: 'Search for Pokemon cards using filters like name, type, HP range, set, etc.',
    inputSchema: {
      name: z.string().optional().describe('Card name to search for (partial match)'),
      type: z.string().optional().describe('Pokemon type (Fire, Water, Grass, etc.)'),
      minHp: z.number().optional().describe('Minimum HP'),
      maxHp: z.number().optional().describe('Maximum HP'),
      set: z.string().optional().describe('Set code (A1, A2, A3, etc.)'),
      hasAttacks: z.boolean().optional().describe('Filter by whether card has attacks'),
      retreatCost: z.number().optional().describe('Retreat cost (0-4)'),
      weakness: z.string().optional().describe('Weakness type'),
      limit: z.number().optional().describe('Maximum results to return (default 50)')
    }
  },
  async (filters) => {
    const results = await dbClient.searchCards(filters);
    return {
      content: [
        {
          type: 'text',
          text: safeJsonStringify(results)
        }
      ]
    };
  }
);

// 2. Get specific card details
server.registerTool(
  'get_card',
  {
    title: 'Get Card Details',
    description: 'Get detailed information about a specific card by exact name',
    inputSchema: {
      name: z.string().describe('Exact card name')
    }
  },
  async ({ name }) => {
    const card = await dbClient.getCardByName(name);
    if (!card) {
      return {
        content: [{ type: 'text', text: `Card "${name}" not found` }],
        isError: true
      };
    }
    return {
      content: [
        {
          type: 'text',
          text: safeJsonStringify(card)
        }
      ]
    };
  }
);

// 3. Find card synergies
server.registerTool(
  'find_synergies',
  {
    title: 'Find Card Synergies',
    description: 'Find cards that synergize well with a given card (same type, supporting trainers)',
    inputSchema: {
      cardName: z.string().describe('Name of the main card to build around')
    }
  },
  async ({ cardName }) => {
    const synergies = await dbClient.findSynergies(cardName);
    return {
      content: [
        {
          type: 'text',
          text: safeJsonStringify(synergies)
        }
      ]
    };
  }
);

// 4. Find counter cards
server.registerTool(
  'find_counters',
  {
    title: 'Find Counter Cards',
    description: 'Find cards that counter a specific type (exploit weakness)',
    inputSchema: {
      targetType: z.string().describe('Pokemon type to counter (Fire, Water, Grass, etc.)')
    }
  },
  async ({ targetType }) => {
    const counters = await dbClient.findCounters(targetType);
    return {
      content: [
        {
          type: 'text',
          text: safeJsonStringify(counters)
        }
      ]
    };
  }
);

// 5. Get type statistics
server.registerTool(
  'get_type_stats',
  {
    title: 'Get Type Statistics',
    description: 'Get statistics about card types (count, avg HP, avg retreat cost)',
    inputSchema: {}
  },
  async () => {
    const stats = await dbClient.getTypeStats();
    return {
      content: [
        {
          type: 'text',
          text: safeJsonStringify(stats)
        }
      ]
    };
  }
);

// 6. Run custom SQL query
server.registerTool(
  'query_cards',
  {
    title: 'Custom SQL Query',
    description: 'Run a custom SQL query against the cards table',
    inputSchema: {
      sql: z.string().describe('SQL query to execute (SELECT only)')
    }
  },
  async ({ sql }) => {
    try {
      // Basic SQL injection protection
      if (!sql.trim().toUpperCase().startsWith('SELECT')) {
        return {
          content: [{ type: 'text', text: 'Only SELECT queries are allowed' }],
          isError: true
        };
      }
      const results = await dbClient.query(sql);
      return {
        content: [
          {
            type: 'text',
            text: safeJsonStringify(results)
          }
        ]
      };
    } catch (err: unknown) {
      const error = err as Error;
      return {
        content: [{ type: 'text', text: `Query error: ${error.message}` }],
        isError: true
      };
    }
  }
);

// 7. Analyze deck composition
server.registerTool(
  'analyze_deck',
  {
    title: 'Analyze Deck Composition',
    description: 'Analyze a deck list for energy requirements, type distribution, etc.',
    inputSchema: {
      cardNames: z.array(z.string()).describe('Array of card names in the deck')
    }
  },
  async ({ cardNames }) => {
    const cards = await Promise.all(
      cardNames.map(name => dbClient.getCardByName(name))
    );

    const validCards = cards.filter(c => c !== null) as Card[];
    const typeCount: Record<string, number> = {};
    let totalEnergy = 0;
    const energyTypes: Record<string, number> = {};

    for (const card of validCards) {
      if (card.type) {
        typeCount[card.type] = (typeCount[card.type] || 0) + 1;
      }
      if (card.attacks) {
        const energyCost = await dbClient.analyzeEnergyCost(card.attacks);
        totalEnergy += energyCost.total;
        for (const [type, count] of Object.entries(energyCost.types)) {
          energyTypes[type] = (energyTypes[type] || 0) + count;
        }
      }
    }

    return {
      content: [
        {
          type: 'text',
          text: safeJsonStringify({
            deckSize: cardNames.length,
            validCards: validCards.length,
            typeDistribution: typeCount,
            estimatedEnergyNeeds: energyTypes,
            averageHp: validCards.reduce((sum, c) => sum + (parseInt(c.hp) || 0), 0) / validCards.length
          })
        }
      ]
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
    mimeType: 'application/json'
  },
  async (uri) => {
    const cards = await dbClient.query('SELECT * FROM cards LIMIT 100');
    return {
      contents: [
        {
          uri: uri.href,
          text: safeJsonStringify(cards),
          mimeType: 'application/json'
        }
      ]
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
    mimeType: 'application/json'
  },
  async (uri) => {
    const cards = await dbClient.getUniqueCards();
    return {
      contents: [
        {
          uri: uri.href,
          text: safeJsonStringify(cards),
          mimeType: 'application/json'
        }
      ]
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
    mimeType: 'application/json'
  },
  async (uri) => {
    const stats = await dbClient.getTypeStats();
    return {
      contents: [
        {
          uri: uri.href,
          text: safeJsonStringify(stats),
          mimeType: 'application/json'
        }
      ]
    };
  }
);

// PROMPTS

// 1. Build deck around card
server.registerPrompt(
  'build-deck',
  {
    title: 'Build Deck Around Card',
    description: 'Generate a deck strategy centered around a specific card',
    argsSchema: {
      mainCard: z.string().describe('Main card to build deck around'),
      strategy: z.enum(['aggro', 'control', 'midrange']).optional().describe('Deck strategy type')
    }
  },
  ({ mainCard, strategy }) => ({
    messages: [
      {
        role: 'user',
        content: {
          type: 'text',
          text: `Build a ${strategy || 'competitive'} Pokemon Pocket deck centered around ${mainCard}.

Please:
1. Use find_synergies tool to find supporting cards
2. Include 15-20 Pokemon and 0-5 Trainer/Item cards (20 card total limit)
3. Suggest energy ratio based on attack costs
4. Explain win conditions and key combos
5. List potential counters and how to play around them`
        }
      }
    ]
  })
);

// 2. Counter deck archetype
server.registerPrompt(
  'counter-deck',
  {
    title: 'Build Counter Deck',
    description: 'Build a deck to counter a specific type or strategy',
    argsSchema: {
      targetType: z.string().describe('Type or archetype to counter'),
      sets: z.string().optional().describe('Available sets (comma-separated)')
    }
  },
  ({ targetType, sets }) => ({
    messages: [
      {
        role: 'user',
        content: {
          type: 'text',
          text: `Build a deck that counters ${targetType} decks${sets ? ` using cards from sets: ${sets}` : ''}.

Please:
1. Use find_counters to find Pokemon that exploit weaknesses
2. Find disruption trainers if available
3. Suggest Pokemon with resistance or high HP
4. Explain the game plan against ${targetType}
5. Build a 20-card deck list`
        }
      }
    ]
  })
);

// 3. Optimize existing deck
server.registerPrompt(
  'optimize-deck',
  {
    title: 'Optimize Deck',
    description: 'Analyze and suggest improvements for an existing deck',
    argsSchema: {
      deckList: z.string().describe('Current deck list (comma-separated card names)')
    }
  },
  ({ deckList }) => ({
    messages: [
      {
        role: 'user',
        content: {
          type: 'text',
          text: `Analyze and optimize this Pokemon Pocket deck: ${deckList}

Please:
1. Use analyze_deck to check current composition
2. Identify weaknesses (energy curve, type imbalance, missing roles)
3. Suggest card swaps with reasoning
4. Check if deck exploits synergies effectively
5. Verify it meets 20-card limit with proper Pokemon/Trainer ratio`
        }
      }
    ]
  })
);

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Pokemon Pocket MCP Server running on stdio');
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});
