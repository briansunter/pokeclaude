import { DuckDBInstance } from '@duckdb/node-api';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CSV_PATH = path.join(__dirname, '../pokemon_pocket_cards.csv');

async function testDuplicates() {
  const instance = await DuckDBInstance.create(':memory:');
  const connection = await instance.connect();

  await connection.run(`
    CREATE TABLE cards AS
    SELECT * FROM read_csv_auto('${CSV_PATH}')
  `);

  console.log('\n=== PIKACHU CARDS ===');
  const pikachus = await connection.runAndReadAll(`
    SELECT name, type, hp, attacks, weakness, retreat_cost, set_code, card_number
    FROM cards
    WHERE LOWER(name) LIKE '%pikachu%'
    ORDER BY name, set_code, CAST(card_number AS INTEGER)
  `);
  console.log(JSON.stringify(pikachus.getRowObjectsJson(), null, 2));

  console.log('\n=== PIKACHU GROUPED BY STATS (showing duplicates) ===');
  const pikachuGroups = await connection.runAndReadAll(`
    SELECT
      name, type, hp, attacks, weakness, retreat_cost,
      COUNT(*) as duplicate_count,
      STRING_AGG(set_code || '-' || card_number, ', ') as card_locations
    FROM cards
    WHERE LOWER(name) LIKE '%pikachu%'
    GROUP BY name, type, hp, attacks, weakness, retreat_cost
    ORDER BY duplicate_count DESC, name
  `);
  console.log(JSON.stringify(pikachuGroups.getRowObjectsJson(), null, 2));

  console.log('\n=== ALL CARDS WITH DUPLICATES (same stats, different art) ===');
  const allDuplicates = await connection.runAndReadAll(`
    SELECT
      name,
      COUNT(*) as duplicate_count,
      STRING_AGG(DISTINCT type, ', ') as types,
      STRING_AGG(DISTINCT hp, ', ') as hps,
      STRING_AGG(set_code || '-' || card_number, ', ') as locations
    FROM cards
    WHERE attacks != ''  -- Only Pokemon with attacks
    GROUP BY name, type, hp, attacks, weakness, retreat_cost
    HAVING COUNT(*) > 1
    ORDER BY duplicate_count DESC
    LIMIT 20
  `);
  console.log(JSON.stringify(allDuplicates.getRowObjectsJson(), null, 2));

  console.log('\n=== TOTAL UNIQUE VS TOTAL CARDS ===');
  const totals = await connection.runAndReadAll(`
    SELECT
      (SELECT COUNT(*) FROM cards) as total_cards,
      (SELECT COUNT(DISTINCT name || type || hp || attacks || weakness || retreat_cost) FROM cards WHERE attacks != '') as unique_cards_with_attacks
  `);
  console.log(JSON.stringify(totals.getRowObjectsJson(), null, 2));

  await connection.close();
  await instance.close();
}

testDuplicates().catch(console.error);
