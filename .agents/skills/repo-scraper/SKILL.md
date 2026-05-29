---
name: repo-scraper
description: |
  Use when managing the Pokemon TCG Pocket card data scraper or updating card data.
  Activates when user mentions scraping, updating cards, refreshing data, card database, limitlesstcg, or new sets.
  Covers running the scraper, validating output, and propagating new data to MCP server and skills.
---

# Repo Scraper

Scrape card data from limitlesstcg.com and propagate updates through the entire stack.

## Commands

```bash
bun run scrape          # Incremental (only new sets/cards)
bun run scrape:full     # Full refresh from scratch (~6-7 min)
```

Both run from repo root. The scraper lives in `scraper/src/scraper.ts`.

## How It Works

1. Auto-discovers sets from `https://pocket.limitlesstcg.com/cards`
2. Falls back to hardcoded `FALLBACK_SETS` list if discovery fails
3. Scrapes each set in parallel (concurrency=20)
4. Each card page parsed for: name, type, HP, attacks, abilities, weakness, retreat, rarity
5. Incremental: skips cards already in CSV (matched by `set_code:card_number`)
6. Detects evolution metadata (Mega ↔ base Pokemon)
7. Validates every card via Zod schema
8. Exports to `data/pokemon_pocket_cards.csv`

## After Scraping — Propagation Checklist

New data doesn't auto-propagate. Run these after every scrape:

1. **Build MCP server** — `bun run build` (copies CSV via `prebuild` script)
2. **Run tests** — `bun run test`
3. **Update card counts** — check `wc -l data/pokemon_pocket_cards.csv` and update any hardcoded counts in:
   - `CLAUDE.md` (references "2,077 cards" — may be stale)
   - `skills/*/SKILL.md` frontmatter descriptions (should NOT have hardcoded counts)
   - `skills/*/REFERENCE.md` (update if referenced)
4. **Update skills if new mechanics** — new sets may introduce mechanics that require updates to:
   - `skills/pokemon-card-analysis/REFERENCE.md` — new tier placements
   - `skills/pokemon-deck-building/REFERENCE.md` — new deck archetypes
   - `skills/pokemon-meta-analysis/REFERENCE.md` — meta shifts

## Data Validation

After scraping, spot-check the CSV:

```bash
# Count cards per set
cut -d',' -f2 data/pokemon_pocket_cards.csv | sort | uniq -c | sort -rn

# Check for empty names
awk -F',' '$5==""' data/pokemon_pocket_cards.csv

# Verify no duplicate set:number keys
awk -F',' 'NR>1{print $2":"$4}' data/pokemon_pocket_cards.csv | sort | uniq -d
```

## File Locations

| File                            | Purpose                                  |
| ------------------------------- | ---------------------------------------- |
| `scraper/src/scraper.ts`        | Scraper source (~920 lines)              |
| `data/pokemon_pocket_cards.csv` | Output database                          |
| `scraper/package.json`          | Scraper deps (axios, cheerio, zod, uuid) |

## CSV Schema

21 columns: `id, set_code, set_name, card_number, name, type, hp, rarity, abilities, attacks, weakness, resistance, retreat_cost, image_url, card_url, evolution_stage, evolves_from, evolves_to, evolution_type, base_pokemon_id, is_evolution, evolution_method`

## Troubleshooting

- **Timeout**: 30s per request; 10s per card detail. Retries with exponential backoff (1s, 2s, 4s).
- **Rate limiting**: User-Agent set to Chrome. If blocked, wait and retry.
- **Partial data**: Re-run `bun run scrape` to pick up missed sets.
- **Corrupt CSV**: `bun run scrape:full` regenerates from scratch.
- **Validation errors**: Zod logs the issue + field. Check scraper parsing logic for that set's HTML structure.
