import axios from 'axios';
import * as cheerio from 'cheerio';
import { writeFileSync } from 'fs';
import { v4 as uuidv4 } from 'uuid';

interface PokemonCard {
  id: string;
  set_code: string;
  set_name: string;
  card_number: string;
  name: string;
  type?: string;
  hp?: string;
  rarity?: string;
  abilities?: string[];
  attacks?: Attack[];
  weakness?: string;
  resistance?: string;
  retreat_cost?: string;
  image_url: string;
  card_url: string;
}

interface Attack {
  name: string;
  cost?: string;
  damage?: string;
  effect?: string;
}

interface SetInfo {
  code: string;
  name: string;
  release_date: string;
  total_cards: number;
}

const ALL_SETS: SetInfo[] = [
  { code: 'A4b', name: 'Deluxe Pack: ex A4b', release_date: '30 Sep 25', total_cards: 379 },
  { code: 'A4a', name: 'Secluded Springs A4a', release_date: '28 Aug 25', total_cards: 105 },
  { code: 'A4', name: 'Wisdom of Sea and Sky A4', release_date: '30 Jul 25', total_cards: 241 },
  { code: 'A3b', name: 'Eevee Grove A3b', release_date: '26 Jun 25', total_cards: 107 },
  { code: 'A3a', name: 'Extradimensional Crisis A3a', release_date: '29 May 25', total_cards: 103 },
  { code: 'A3', name: 'Celestial Guardians A3', release_date: '30 Apr 25', total_cards: 239 },
  { code: 'A2b', name: 'Shining Revelry A2b', release_date: '27 Mar 25', total_cards: 111 },
  { code: 'A2a', name: 'Triumphant Light A2a', release_date: '28 Feb 25', total_cards: 96 },
  { code: 'A2', name: 'Space-Time Smackdown A2', release_date: '29 Jan 25', total_cards: 207 },
  { code: 'A1a', name: 'Mythical Island A1a', release_date: '17 Dec 24', total_cards: 86 },
  { code: 'A1', name: 'Genetic Apex A1', release_date: '30 Oct 24', total_cards: 286 },
  { code: 'P-A', name: 'Promo-A P-A', release_date: '', total_cards: 0 },
];

// Use all sets (comment out to test with specific sets)
const SETS: SetInfo[] = ALL_SETS;
// const SETS: SetInfo[] = ALL_SETS.filter(s => s.code === 'A1'); // For testing

async function scrapeSet(setInfo: SetInfo): Promise<PokemonCard[]> {
  const cards: PokemonCard[] = [];
  const baseUrl = 'https://pocket.limitlesstcg.com/cards';
  const url = baseUrl + '/' + setInfo.code;
  
  console.log('Scraping set: ' + setInfo.name + ' (' + setInfo.code + ')...');
  
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      timeout: 30000
    });
    
    const $ = cheerio.load(response.data);
    
    $('a[href*="/cards/"]').each((_, element) => {
      const href = $(element).attr('href');
      if (!href || href === '/cards/' + setInfo.code) return;
      
      const cardMatch = href.match(/\/cards\/([A-Z0-9\-]+_\d+)/i) || 
                       href.match(/\/cards\/([A-Z0-9\-]+)\/(\d+)/i);
      
      if (cardMatch) {
        const fullCardId = cardMatch[1];
        const cardNumber = fullCardId.includes('_') ? fullCardId.split('_')[1] : cardMatch[2];
        
        const img = $(element).find('img').first();
        const paddedNumber = cardNumber.padStart(3, '0');
        const cdnUrl = 'https://limitlesstcg.nyc3.cdn.digitaloceanspaces.com/pocket';
        const imgSrc = img.attr('src') || cdnUrl + '/' + setInfo.code + '/' + setInfo.code + '_' + paddedNumber + '_EN_SM.webp';
        
        const cardName = img.attr('alt') || img.attr('title') || 'Unknown';
        
        cards.push({
          id: uuidv4(),
          set_code: setInfo.code,
          set_name: setInfo.name,
          card_number: cardNumber,
          name: cardName,
          image_url: imgSrc,
          card_url: 'https://pocket.limitlesstcg.com' + href
        });
      }
    });
    
    if (cards.length === 0 && setInfo.total_cards > 0) {
      console.log('  No cards found in HTML, generating from card count...');
      for (let i = 1; i <= setInfo.total_cards; i++) {
        const cardNumber = i.toString().padStart(3, '0');
        const cdnUrl = 'https://limitlesstcg.nyc3.cdn.digitaloceanspaces.com/pocket';
        cards.push({
          id: uuidv4(),
          set_code: setInfo.code,
          set_name: setInfo.name,
          card_number: i.toString(),
          name: 'Card ' + i,
          image_url: cdnUrl + '/' + setInfo.code + '/' + setInfo.code + '_' + cardNumber + '_EN_SM.webp',
          card_url: 'https://pocket.limitlesstcg.com/cards/' + setInfo.code + '_' + cardNumber
        });
      }
    }
    
    console.log('  Found ' + cards.length + ' cards');

    // Scrape detailed info for each card
    for (let i = 0; i < cards.length; i++) {
      await scrapeCardDetails(cards[i]);
      if (i % 10 === 0) {
        console.log('  Progress: ' + i + '/' + cards.length);
      }
      await new Promise(resolve => setTimeout(resolve, 100));
    }

  } catch (error) {
    console.error('  Error scraping set ' + setInfo.code + ':', error);
  }
  
  return cards;
}

async function scrapeCardDetails(card: PokemonCard): Promise<void> {
  try {
    const response = await axios.get(card.card_url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      timeout: 10000
    });

    const $ = cheerio.load(response.data);

    // Extract name from title
    const title = $('title').text();
    const nameMatch = title.match(/^([^•]+)/);
    if (nameMatch) {
      card.name = nameMatch[1].trim();
    }

    // Extract type and HP from card-text-title
    // Remove the name part first to avoid issues with names containing hyphens
    const cardName = $('.card-text-name').text().trim();
    const cardTitle = $('.card-text-title').text();

    // Remove the card name from the title to get just the type and HP parts
    let typeAndHp = cardTitle;
    if (cardName) {
      typeAndHp = cardTitle.replace(cardName, '').trim();
    }

    // Now parse "- Type - HP" pattern
    const typeMatch = typeAndHp.match(/^\s*-\s*([^-]+)\s*-/);
    if (typeMatch) {
      card.type = typeMatch[1].trim();
    }

    const hpMatch = typeAndHp.match(/(\d+)\s*HP/);
    if (hpMatch) card.hp = hpMatch[1];

    // Extract attacks
    const attacks: Attack[] = [];
    $('.card-text-attack').each((_, element) => {
      const attackInfo = $(element).find('.card-text-attack-info').text().replace(/\s+/g, ' ').trim();
      const attackEffect = $(element).find('.card-text-attack-effect').text().trim();

      // Parse attack name and damage (handles "Name 50" or "Name 30x" or just "Name")
      const match = attackInfo.match(/([A-Z][\w\s]+?)\s+(\d+x?)\s*$/);
      if (match) {
        attacks.push({
          name: match[1].trim(),
          damage: match[2],
          effect: attackEffect || undefined
        });
      } else {
        attacks.push({
          name: attackInfo.trim(),
          effect: attackEffect || undefined
        });
      }
    });
    if (attacks.length > 0) card.attacks = attacks;

    // Extract weakness, resistance, and retreat
    const wrr = $('.card-text-wrr').text();
    const weaknessMatch = wrr.match(/Weakness:\s*([^\n]+)/);
    if (weaknessMatch) card.weakness = weaknessMatch[1].trim();

    const retreatMatch = wrr.match(/Retreat:\s*(\d+)/);
    if (retreatMatch) card.retreat_cost = retreatMatch[1];

  } catch (error) {
    // Silently fail for individual cards
  }
}

function exportToCSV(cards: PokemonCard[], filename: string): void {
  const headers = [
    'id',
    'set_code',
    'set_name',
    'card_number',
    'name',
    'type',
    'hp',
    'rarity',
    'abilities',
    'attacks',
    'weakness',
    'resistance',
    'retreat_cost',
    'image_url',
    'card_url'
  ];
  
  const csvLines = [headers.join(',')];
  
  for (const card of cards) {
    const attacksStr = card.attacks ? card.attacks.map(a => a.name + ': ' + (a.damage || '')).join('; ') : '';
    const row = [
      escapeCsv(card.id),
      escapeCsv(card.set_code),
      escapeCsv(card.set_name),
      escapeCsv(card.card_number),
      escapeCsv(card.name),
      escapeCsv(card.type || ''),
      escapeCsv(card.hp || ''),
      escapeCsv(card.rarity || ''),
      escapeCsv(card.abilities ? card.abilities.join('; ') : ''),
      escapeCsv(attacksStr),
      escapeCsv(card.weakness || ''),
      escapeCsv(card.resistance || ''),
      escapeCsv(card.retreat_cost || ''),
      escapeCsv(card.image_url),
      escapeCsv(card.card_url)
    ];
    csvLines.push(row.join(','));
  }
  
  writeFileSync(filename, csvLines.join('\n'), 'utf-8');
  console.log('\nExported ' + cards.length + ' cards to ' + filename);
}

function escapeCsv(value: string): string {
  if (!value) return '';
  const needsQuotes = value.includes(',') || value.includes('"') || value.includes('\n');
  if (needsQuotes) {
    return '"' + value.replace(/"/g, '""') + '"';
  }
  return value;
}

async function main() {
  console.log('Pokemon Pocket Card Scraper');
  console.log('============================\n');
  
  const allCards: PokemonCard[] = [];
  
  for (const setInfo of SETS) {
    const cards = await scrapeSet(setInfo);
    allCards.push(...cards);
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  exportToCSV(allCards, 'pokemon_pocket_cards.csv');
  
  console.log('\n============================');
  console.log('Total cards scraped: ' + allCards.length);
  console.log('Scraping complete!');
}

main().catch(console.error);
