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

async function checkTrainers() {
  await query("CREATE TABLE cards AS SELECT * FROM read_csv_auto('pokemon_pocket_cards.csv')");
  
  console.log('=== TRAINER/ITEM CARD VERIFICATION ===\n');
  
  // Get trainer cards
  const trainers = await query("SELECT name, type, hp, attacks, card_url FROM cards WHERE type = '' OR type IS NULL LIMIT 10");
  
  console.log('Found ' + trainers.length + ' cards with empty type\n');
  
  for (const card of trainers) {
    console.log('Card: ' + card.name);
    console.log('  Type in CSV: "' + (card.type || '') + '" (empty)');
    console.log('  HP: ' + (card.hp || 'none'));
    console.log('  URL: ' + card.card_url);
    
    try {
      const response = await axios.get(card.card_url);
      const $ = cheerio.load(response.data);
      
      const cardTypeElem = $('.card-text-type').text();
      console.log('  Website card-text-type: ' + cardTypeElem.trim());
      
      const isTrainer = cardTypeElem.includes('Trainer') || 
                       cardTypeElem.includes('Item') || 
                       cardTypeElem.includes('Supporter');
      
      console.log('  Is Trainer/Item/Supporter: ' + isTrainer + ' ' + (isTrainer ? '✅' : '❌'));
      console.log();
      
      await new Promise(r => setTimeout(r, 200));
    } catch (error) {
      console.log('  Error: ' + error);
      console.log();
    }
  }
  
  conn.close();
  db.close();
}

checkTrainers().catch(console.error);
