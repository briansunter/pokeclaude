import axios from 'axios';
import * as cheerio from 'cheerio';
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

async function fetchCardDetails(url: string) {
  const response = await axios.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  });
  const $ = cheerio.load(response.data);
  
  const title = $('title').text();
  const nameMatch = title.match(/^([^•]+)/);
  const name = nameMatch ? nameMatch[1].trim() : '';
  
  const cardTitle = $('.card-text-title').text();
  const cardName = $('.card-text-name').text().trim();
  let typeAndHp = cardTitle;
  if (cardName) {
    typeAndHp = cardTitle.replace(cardName, '').trim();
  }
  const typeMatch = typeAndHp.match(/^\s*-\s*([^-]+)\s*-/);
  const type = typeMatch ? typeMatch[1].trim() : '';
  const hpMatch = typeAndHp.match(/(\d+)\s*HP/);
  const hp = hpMatch ? hpMatch[1] : '';
  
  const attacks: Array<{name: string, damage: string, effect: string}> = [];
  $('.card-text-attack').each((_, element) => {
    const attackInfo = $(element).find('.card-text-attack-info').text().replace(/\s+/g, ' ').trim();
    const attackEffect = $(element).find('.card-text-attack-effect').text().trim();
    
    const dmgMatch = attackInfo.match(/([A-Z][\w\s]+?)\s+(\d+x?)\s*$/);
    if (dmgMatch) {
      attacks.push({
        name: dmgMatch[1].trim(),
        damage: dmgMatch[2],
        effect: attackEffect
      });
    } else {
      attacks.push({
        name: attackInfo.trim(),
        damage: '',
        effect: attackEffect
      });
    }
  });
  
  return { name, type, hp, attacks };
}

async function spotCheckSuspicious() {
  await query("CREATE TABLE cards AS SELECT * FROM read_csv_auto('pokemon_pocket_cards.csv')");
  
  console.log('=== SPOT CHECK: Suspicious/Edge Cases ===\n');
  
  // Check specific problematic cards
  const testCases = [
    { name: 'Charizard ex', attacks: 'R Stoke:', reason: 'Effect-only attack' },
    { name: 'Moltres ex', attacks: 'R Inferno Dance:', reason: 'Effect-only attack' },
    { name: 'Jangmo-o', type: 'Dragon', reason: 'Hyphenated name' },
    { name: 'Porygon-Z', type: 'Colorless', reason: 'Hyphenated name with dash' },
    { name: 'Ho-Oh ex', type: 'Fire', reason: 'Hyphenated name with dash' },
    { name: 'Pikachu ex', attacks: 'Circle Circuit: 30x', reason: 'Multiplier attack' },
    { name: 'Primarina ex', attacks: 'Hydro Pump 40+:', reason: 'Variable damage attack' }
  ];
  
  for (const test of testCases) {
    console.log('--- ' + test.name + ' (' + test.reason + ') ---');
    
    let condition = "name = '" + test.name + "'";
    if (test.attacks) {
      condition += " AND attacks LIKE '%" + test.attacks + "%'";
    }
    if (test.type) {
      condition += " AND type = '" + test.type + "'";
    }
    
    const cards = await query('SELECT * FROM cards WHERE ' + condition + ' LIMIT 1');
    
    if (cards.length === 0) {
      console.log('❌ Card not found in CSV!');
      console.log();
      continue;
    }
    
    const card = cards[0];
    console.log('CSV Data:');
    console.log('  Name: ' + card.name);
    console.log('  Type: ' + card.type);
    console.log('  HP: ' + card.hp);
    console.log('  Attacks: ' + card.attacks);
    console.log('  URL: ' + card.card_url);
    
    try {
      const webData = await fetchCardDetails(card.card_url);
      
      console.log('\nWebsite Data:');
      console.log('  Name: ' + webData.name);
      console.log('  Type: ' + webData.type);
      console.log('  HP: ' + webData.hp);
      console.log('  Attacks:');
      webData.attacks.forEach(a => {
        console.log('    - ' + a.name + (a.damage ? ' ' + a.damage : ''));
        if (a.effect) {
          console.log('      Effect: ' + a.effect.substring(0, 60) + (a.effect.length > 60 ? '...' : ''));
        }
      });
      
      // Verify
      let status = '✅';
      if (card.name !== webData.name) status = '❌';
      if (card.type !== webData.type) status = '❌';
      if (card.hp?.toString() !== webData.hp) status = '❌';
      
      console.log('\n' + status + ' Verification: ' + (status === '✅' ? 'PASSED' : 'FAILED'));
      console.log();
      
      await new Promise(resolve => setTimeout(resolve, 300));
    } catch (error) {
      console.log('\n⚠️  Error: ' + error);
      console.log();
    }
  }
  
  conn.close();
  db.close();
}

spotCheckSuspicious().catch(console.error);
