import { DuckDBInstance } from '@duckdb/node-api';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CSV_PATH = path.join(__dirname, '../pokemon_pocket_cards.csv');

async function testUniqueFiltering() {
  const instance = await DuckDBInstance.create(':memory:');
  const connection = await instance.connect();

  await connection.run(`
    CREATE TABLE cards AS
    SELECT * FROM read_csv_auto('${CSV_PATH}')
  `);

  console.log('\n=== TEST 1: Search Pikachu WITHOUT uniqueOnly (should show all duplicates) ===');
  const allPikachus = await connection.runAndReadAll(`
    SELECT *
    FROM cards
    WHERE LOWER(name) LIKE '%pikachu%'
    ORDER BY name
    LIMIT 50
  `);
  const allPikachuResults = allPikachus.getRowObjectsJson();
  console.log(`Total Pikachu cards (with duplicates): ${allPikachuResults.length}`);
  console.log('First 3:', JSON.stringify(allPikachuResults.slice(0, 3).map(c => ({
    name: c.name,
    hp: c.hp,
    attacks: c.attacks,
    set_code: c.set_code,
    card_number: c.card_number
  })), null, 2));

  console.log('\n=== TEST 2: Search Pikachu WITH uniqueOnly (should filter duplicates) ===');
  const uniquePikachus = await connection.runAndReadAll(`
    SELECT DISTINCT ON (name, type, hp, attacks, weakness, retreat_cost) *
    FROM cards
    WHERE LOWER(name) LIKE '%pikachu%'
    ORDER BY name, type, hp, attacks, weakness, retreat_cost, set_code, card_number
    LIMIT 50
  `);
  const uniquePikachuResults = uniquePikachus.getRowObjectsJson();
  console.log(`Total unique Pikachu cards: ${uniquePikachuResults.length}`);
  console.log('All unique Pikachus:', JSON.stringify(uniquePikachuResults.map(c => ({
    name: c.name,
    hp: c.hp,
    attacks: c.attacks,
    set_code: c.set_code
  })), null, 2));

  console.log('\n=== TEST 3: Search Lightning type WITHOUT uniqueOnly ===');
  const allLightning = await connection.runAndReadAll(`
    SELECT *
    FROM cards
    WHERE LOWER(type) = 'lightning'
    ORDER BY name
    LIMIT 50
  `);
  console.log(`Total Lightning cards (with duplicates): ${allLightning.getRowObjectsJson().length}`);

  console.log('\n=== TEST 4: Search Lightning type WITH uniqueOnly ===');
  const uniqueLightning = await connection.runAndReadAll(`
    SELECT DISTINCT ON (name, type, hp, attacks, weakness, retreat_cost) *
    FROM cards
    WHERE LOWER(type) = 'lightning'
    ORDER BY name, type, hp, attacks, weakness, retreat_cost, set_code, card_number
    LIMIT 50
  `);
  console.log(`Total unique Lightning cards: ${uniqueLightning.getRowObjectsJson().length}`);

  console.log('\n=== TEST 5: Find Synergies for Pikachu ex (should return unique cards) ===');
  const synergies = await connection.runAndReadAll(`
    SELECT DISTINCT ON (name, type, hp, attacks, weakness, retreat_cost)
      name, hp, attacks, retreat_cost
    FROM cards
    WHERE type = 'Lightning'
      AND name != 'Pikachu ex'
      AND attacks != ''
    ORDER BY name, type, hp, attacks, weakness, retreat_cost, CAST(hp AS INTEGER) DESC
    LIMIT 10
  `);
  const synergyResults = synergies.getRowObjectsJson();
  console.log(`Total synergy cards (unique): ${synergyResults.length}`);
  console.log('Synergy cards:', JSON.stringify(synergyResults.map(c => c.name), null, 2));

  console.log('\n=== TEST 6: Total unique cards vs total cards ===');
  const totals = await connection.runAndReadAll(`
    SELECT
      (SELECT COUNT(*) FROM cards WHERE attacks != '') as total_cards_with_attacks,
      (SELECT COUNT(DISTINCT (name || '|' || type || '|' || hp || '|' || attacks || '|' || weakness || '|' || retreat_cost))
       FROM cards WHERE attacks != '') as unique_cards_with_attacks
  `);
  console.log(JSON.stringify(totals.getRowObjectsJson(), null, 2));

  console.log('\n✅ All tests complete!');

  await instance.close();
}

testUniqueFiltering().catch(console.error);
