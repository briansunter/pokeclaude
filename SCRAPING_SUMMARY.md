# Pokemon Pocket Card Scraping Summary

## Scraping Results

**Total Cards Scraped**: 2,077 cards
**Date**: October 2, 2025
**Source**: https://pocket.limitlesstcg.com

### Cards Per Set

| Set Code | Set Name | Cards |
|----------|----------|-------|
| A4b | Deluxe Pack: ex A4b | 379 |
| A4a | Secluded Springs A4a | 105 |
| A4 | Wisdom of Sea and Sky A4 | 241 |
| A3b | Eevee Grove A3b | 107 |
| A3a | Extradimensional Crisis A3a | 103 |
| A3 | Celestial Guardians A3 | 239 |
| A2b | Shining Revelry A2b | 111 |
| A2a | Triumphant Light A2a | 96 |
| A2 | Space-Time Smackdown A2 | 207 |
| A1a | Mythical Island A1a | 86 |
| A1 | Genetic Apex A1 | 286 |
| P-A | Promo-A P-A | 117 |

## Data Fields

Each card includes:
- **id**: UUID primary key
- **set_code**: Set abbreviation
- **set_name**: Full set name  
- **card_number**: Number within the set
- **name**: Pokemon/card name
- **type**: Pokemon type (Grass, Fire, Water, etc.)
- **hp**: Hit points
- **attacks**: Attack names and damage
- **weakness**: Type weakness
- **retreat_cost**: Retreat cost number
- **image_url**: CDN URL for card image
- **card_url**: Link to card detail page

## Sample Queries

### Find all Grass type Pokemon
```bash
grep ",Grass," pokemon_pocket_cards.csv | head -5
```

### Find cards with 100+ HP
```bash
awk -F',' '$7 >= 100' pokemon_pocket_cards.csv | head -5
```

### Find all "ex" cards
```bash
grep " ex," pokemon_pocket_cards.csv
```

### Count cards by type
```bash
tail -n +2 pokemon_pocket_cards.csv | cut -d',' -f6 | sort | uniq -c | sort -rn
```

## Future Updates

To re-scrape and get updates:
```bash
npm run scrape
```

The scraper will automatically:
- Detect new sets by visiting the main cards page
- Scrape any new cards added to existing sets
- Update the CSV with the latest data
