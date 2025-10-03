import Database from 'duckdb';

const db = new Database.Database(':memory:');
const conn = db.connect();

function query(sql: string): Promise<any[]> {
  return new Promise((resolve, reject) => {
    conn.all(sql, (err: Error | null, rows: any[]) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

async function deepAnalysis() {
  await query("CREATE TABLE cards AS SELECT * FROM read_csv_auto('pokemon_pocket_cards.csv')");

  console.log('=== DEEP DIVE DATA QUALITY ANALYSIS ===\n');

  // 1. Check for unusual HP values
  console.log('1. HP VALUE ANALYSIS:');
  const hpStats = await query(`
    SELECT 
      MIN(CAST(hp AS INTEGER)) as min_hp,
      MAX(CAST(hp AS INTEGER)) as max_hp,
      AVG(CAST(hp AS INTEGER)) as avg_hp
    FROM cards 
    WHERE hp IS NOT NULL AND CAST(hp AS VARCHAR) != ''
  `);
  console.log('   Min HP: ' + hpStats[0].min_hp);
  console.log('   Max HP: ' + hpStats[0].max_hp);
  console.log('   Avg HP: ' + Math.round(Number(hpStats[0].avg_hp)));

  const unusualHP = await query(`
    SELECT name, type, hp, set_code
    FROM cards
    WHERE hp IS NOT NULL 
      AND CAST(hp AS VARCHAR) != ''
      AND (CAST(hp AS INTEGER) < 30 OR CAST(hp AS INTEGER) > 200)
  `);
  if (unusualHP.length > 0) {
    console.log('   Cards with unusual HP (< 30 or > 200):');
    unusualHP.forEach(r => console.log('     - ' + r.name + ' (' + r.type + '): ' + r.hp + ' HP [' + r.set_code + ']'));
  } else {
    console.log('   ✅ All HP values in normal range (30-200)');
  }
  console.log();

  // 2. Check URL formatting
  console.log('2. URL VALIDATION:');
  const invalidImageUrls = await query(`
    SELECT name, image_url
    FROM cards
    WHERE image_url NOT LIKE 'https://limitlesstcg.%'
    LIMIT 5
  `);
  if (invalidImageUrls.length > 0) {
    console.log('   ⚠️ Found cards with unexpected image URL format:');
    invalidImageUrls.forEach(r => console.log('     - ' + r.name + ': ' + r.image_url));
  } else {
    console.log('   ✅ All image URLs properly formatted');
  }

  const invalidCardUrls = await query(`
    SELECT name, card_url
    FROM cards
    WHERE card_url NOT LIKE 'https://pocket.limitlesstcg.%'
    LIMIT 5
  `);
  if (invalidCardUrls.length > 0) {
    console.log('   ⚠️ Found cards with unexpected card URL format:');
    invalidCardUrls.forEach(r => console.log('     - ' + r.name + ': ' + r.card_url));
  } else {
    console.log('   ✅ All card URLs properly formatted');
  }
  console.log();

  // 3. Check for very long or very short names
  console.log('3. NAME LENGTH ANALYSIS:');
  const longNames = await query(`
    SELECT name, LENGTH(name) as len
    FROM cards
    WHERE LENGTH(name) > 20
    ORDER BY len DESC
    LIMIT 5
  `);
  console.log('   Longest card names:');
  longNames.forEach(r => console.log('     - ' + r.name + ' (' + r.len + ' chars)'));

  const shortNames = await query(`
    SELECT name, type, LENGTH(name) as len
    FROM cards
    WHERE LENGTH(name) < 4 AND type != ''
    ORDER BY len
    LIMIT 10
  `);
  if (shortNames.length > 0) {
    console.log('   Very short Pokemon names (might be truncated):');
    shortNames.forEach(r => console.log('     - "' + r.name + '" (' + r.len + ' chars)'));
  } else {
    console.log('   ✅ No suspiciously short Pokemon names');
  }
  console.log();

  // 4. Check card number gaps within sets
  console.log('4. CARD NUMBER SEQUENCE CHECK:');
  const sets = await query('SELECT DISTINCT set_code FROM cards ORDER BY set_code');
  
  for (const set of sets) {
    const cards = await query(`
      SELECT CAST(card_number AS INTEGER) as num
      FROM cards
      WHERE set_code = '${set.set_code}'
        AND regexp_full_match(CAST(card_number AS VARCHAR), '^[0-9]+$')
      ORDER BY num
    `);
    
    if (cards.length > 0) {
      const nums = cards.map(c => Number(c.num));
      const min = Math.min(...nums);
      const max = Math.max(...nums);
      const gaps = [];
      
      for (let i = min; i <= max; i++) {
        if (!nums.includes(i)) {
          gaps.push(i);
        }
      }
      
      if (gaps.length > 0 && gaps.length < 10) {
        console.log('   ' + set.set_code + ': Missing card numbers: ' + gaps.join(', '));
      } else if (gaps.length >= 10) {
        console.log('   ' + set.set_code + ': ' + gaps.length + ' gaps (might be secret rares)');
      } else {
        console.log('   ' + set.set_code + ': ✅ Sequential (1-' + max + ')');
      }
    }
  }
  console.log();

  // 5. Check for Pokemon with no weakness (should be rare/none)
  console.log('5. WEAKNESS COVERAGE:');
  const noWeakness = await query(`
    SELECT name, type, hp
    FROM cards
    WHERE type != '' 
      AND (weakness IS NULL OR weakness = '')
    LIMIT 10
  `);
  if (noWeakness.length > 0) {
    console.log('   ⚠️ Pokemon with no weakness listed:');
    noWeakness.forEach(r => console.log('     - ' + r.name + ' (' + r.type + ', ' + r.hp + ' HP)'));
  } else {
    console.log('   ✅ All Pokemon have weakness data');
  }
  console.log();

  // 6. Analyze retreat cost distribution by type
  console.log('6. RETREAT COST BY TYPE:');
  const retreatByType = await query(`
    SELECT 
      type,
      AVG(CAST(retreat_cost AS DECIMAL)) as avg_retreat
    FROM cards
    WHERE type != '' 
      AND retreat_cost IS NOT NULL 
      AND CAST(retreat_cost AS VARCHAR) != ''
    GROUP BY type
    ORDER BY avg_retreat DESC
  `);
  retreatByType.forEach(r => {
    console.log('   ' + r.type.padEnd(12) + ': ' + Number(r.avg_retreat).toFixed(2) + ' avg retreat cost');
  });
  console.log();

  // 7. Check for identical cards (same name, different sets)
  console.log('7. CARD REPRINTS (same name, multiple sets):');
  const reprints = await query(`
    SELECT name, COUNT(DISTINCT set_code) as set_count
    FROM cards
    WHERE type != ''
    GROUP BY name
    HAVING COUNT(DISTINCT set_code) > 3
    ORDER BY set_count DESC
    LIMIT 10
  `);
  if (reprints.length > 0) {
    console.log('   Cards appearing in 4+ sets:');
    reprints.forEach(r => console.log('     - ' + r.name + ': ' + r.set_count + ' sets'));
  }
  console.log();

  // 8. Check attack name patterns
  console.log('8. ATTACK NAME ANALYSIS:');
  const commonAttacks = await query(`
    SELECT 
      SUBSTRING(attacks FROM 1 FOR POSITION(':' IN attacks) - 1) as attack_name,
      COUNT(*) as count
    FROM cards
    WHERE attacks != '' AND attacks LIKE '%:%'
    GROUP BY attack_name
    HAVING COUNT(*) > 20
    ORDER BY count DESC
    LIMIT 10
  `);
  console.log('   Most common attack names (20+ occurrences):');
  commonAttacks.forEach(r => {
    const name = r.attack_name.trim();
    if (name && name.length < 50) {
      console.log('     - "' + name + '": ' + r.count + ' cards');
    }
  });
  console.log();

  // 9. Check for special characters or encoding issues
  console.log('9. SPECIAL CHARACTER CHECK:');
  const specialChars = await query(`
    SELECT name, type
    FROM cards
    WHERE regexp_matches(name, '[^a-zA-Z0-9 \-\.\''éè]')
    LIMIT 10
  `);
  if (specialChars.length > 0) {
    console.log('   ⚠️ Cards with unusual characters:');
    specialChars.forEach(r => console.log('     - ' + r.name + ' (' + r.type + ')'));
  } else {
    console.log('   ✅ No encoding issues detected');
  }
  console.log();

  // 10. Check trainer/item cards have appropriate empty fields
  console.log('10. TRAINER/ITEM CARD VALIDATION:');
  const trainerStats = await query(`
    SELECT 
      COUNT(*) as total,
      SUM(CASE WHEN hp IS NULL OR CAST(hp AS VARCHAR) = '' THEN 1 ELSE 0 END) as no_hp,
      SUM(CASE WHEN attacks IS NULL OR attacks = '' THEN 1 ELSE 0 END) as no_attacks,
      SUM(CASE WHEN weakness IS NULL OR weakness = '' THEN 1 ELSE 0 END) as no_weakness
    FROM cards
    WHERE type = '' OR type IS NULL
  `);
  const t = trainerStats[0];
  console.log('   Total Trainer/Item cards: ' + t.total);
  console.log('   Without HP: ' + t.no_hp + '/' + t.total + ' (' + Math.round(Number(t.no_hp)/Number(t.total)*100) + '%)');
  console.log('   Without attacks: ' + t.no_attacks + '/' + t.total + ' (' + Math.round(Number(t.no_attacks)/Number(t.total)*100) + '%)');
  console.log('   Without weakness: ' + t.no_weakness + '/' + t.total + ' (' + Math.round(Number(t.no_weakness)/Number(t.total)*100) + '%)');
  console.log();

  // 11. Final data integrity check
  console.log('11. FINAL INTEGRITY CHECK:');
  const integrity = await query(`
    SELECT 
      COUNT(*) as total_cards,
      COUNT(DISTINCT id) as unique_ids,
      SUM(CASE WHEN name IS NULL OR name = '' THEN 1 ELSE 0 END) as missing_name,
      SUM(CASE WHEN set_code IS NULL OR set_code = '' THEN 1 ELSE 0 END) as missing_set,
      SUM(CASE WHEN image_url IS NULL OR image_url = '' THEN 1 ELSE 0 END) as missing_image,
      SUM(CASE WHEN card_url IS NULL OR card_url = '' THEN 1 ELSE 0 END) as missing_url
    FROM cards
  `);
  const i = integrity[0];
  console.log('   Total cards: ' + i.total_cards);
  console.log('   Unique IDs: ' + i.unique_ids + (i.total_cards === i.unique_ids ? ' ✅' : ' ⚠️'));
  console.log('   Missing name: ' + i.missing_name + (Number(i.missing_name) === 0 ? ' ✅' : ' ⚠️'));
  console.log('   Missing set_code: ' + i.missing_set + (Number(i.missing_set) === 0 ? ' ✅' : ' ⚠️'));
  console.log('   Missing image_url: ' + i.missing_image + (Number(i.missing_image) === 0 ? ' ✅' : ' ⚠️'));
  console.log('   Missing card_url: ' + i.missing_url + (Number(i.missing_url) === 0 ? ' ✅' : ' ⚠️'));

  conn.close();
  db.close();
  console.log('\n=== DEEP ANALYSIS COMPLETE ===');
}

deepAnalysis().catch(console.error);
