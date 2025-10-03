# Pokemon Pocket Card Scraper

Scrapes all Pokemon TCG Pocket cards from limitlesstcg.com and exports to CSV.

## Features

- **Auto-discovers new sets** - No manual updates needed when new sets are released!
- Scrapes all available sets (currently 12 sets: A1, A1a, A2, A2a, A2b, A3, A3a, A3b, A4, A4a, A4b, P-A)
- Extracts detailed card information:
  - Card name, set, and number
  - Type and HP
  - Attacks with damage values
  - Weakness and retreat cost
  - Image URLs and card detail URLs
- Exports to CSV with UUID primary keys
- Automatic rate limiting to avoid overwhelming the server
- Fallback to known sets if auto-discovery fails

## Installation

```bash
npm install
```

## Usage

### Incremental Update (Default - Recommended)

Only scrapes new cards that haven't been added yet:

```bash
npm run scrape
```

This will:
1. Load existing cards from `pokemon_pocket_cards.csv`
2. Auto-discover all available sets
3. Only scrape cards that don't exist in the CSV
4. Merge new cards with existing data
5. Export combined result
6. **Much faster** - skips already-scraped cards!

### Full Scrape

Scrape all cards from scratch (ignores existing data):

```bash
npm run scrape:full
```

This will:
1. Ignore existing CSV data
2. Scrape all cards from all sets (~2000+ cards)
3. Extract detailed information for each card
4. Overwrite `pokemon_pocket_cards.csv`
5. Takes approximately 6-7 minutes to complete

## Output Format

The CSV includes these columns:
- `id` - UUID primary key
- `set_code` - Set code (e.g., "A1", "A2")
- `set_name` - Full set name
- `card_number` - Card number within set
- `name` - Card name
- `type` - Pokemon type
- `hp` - Hit points
- `rarity` - Rarity level
- `abilities` - Special abilities
- `attacks` - Attack names and damage
- `weakness` - Type weakness
- `resistance` - Type resistance
- `retreat_cost` - Retreat cost number
- `image_url` - CDN URL for card image
- `card_url` - Link to card detail page

## Auto-Discovery

The scraper **automatically discovers new sets** from limitlesstcg.com:

1. Scrapes the main cards page
2. Finds all set links (e.g., `/cards/A5`, `/cards/A6`)
3. Automatically scrapes newly discovered sets
4. Falls back to known sets if discovery fails

See [AUTO_DISCOVERY.md](./AUTO_DISCOVERY.md) for details.

### Test Auto-Discovery

```bash
npx tsx test-auto-discover.ts
```

Expected output:
```
🔍 Auto-discovering sets from limitlesstcg.com...

✅ Found 12 sets:
   - A4b: Deluxe Pack: ex A4b
   - A4a: Secluded Springs A4a
   ...
```

## Notes

- The scraper includes a 100ms delay between requests to be respectful to the server
- New sets are automatically discovered when they appear on limitlesstcg.com
- The scraper will continue even if individual cards fail to load
- If auto-discovery fails, uses fallback list of known sets
