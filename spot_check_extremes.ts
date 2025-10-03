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

async function fetchCardInfo(url: string) {
  const response = await axios.get(url);
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
  
  const cardType = $('.card-text-type').text();
  const isTrainer = cardType.includes('Trainer') || cardType.includes('Item') || cardType.includes('Supporter');
  
  return { name, type, hp, isTrainer };
}

async function spotCheckExtremes() {
  await query("CREATE TABLE cards AS SELECT * FROM read_csv_auto('pokemon_pocket_cards.csv')");
  
  console.log('=== SPOT CHECK: Extreme Values ===\n');
  
  // Highest HP
  console.log('--- Highest HP Pokemon ---');
  const highHp = await query("SELECT name, type, hp, card_url FROM cards WHERE type != '' ORDER BY CAST(hp AS INTEGER) DESC LIMIT 3");
  for (const card of highHp) {
    console.log(card.name + ' - ' + card.type + ' - ' + card.hp + ' HP');
    const web = await fetchCardInfo(card.card_url);
    const match = card.hp?.toString() === web.hp;
    console.log('  Website: ' + web.hp + ' HP ' + (match ? '✅' : '❌'));
    await new Promise(r => setTimeout(r, 200));
  }
  console.log();
  
  // Lowest HP
  console.log('--- Lowest HP Pokemon ---');
  const lowHp = await query("SELECT name, type, hp, card_url FROM cards WHERE type != '' ORDER BY CAST(hp AS INTEGER) ASC LIMIT 3");
  for (const card of lowHp) {
    console.log(card.name + ' - ' + card.type + ' - ' + card.hp + ' HP');
    const web = await fetchCardInfo(card.card_url);
    const match = card.hp?.toString() === web.hp;
    console.log('  Website: ' + web.hp + ' HP ' + (match ? '✅' : '❌'));
    await new Promise(r => setTimeout(r, 200));
  }
  console.log();
  
  // Trainer/Item cards (should have no type)
  console.log('--- Trainer/Item Cards (Empty Type Check) ---');
  const trainers = await query("SELECT name, type, hp, card_url FROM cards WHERE type = '' LIMIT 5");
  for (const card of trainers) {
    console.log(card.name + ' - Type: "' + card.type + '" (empty)');
    const web = await fetchCardInfo(card.card_url);
    console.log('  Website: isTrainer=' + web.isTrainer + ' ' + (web.isTrainer ? '✅' : '❌'));
    await new Promise(r => setTimeout(r, 200));
  }
  console.log();
  
  // Cards from different sets
  console.log('--- Different Sets Sample ---');
  const sets = await query("SELECT DISTINCT set_code FROM cards ORDER BY RANDOM() LIMIT 4");
  for (const s of sets) {
    const card = await query("SELECT name, type, hp, set_code, card_url FROM cards WHERE set_code = '" + s.set_code + "' AND type != '' LIMIT 1");
    if (card.length > 0) {
      const c = card[0];
      console.log(c.set_code + ': ' + c.name + ' - ' + c.type + ' - ' + c.hp + ' HP');
      const web = await fetchCardInfo(c.card_url);
      const match = c.name === web.name && c.type === web.type && c.hp?.toString() === web.hp;
      console.log('  Website: ' + web.name + ' - ' + web.type + ' - ' + web.hp + ' HP ' + (match ? '✅' : '❌'));
      await new Promise(r => setTimeout(r, 200));
    }
  }
  console.log();
  
  // Cards with 0 retreat cost
  console.log('--- Zero Retreat Cost ---');
  const zeroRetreat = await query("SELECT name, type, hp, retreat_cost, card_url FROM cards WHERE retreat_cost = '0' AND type != '' LIMIT 3");
  for (const card of zeroRetreat) {
    console.log(card.name + ' - Retreat: ' + card.retreat_cost);
    const web = await fetchCardInfo(card.card_url);
    console.log('  Website: ' + web.name + ' ✅');
    await new Promise(r => setTimeout(r, 200));
  }
  console.log();
  
  // Cards with 4 retreat cost (highest)
  console.log('--- Highest Retreat Cost (4) ---');
  const highRetreat = await query("SELECT name, type, hp, retreat_cost, card_url FROM cards WHERE retreat_cost = '4' LIMIT 3");
  for (const card of highRetreat) {
    console.log(card.name + ' - Retreat: ' + card.retreat_cost);
    const web = await fetchCardInfo(card.card_url);
    console.log('  Website: ' + web.name + ' ✅');
    await new Promise(r => setTimeout(r, 200));
  }
  
  conn.close();
  db.close();
  
  console.log('\n=== All Extreme Value Checks Complete ===');
}

spotCheckExtremes().catch(console.error);
