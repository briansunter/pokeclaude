# Auto-Discovery Feature

## Overview

The scraper now **automatically discovers new sets** from limitlesstcg.com without requiring manual updates!

## How It Works

### 1. Auto-Discovery Process

When you run the scraper:

```bash
npm run scrape
```

It automatically:
1. Scrapes `https://pocket.limitlesstcg.com/cards`
2. Finds all set links (e.g., `/cards/A4b`, `/cards/A1`)
3. Extracts set codes and names
4. Scrapes cards from all discovered sets

### 2. Fallback System

If auto-discovery fails (network error, site change, etc.):
- Falls back to hardcoded set list
- Ensures scraper always works
- Logs error message

## Test Results

```
✅ Found 12 sets:

   - A4b: Deluxe Pack: ex A4b
   - A4a: Secluded Springs A4a
   - A4: Wisdom of Sea and Sky A4
   - A3b: Eevee Grove A3b
   - A3a: Extradimensional Crisis A3a
   - A3: Celestial Guardians A3
   - A2b: Shining Revelry A2b
   - A2a: Triumphant Light A2a
   - A2: Space-Time Smackdown A2
   - A1a: Mythical Island A1a
   - A1: Genetic Apex A1
   - P-A: Promo-A P-A
```

## Benefits

✅ **No manual updates needed** - New sets are automatically discovered
✅ **Always up to date** - Scrapes latest sets from website
✅ **Resilient** - Falls back to known sets if discovery fails
✅ **Future-proof** - Works with future sets (A5, A6, etc.)

## Implementation

### Code Structure

```typescript
// Auto-discovers sets from website
async function discoverSets(): Promise<SetInfo[]> {
  // 1. Scrape https://pocket.limitlesstcg.com/cards
  // 2. Find all links matching /cards/{SET_CODE}
  // 3. Extract set codes and names
  // 4. Return discovered sets or fallback
}

// Fallback sets if discovery fails
const FALLBACK_SETS: SetInfo[] = [
  { code: 'A4b', name: 'Deluxe Pack: ex A4b', ... },
  { code: 'A4a', name: 'Secluded Springs A4a', ... },
  // ... all known sets
];

async function main() {
  // Auto-discover sets
  const sets = await discoverSets();

  // Scrape all sets
  for (const setInfo of sets) {
    const cards = await scrapeSet(setInfo);
    allCards.push(...cards);
  }
}
```

### Set Detection Logic

The scraper looks for:
- Links matching pattern: `/cards/{SET_CODE}`
- Where SET_CODE is uppercase/numbers (A1, A2, A4b, P-A, etc.)
- Excludes card-specific links: `/cards/{SET}/{NUMBER}`

## When New Sets Are Added

### Example: A5 Release

When Pokemon Pocket releases set "A5 - New Set Name":

1. **No code changes needed**
2. Set appears on limitlesstcg.com
3. Run scraper: `npm run scrape` (incremental update)
4. Auto-discovers A5 automatically
5. Only scrapes new A5 cards (skips existing cards from other sets)
6. Merges with existing CSV data
7. **Super fast** - only scrapes what's new!

### Full vs Incremental Scrape

**Incremental (Default)**:
```bash
npm run scrape
```
- Loads existing CSV
- Only scrapes cards that don't exist
- Merges new cards with existing data
- **Fast** - skips 2000+ existing cards

**Full Scrape**:
```bash
npm run scrape:full
```
- Ignores existing CSV
- Scrapes all cards from scratch
- Overwrites CSV file
- **Slow** - ~6-7 minutes

### Manual Override (if needed)

If you want to scrape specific sets only:

```typescript
// In scraper.ts, replace discoverSets() call with:
const sets = [
  { code: 'A5', name: 'New Set', release_date: '', total_cards: 0 }
];
```

## Error Handling

### Scenario 1: Website Down
```
❌ Error discovering sets, using fallback:
Request failed with status code 503

✅ Using fallback sets (12 sets)
[Continues scraping with known sets]
```

### Scenario 2: No Sets Found
```
⚠️ No sets found, using fallback list

✅ Using fallback sets (12 sets)
[Continues scraping with known sets]
```

### Scenario 3: Partial Discovery
```
✅ Found 8 sets:
[Only found 8/12 sets due to site changes]

⚠️ Some sets may be missing
[Still scrapes discovered sets]
```

## Testing

### Test Auto-Discovery

```bash
npx tsx test-auto-discover.ts
```

Expected output:
- ✅ Found 12+ sets
- Each set has code and name
- Set codes match pattern (A1, A2, A4b, P-A, etc.)

### Test Full Scrape

```bash
npm run scrape
```

Expected behavior:
1. Auto-discovers sets
2. Shows discovered sets
3. Scrapes all cards
4. Exports to CSV

## Maintenance

### When to Update Fallback List

Update `FALLBACK_SETS` when:
- New sets are confirmed to exist
- Want to ensure scraper works offline
- Site structure changes break discovery

### How to Update

```typescript
const FALLBACK_SETS: SetInfo[] = [
  { code: 'A5', name: 'New Set Name', release_date: '...', total_cards: 0 },
  { code: 'A4b', name: 'Deluxe Pack: ex A4b', ... },
  // ... existing sets
];
```

## Limitations

1. **Depends on site structure** - If limitlesstcg.com changes link format, may need updates
2. **Set names may vary** - Scraper gets names from link text (may differ from official names)
3. **No set metadata** - Release dates and card counts not auto-discovered

## Future Improvements

Potential enhancements:
1. Auto-discover set release dates
2. Auto-discover set card counts
3. Cache discovered sets to reduce requests
4. Parallel set scraping for faster updates
5. Detect and notify about new sets without scraping
