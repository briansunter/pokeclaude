---
name: repo-meta-research
description: |
  Use when researching Pokemon TCG Pocket meta trends to update the user-facing skills.
  Activates when user mentions updating meta, researching meta, refreshing tier lists, updating skills, or meta research.
  Covers data sources, research workflow, and how to propagate findings into skills/REFERENCE.md files.
---

# Repo Meta Research

Research Pokemon TCG Pocket meta and propagate findings into user-facing skills.

## Data Sources

| Source             | URL                             | What It Provides                                      |
| ------------------ | ------------------------------- | ----------------------------------------------------- |
| Pokemon Zone       | `pokemon-zone.com/pocket`       | Tier lists (top player polling + tournament results)  |
| PokemonMeta        | `pokemonmeta.com`               | Power rankings from 400+ topping tournament decklists |
| Limitless          | `pocket.limitlesstcg.com`       | Tournament results (147+ events, 16K+ players)        |
| Limitless Cards DB | `pocket.limitlesstcg.com/cards` | Card details, set browser                             |
| PokeGoldfish       | `pokegoldfish.com/pocket`       | Deck lists and meta breakdowns                        |

## Research Workflow

### 1. Gather Current Data

```
- Check Pokemon Zone for latest tier list
- Check PokemonMeta for power rankings
- Browse Limitless for recent tournament winning decks
- Check for new set releases on limitlesstcg.com
```

### 2. Query Local Database

Use the MCP server tools to cross-reference:

```
- query_cards: "SELECT type, COUNT(*) FROM cards GROUP BY type" — type distribution
- get_type_stats: current type breakdowns
- search_cards: find new cards by set code
- find_counters: verify matchup claims
```

### 3. Identify Changes

Compare research findings against current REFERENCE.md data:

- New tier placements (cards moving up/down)
- New deck archetypes emerging
- New staple cards entering the format
- Matchup shifts
- New set releases and their impact

### 4. Update Skills

Files to update (always update REFERENCE.md, never SKILL.md for time-sensitive data):

| File                                        | What to Update                                                       |
| ------------------------------------------- | -------------------------------------------------------------------- |
| `skills/pokemon-meta-analysis/REFERENCE.md` | Tier list, power rankings, matchup matrix, meta distribution, trends |
| `skills/pokemon-deck-building/REFERENCE.md` | Deck lists, archetype viability, best practices table                |
| `skills/pokemon-card-analysis/REFERENCE.md` | Card tier tables (S/A/B tier), trainer card lists                    |

### 5. Update Dates

Every REFERENCE.md has a "Last updated" header. Always update it:

```markdown
> Last updated: [Month Year] ([Set Code])
```

## What NOT to Hardcode in SKILL.md

These files should stay evergreen — no dates, counts, or meta-specific data:

- Card counts ("2908 cards") — changes with every scrape
- Set names ("Pulsing Aura B3") — becomes stale
- Dates ("April 2026") — immediately outdated
- Specific tier placements — shifts with tournaments

## Research Checklist

- [ ] Checked all 3 primary sources (Pokemon Zone, PokemonMeta, Limitless)
- [ ] Queried local MCP database for card/type stats
- [ ] Updated all 3 REFERENCE.md files if meta shifted
- [ ] Updated "Last updated" dates
- [ ] No time-sensitive data leaked into SKILL.md files
- [ ] Verified card names match database (no fabricated cards)
- [ ] Deck lists sum to exactly 20 cards
- [ ] Point maps included for Mega decks

## Triggering a Research Cycle

Typically after:

- New set release (every ~4-6 weeks)
- Major tournament results
- User asks for a meta update
- After running `bun run scrape` for a new set
