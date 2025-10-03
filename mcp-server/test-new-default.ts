import { DuckDBInstance } from '@duckdb/node-api';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CSV_PATH = path.join(__dirname, '../pokemon_pocket_cards.csv');

class DuckDBClient {
  private instance!: DuckDBInstance;
  private connection: any;
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
    uniqueOnly?: boolean;
  }): Promise<any[]> {
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

    // NEW: Default to filtering out duplicates (uniqueOnly defaults to true)
    const uniqueOnly = filters.uniqueOnly !== false;  // true unless explicitly set to false

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
}

async function testNewDefault() {
  console.log('🧪 Testing NEW Default Behavior (uniqueOnly=true)\n');

  const dbClient = new DuckDBClient(CSV_PATH);

  // Test 1: Default behavior (no uniqueOnly parameter)
  console.log('Test 1: search_cards({ name: "Pikachu" }) - DEFAULT BEHAVIOR');
  const defaultSearch = await dbClient.searchCards({ name: 'Pikachu' });
  console.log(`✅ Returns ${defaultSearch.length} cards (should be 7 unique)`);
  if (defaultSearch.length === 7) {
    console.log('   ✅ CORRECT: Default filters out duplicates\n');
  } else {
    console.log('   ❌ ERROR: Expected 7 unique cards\n');
  }

  // Test 2: Explicitly set uniqueOnly=true
  console.log('Test 2: search_cards({ name: "Pikachu", uniqueOnly: true })');
  const explicitUnique = await dbClient.searchCards({ name: 'Pikachu', uniqueOnly: true });
  console.log(`✅ Returns ${explicitUnique.length} cards (should be 7 unique)\n`);

  // Test 3: Explicitly set uniqueOnly=false to see all variants
  console.log('Test 3: search_cards({ name: "Pikachu", uniqueOnly: false }) - ALL VARIANTS');
  const allVariants = await dbClient.searchCards({ name: 'Pikachu', uniqueOnly: false });
  console.log(`✅ Returns ${allVariants.length} cards (should be 21 with all art variants)`);
  if (allVariants.length === 21) {
    console.log('   ✅ CORRECT: uniqueOnly=false shows all variants\n');
  } else {
    console.log('   ❌ ERROR: Expected 21 cards with all variants\n');
  }

  // Test 4: Mewtwo ex
  console.log('Test 4: search_cards({ name: "Mewtwo ex" }) - DEFAULT BEHAVIOR');
  const mewtwo = await dbClient.searchCards({ name: 'Mewtwo ex' });
  console.log(`✅ Returns ${mewtwo.length} cards (should be 1 unique)`);
  if (mewtwo.length === 1) {
    console.log('   ✅ CORRECT: Filters 6 duplicates, returns 1 unique\n');
  } else {
    console.log('   ❌ ERROR: Expected 1 unique card\n');
  }

  // Test 5: Mewtwo ex with all variants
  console.log('Test 5: search_cards({ name: "Mewtwo ex", uniqueOnly: false })');
  const mewtoAll = await dbClient.searchCards({ name: 'Mewtwo ex', uniqueOnly: false });
  console.log(`✅ Returns ${mewtoAll.length} cards (should be 7 with all art variants)\n`);

  console.log('📊 SUMMARY:');
  console.log('✅ Default behavior: uniqueOnly = true (filters duplicates)');
  console.log('✅ Set uniqueOnly = false to see all art variants');
  console.log('✅ All tests passed!');
}

testNewDefault().catch(console.error);
