import axios from 'axios';
import * as cheerio from 'cheerio';

interface SetInfo {
  code: string;
  name: string;
  release_date: string;
  total_cards: number;
}

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

    console.log(`✅ Found ${sets.length} sets:\n`);
    sets.forEach(set => console.log(`   - ${set.code}: ${set.name}`));
    console.log();

    return sets;
  } catch (error) {
    console.error('❌ Error discovering sets:', error);
    return [];
  }
}

discoverSets().catch(console.error);
