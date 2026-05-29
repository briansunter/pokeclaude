---
name: pokemon-card-analyst
description: |
  Use when analyzing individual Pokemon cards, comparing card stats, evaluating attacks/abilities, or researching card rarity.
  Activates when user mentions card names, card comparisons, card stats, rarity, or strategic value.
  Provides detailed card analysis with type effectiveness, competitive viability scoring, and synergy recommendations via MCP server.
---

# Pokemon Card Analyst

Analyze individual Pokemon TCG Pocket cards with stats, strategic insights, and competitive evaluation.

## Analysis Workflow

1. **Retrieve card** — Use MCP `search_cards` or `get_card` to fetch data
2. **Evaluate stats** — HP, attacks, abilities, energy costs, weakness/retreat
3. **Score viability** — Apply competitive scoring framework (see below)
4. **Find synergies** — Use MCP `find_synergies` to locate partner cards
5. **Check counters** — Use MCP `find_counters` to identify threats
6. **Rate tier** — Position card in competitive meta

## Competitive Viability Scoring (1-100)

| Factor            | Weight | Measures                     |
| ----------------- | ------ | ---------------------------- |
| Base stats        | 30%    | HP, attack damage, abilities |
| Energy efficiency | 25%    | Cost vs damage output        |
| Type matchups     | 20%    | Weakness/resistance profile  |
| Meta relevance    | 15%    | Usage in competitive decks   |
| Versatility       | 10%    | Fit in multiple deck types   |

**Scale:** 90+ S-tier · 80-89 A-tier · 70-79 B-tier · 60-69 C-tier · <60 D-tier

## Type Effectiveness (Weakness = +20 damage)

| Type      | Weak To        | Strong Against             |
| --------- | -------------- | -------------------------- |
| Fire      | Water          | Grass, Metal               |
| Water     | Lightning      | Fire                       |
| Grass     | Fire           | Water, Ground              |
| Lightning | Fighting       | Water, Flying              |
| Psychic   | Darkness       | Fighting, Poison           |
| Darkness  | Fighting/Grass | Psychic                    |
| Fighting  | Psychic        | Darkness, Lightning, Metal |
| Metal     | Fire           | Fairy, Ice, Rock           |
| Dragon    | Fairy          | Dragon                     |
| Colorless | Fighting       | —                          |

## Key Synergy Pairs

- Greninja → any deck (Water Shuriken: free 20 dmg/turn)
- Baxcalibur → Chien-Pao ex (Ice Maker energy accel)
- Darkrai ex → sleep strategies (Igglybuff, Swablu Sing)
- Revavroom → Mega Scizor ex (Metal Transport switching)
- Magneton/Magnezone → Lightning decks (self-powered)
- Nihilego → Poison Barb → Mega Sceptile ex (poison stacking)
- Pichu → multi-energy decks (free energy battery)
- Lisia → Mega Altaria ex (bench fill + search)

## MCP Tools

| Tool             | Use For                         |
| ---------------- | ------------------------------- |
| `search_cards`   | Find cards matching criteria    |
| `get_card`       | Detailed single card info       |
| `get_type_stats` | Type-based statistics           |
| `find_synergies` | Partner card discovery          |
| `find_counters`  | Counter-strategy identification |
| `query_cards`    | Custom SQL analysis             |

For tournament tier lists and trainer card references, see [REFERENCE.md](REFERENCE.md).
