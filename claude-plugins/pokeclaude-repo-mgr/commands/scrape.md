---
name: scrape
description: Update Pokemon card data from limitlesstcg.com (incremental or full refresh)
---

# Scrape Card Data

Update the Pokemon card database from the LimitlessTCG website.

## What This Does

Fetches the latest Pokemon TCG Pocket card data and updates `data/pokemon_pocket_cards.csv`

## Usage

```
/repo:scrape
```

## Execution

Change to the `pokeclaude/` directory and run:

```bash
cd /Volumes/Storage/code/pokeclaude/pokeclaude && npm run scrape
```

## Modes

**Incremental (default):** Only fetches new cards (~6-7 minutes)

```bash
npm run scrape
```

**Full Refresh:** Fetches all cards from scratch

```bash
npm run scrape:full
```

## Output

- Number of new cards found
- Total cards in database
- Set-by-set progress
- Completion status

## Notes

- Auto-discovers new sets from limitlesstcg.com
- Uses UUID primary keys for all cards
- Detects evolution metadata automatically
