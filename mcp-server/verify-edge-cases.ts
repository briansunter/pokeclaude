import { DuckDBInstance } from '@duckdb/node-api';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CSV_PATH = path.join(__dirname, '../pokemon_pocket_cards.csv');

async function verifyEdgeCases() {
  const instance = await DuckDBInstance.create(':memory:');
  const connection = await instance.connect();

  await connection.run(`
    CREATE TABLE cards AS
    SELECT * FROM read_csv_auto('${CSV_PATH}')
  `);

  console.log('=== VERIFYING EDGE CASES ===\n');

  // Check Luxray
  console.log('1. Luxray with HP 130:');
  const luxray = await connection.runAndReadAll(`
    SELECT name, type, hp, attacks, weakness, retreat_cost, set_code, card_number
    FROM cards
    WHERE name = 'Luxray' AND hp = '130'
    ORDER BY set_code, card_number
  `);
  const luxrayResults = luxray.getRowObjectsJson();
  console.log(`Total Luxray (130 HP): ${luxrayResults.length}`);
  luxrayResults.forEach((c: any, i: number) => {
    console.log(`  ${i + 1}. ${c.name} - HP: ${c.hp}, Attacks: ${c.attacks}, Set: ${c.set_code}-${c.card_number}`);
  });

  // Check unique Luxray
  console.log('\n2. Unique Luxray with HP 130:');
  const uniqueLuxray = await connection.runAndReadAll(`
    SELECT DISTINCT ON (name, type, hp, attacks, weakness, retreat_cost)
      name, type, hp, attacks, weakness, retreat_cost, set_code
    FROM cards
    WHERE name = 'Luxray' AND hp = '130'
    ORDER BY name, type, hp, attacks, weakness, retreat_cost, set_code
  `);
  const uniqueLuxrayResults = uniqueLuxray.getRowObjectsJson();
  console.log(`Unique Luxray (130 HP): ${uniqueLuxrayResults.length}`);
  uniqueLuxrayResults.forEach((c: any, i: number) => {
    console.log(`  ${i + 1}. ${c.name} - HP: ${c.hp}, Attacks: ${c.attacks}, Set: ${c.set_code}`);
  });

  // Check Eelektross
  console.log('\n3. Eelektross with any HP:');
  const eelektross = await connection.runAndReadAll(`
    SELECT name, type, hp, attacks, weakness, retreat_cost, set_code, card_number
    FROM cards
    WHERE name = 'Eelektross'
    ORDER BY hp, set_code, card_number
  `);
  const eelektrossResults = eelektross.getRowObjectsJson();
  console.log(`Total Eelektross: ${eelektrossResults.length}`);
  eelektrossResults.forEach((c: any, i: number) => {
    console.log(`  ${i + 1}. HP: ${c.hp}, Attacks: ${c.attacks?.substring(0, 40)}..., Set: ${c.set_code}-${c.card_number}`);
  });

  // Check unique Eelektross
  console.log('\n4. Unique Eelektross:');
  const uniqueEelektross = await connection.runAndReadAll(`
    SELECT DISTINCT ON (name, type, hp, attacks, weakness, retreat_cost)
      name, type, hp, attacks, weakness, retreat_cost, set_code
    FROM cards
    WHERE name = 'Eelektross'
    ORDER BY name, type, hp, attacks, weakness, retreat_cost, set_code
  `);
  const uniqueEelektrossResults = uniqueEelektross.getRowObjectsJson();
  console.log(`Unique Eelektross: ${uniqueEelektrossResults.length}`);
  uniqueEelektrossResults.forEach((c: any, i: number) => {
    console.log(`  ${i + 1}. HP: ${c.hp}, Attacks: ${c.attacks?.substring(0, 50)}..., Set: ${c.set_code}`);
  });

  // Final verification: Check that DISTINCT ON is working correctly
  console.log('\n5. Verification: Count duplicates for a known card');
  const mewtwoEx = await connection.runAndReadAll(`
    SELECT
      COUNT(*) as total,
      COUNT(DISTINCT (name || type || hp || attacks || weakness || retreat_cost)) as unique_count
    FROM cards
    WHERE name = 'Mewtwo ex'
  `);
  const mewtwoResults = mewtwoEx.getRowObjectsJson()[0];
  console.log(`Mewtwo ex: ${mewtwoResults.total} total cards → ${mewtwoResults.unique_count} unique`);
  console.log(`Expected: 7 total → 1 unique (based on previous tests)`);

  if (mewtwoResults.total === '7' && mewtwoResults.unique_count === '1') {
    console.log('✅ DISTINCT filtering working correctly!');
  } else {
    console.log('❌ DISTINCT filtering may have issues');
  }

  console.log('\n✅ Edge case verification complete!');
}

verifyEdgeCases().catch(console.error);
