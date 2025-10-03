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

async function fetchCardFromWebsite(url: string) {
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
  
  const attacks: string[] = [];
  $('.card-text-attack').each((_, element) => {
    const attackInfo = $(element).find('.card-text-attack-info').text().replace(/\s+/g, ' ').trim();
    attacks.push(attackInfo);
  });
  
  const wrr = $('.card-text-wrr').text();
  const weaknessMatch = wrr.match(/Weakness:\s*([^\n]+)/);
  const weakness = weaknessMatch ? weaknessMatch[1].trim().split(' ')[0] : '';
  
  const retreatMatch = wrr.match(/Retreat:\s*(\d+)/);
  const retreat = retreatMatch ? retreatMatch[1] : '';
  
  return { name, type, hp, attacks: attacks.join('; '), weakness, retreat };
}

async function spotCheck() {
  await query("CREATE TABLE cards AS SELECT * FROM read_csv_auto('pokemon_pocket_cards.csv')");
  
  console.log('=== SPOT CHECK: CSV vs Website ===\n');
  
  // Select diverse sample of cards
  const samples = await query(`
    SELECT name, type, hp, attacks, weakness, retreat_cost, card_url
    FROM cards
    WHERE type != ''
    ORDER BY RANDOM()
    LIMIT 15
  `);
  
  let pass = 0;
  let fail = 0;
  const issues: string[] = [];
  
  for (const card of samples) {
    console.log('Checking: ' + card.name + ' (' + card.type + ')');
    console.log('  CSV: HP=' + card.hp + ', Attacks=' + (card.attacks || 'none').substring(0, 50) + '...');
    
    try {
      const webData = await fetchCardFromWebsite(card.card_url);
      console.log('  WEB: HP=' + webData.hp + ', Type=' + webData.type);
      
      let hasIssue = false;
      
      if (card.name !== webData.name) {
        console.log('  ❌ NAME MISMATCH: CSV="' + card.name + '" vs WEB="' + webData.name + '"');
        issues.push(card.name + ' - Name mismatch');
        hasIssue = true;
      }
      
      if (card.type !== webData.type) {
        console.log('  ❌ TYPE MISMATCH: CSV="' + card.type + '" vs WEB="' + webData.type + '"');
        issues.push(card.name + ' - Type mismatch');
        hasIssue = true;
      }
      
      if (card.hp?.toString() !== webData.hp) {
        console.log('  ❌ HP MISMATCH: CSV="' + card.hp + '" vs WEB="' + webData.hp + '"');
        issues.push(card.name + ' - HP mismatch');
        hasIssue = true;
      }
      
      if (card.weakness !== webData.weakness && webData.weakness !== '') {
        console.log('  ⚠️  WEAKNESS: CSV="' + card.weakness + '" vs WEB="' + webData.weakness + '"');
      }
      
      if (hasIssue) {
        fail++;
        console.log('  ❌ FAILED\n');
      } else {
        pass++;
        console.log('  ✅ PASSED\n');
      }
      
      await new Promise(resolve => setTimeout(resolve, 200));
    } catch (error) {
      console.log('  ⚠️  Error fetching: ' + error + '\n');
    }
  }
  
  console.log('=== SPOT CHECK RESULTS ===');
  console.log('Passed: ' + pass);
  console.log('Failed: ' + fail);
  console.log('Success Rate: ' + Math.round(pass / (pass + fail) * 100) + '%\n');
  
  if (issues.length > 0) {
    console.log('Issues found:');
    issues.forEach(i => console.log('  - ' + i));
  } else {
    console.log('✅ No issues found!');
  }
  
  conn.close();
  db.close();
}

spotCheck().catch(console.error);
