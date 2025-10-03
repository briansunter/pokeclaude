# Pokemon Pocket Card Scraper

Scrapes all Pokemon TCG Pocket cards from limitlesstcg.com and exports to CSV.

## Features

- Scrapes all available sets (A1, A1a, A2, A2a, A2b, A3, A3a, A3b, A4, A4a, A4b, P-A)
- Extracts detailed card information:
  - Card name, set, and number
  - Type and HP
  - Attacks with damage values
  - Weakness and retreat cost
  - Image URLs and card detail URLs
- Exports to CSV with UUID primary keys
- Automatic rate limiting to avoid overwhelming the server

## Installation

```bash
npm install
```

## Usage

Run the scraper:

```bash
npm run scrape
```

This will:
1. Scrape all cards from all sets (~2000+ cards)
2. Extract detailed information for each card
3. Export to `pokemon_pocket_cards.csv`
4. Takes approximately 6-7 minutes to complete

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

## Customization

To scrape specific sets, edit `scraper.ts` and modify:

```typescript
// Change this line:
const SETS: SetInfo[] = ALL_SETS;

// To this (example for A1 only):
const SETS: SetInfo[] = ALL_SETS.filter(s => s.code === 'A1');
```

## Notes

- The scraper includes a 100ms delay between requests to be respectful to the server
- Future sets (A4b, A4a, A4) may have limited data until they are released
- The scraper will continue even if individual cards fail to load
