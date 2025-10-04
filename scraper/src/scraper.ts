import axios from 'axios';
import * as cheerio from 'cheerio';
import { writeFileSync, readFileSync, existsSync } from 'fs';
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

// Auto-detect sets from the website
async function discoverSets(): Promise<SetInfo[]> {
  console.log('🔍 Auto-discovering sets from limitlesstcg.com...\n');

  try {
    // Scrape the main cards page to find all available sets
    const response = await axios.get('https://pocket.limitlesstcg.com/cards', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      timeout: 30000
    });

    const $ = cheerio.load(response.data);
    const sets: SetInfo[] = [];

    // Look for set links - they follow pattern /cards/{SET_CODE}
    // These appear as navigation links on the cards page
    $('a[href^="/cards/"]').each((_, element) => {
      const href = $(element).attr('href');
      if (!href) return;

      // Match /cards/{SET_CODE} but not /cards/{SET_CODE}/{NUMBER}
      const match = href.match(/^\/cards\/([A-Z0-9\-]+)$/i);
      if (!match) return;

      const setCode = match[1];
      const setName = $(element).text().trim() || setCode;

      // Skip if already added or if it's just "Cards" link
      if (sets.find(s => s.code === setCode)) return;
      if (setCode.toLowerCase() === 'cards') return;

      sets.push({
        code: setCode,
        name: setName,
        release_date: '',
        total_cards: 0
      });
    });

    if (sets.length === 0) {
      console.log('⚠️  No sets found, using fallback list\n');
      return FALLBACK_SETS;
    }

    console.log(`✅ Found ${sets.length} sets:\n`);
    sets.forEach(set => console.log(`   - ${set.code}: ${set.name}`));
    console.log();

    return sets;
  } catch (error) {
    console.error('❌ Error discovering sets, using fallback:');
    console.error(error instanceof Error ? error.message : error);
    console.log();
    return FALLBACK_SETS;
  }
}

// Fallback sets in case auto-discovery fails
const FALLBACK_SETS: SetInfo[] = [
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

async function scrapeSet(setInfo: SetInfo, concurrency = 20): Promise<PokemonCard[]> {
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

    // Scrape card details in parallel batches
    await scrapeCardsInBatches(cards, concurrency);

  } catch (error) {
    console.error('  Error scraping set ' + setInfo.code + ':', error);
  }

  return cards;
}

// Scrape cards in parallel batches to avoid overwhelming the server
async function scrapeCardsInBatches(cards: PokemonCard[], concurrency: number): Promise<void> {
  const total = cards.length;
  let completed = 0;

  console.log(`  Scraping ${total} cards with concurrency ${concurrency}...`);

  for (let i = 0; i < cards.length; i += concurrency) {
    const batch = cards.slice(i, i + concurrency);

    await Promise.all(
      batch.map(card => scrapeCardDetails(card))
    );

    completed += batch.length;
    if (completed % 50 === 0 || completed === total) {
      console.log(`  Progress: ${completed}/${total}`);
    }
  }
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
    const attacksStr = card.attacks ? card.attacks.map(a => {
      let str = a.name + ': ' + (a.damage || '');
      if (a.effect) str += ' - ' + a.effect;
      return str;
    }).join('; ') : '';
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

// Load existing cards from CSV
function loadExistingCards(filename: string): Set<string> {
  if (!existsSync(filename)) {
    console.log('No existing CSV found, will scrape all cards');
    return new Set();
  }

  console.log('📂 Loading existing cards from ' + filename + '...');

  try {
    const csvContent = readFileSync(filename, 'utf-8');
    const lines = csvContent.split('\n');
    const existingCardKeys = new Set<string>();

    // Skip header line
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      // Parse CSV line to get set_code and card_number
      // Format: id,set_code,set_name,card_number,...
      const match = line.match(/^[^,]*,([^,]*),([^,]*),([^,]*),/);
      if (match) {
        const setCode = match[1].replace(/"/g, '');
        const cardNumber = match[3].replace(/"/g, '');
        const key = `${setCode}:${cardNumber}`;
        existingCardKeys.add(key);
      }
    }

    console.log(`✅ Found ${existingCardKeys.size} existing cards\n`);
    return existingCardKeys;
  } catch (error) {
    console.error('❌ Error loading existing cards:', error);
    return new Set();
  }
}

// Merge new cards with existing cards
function mergeCards(existingCards: PokemonCard[], newCards: PokemonCard[]): PokemonCard[] {
  const existingKeys = new Set(
    existingCards.map(c => `${c.set_code}:${c.card_number}`)
  );

  const uniqueNewCards = newCards.filter(card => {
    const key = `${card.set_code}:${card.card_number}`;
    return !existingKeys.has(key);
  });

  console.log(`\n📊 Merge Statistics:`);
  console.log(`   Existing cards: ${existingCards.length}`);
  console.log(`   New cards scraped: ${newCards.length}`);
  console.log(`   Unique new cards: ${uniqueNewCards.length}`);
  console.log(`   Total cards: ${existingCards.length + uniqueNewCards.length}\n`);

  return [...existingCards, ...uniqueNewCards];
}

// Parse existing CSV to get full card objects
function parseExistingCsv(filename: string): PokemonCard[] {
  if (!existsSync(filename)) {
    return [];
  }

  console.log('📂 Loading existing cards from ' + filename + '...');

  try {
    const csvContent = readFileSync(filename, 'utf-8');
    const lines = csvContent.split('\n');
    const cards: PokemonCard[] = [];

    // Skip header line
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      // Simple CSV parsing (not handling all edge cases, but good enough)
      const parts = line.split(',');
      if (parts.length >= 15) {
        const attacksStr = parts[9]?.replace(/"/g, '') || '';
        const attacks: Attack[] = attacksStr.split(';').map(a => {
          const [name, rest] = a.trim().split(':');
          if (!rest) return { name: name?.trim() || '' };

          // Split on ' - ' to separate damage from effect
          const [damage, effect] = rest.split(' - ').map(s => s.trim());
          return {
            name: name?.trim() || '',
            damage: damage || undefined,
            effect: effect || undefined
          };
        }).filter(a => a.name);

        cards.push({
          id: parts[0].replace(/"/g, ''),
          set_code: parts[1].replace(/"/g, ''),
          set_name: parts[2].replace(/"/g, ''),
          card_number: parts[3].replace(/"/g, ''),
          name: parts[4].replace(/"/g, ''),
          type: parts[5].replace(/"/g, ''),
          hp: parts[6].replace(/"/g, ''),
          rarity: parts[7].replace(/"/g, ''),
          abilities: parts[8]?.replace(/"/g, '').split(';').filter(a => a),
          attacks: attacks,
          weakness: parts[10]?.replace(/"/g, ''),
          resistance: parts[11]?.replace(/"/g, ''),
          retreat_cost: parts[12]?.replace(/"/g, ''),
          image_url: parts[13].replace(/"/g, ''),
          card_url: parts[14].replace(/"/g, '')
        });
      }
    }

    console.log(`✅ Loaded ${cards.length} existing cards\n`);
    return cards;
  } catch (error) {
    console.error('❌ Error parsing existing CSV:', error);
    return [];
  }
}

async function main() {
  console.log('Pokemon Pocket Card Scraper');
  console.log('============================\n');

  // Check if --full flag is passed
  const isFullScrape = process.argv.includes('--full');
  const csvFile = '../data/pokemon_pocket_cards.csv';

  if (isFullScrape) {
    console.log('🔄 Running FULL scrape (ignoring existing data)\n');
  } else {
    console.log('⚡ Running INCREMENTAL scrape (only new cards)\n');
  }

  // Load existing cards if doing incremental update
  const existingCards = isFullScrape ? [] : parseExistingCsv(csvFile);
  const existingCardKeys = new Set(
    existingCards.map(c => `${c.set_code}:${c.card_number}`)
  );

  // Auto-discover sets from the website
  const sets = await discoverSets();

  const newCards: PokemonCard[] = [];
  let skippedCount = 0;

  // Scrape all sets in parallel
  console.log(`\n🚀 Scraping ${sets.length} sets in parallel...\n`);

  const allSetCards = await Promise.all(
    sets.map(setInfo => scrapeSet(setInfo))
  );

  // Flatten and filter cards
  for (const setCards of allSetCards) {
    for (const card of setCards) {
      const key = `${card.set_code}:${card.card_number}`;
      if (!isFullScrape && existingCardKeys.has(key)) {
        skippedCount++;
      } else {
        newCards.push(card);
      }
    }
  }

  // Merge with existing cards
  const allCards = isFullScrape ? newCards : mergeCards(existingCards, newCards);

  exportToCSV(allCards, csvFile);

  console.log('\n============================');
  if (!isFullScrape && skippedCount > 0) {
    console.log('Skipped ' + skippedCount + ' existing cards');
    console.log('Added ' + newCards.length + ' new cards');
  }
  console.log('Total cards in database: ' + allCards.length);
  console.log('Scraping complete!');
}

main().catch(console.error);
