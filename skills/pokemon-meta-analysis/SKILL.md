---
name: pokemon-meta-analyst
description: |
  Use when analyzing Pokemon TCG Pocket meta trends, competitive tier lists, deck archetypes, or strategic matchups.
  Activates when user asks about meta analysis, tier lists, competitive play, matchup spreads, or strategic advice.
  Provides data-driven insights using MCP server tools (get_type_stats, query_cards, find_counters).
---

# Pokemon TCG Pocket Meta Analyst

Analyze competitive Pokemon TCG Pocket meta with data-driven tier lists and matchup insights.

## Meta Analysis Workflow

1. **Query database** — MCP `get_type_stats` and `query_cards` for raw data
2. **Cross-reference sources** — Pokemon Zone, PokemonMeta, Limitless tournament data
3. **Analyze matchups** — Type effectiveness + deck archetype interactions
4. **Generate tier list** — Rank decks by tournament performance
5. **Identify trends** — Rising/declining strategies, new set impact

## Key Meta Concepts

**Point Mapping:**

- ex = 2 pts when KO'd, regular = 1 pt. Losing Mega ex = game loss.
- Optimal: 1-1-3 (cheap Pokemon first, Mega last)

**Free Damage Abilities (stackable):**

- Greninja Water Shuriken: 20 dmg to any, once/turn, no energy
- Darkrai ex Nightmare Aura: 20 dmg to sleeping Active
- Jolteon ex Electromagnetic Wall: 20 when opponent attaches energy
- These enable KO math + Cyrus pick-offs

**Hand Disruption:**

- Mega Absol ex Darkness Claw: reveal hand, discard 1 Supporter
- Removing Cyrus/Sabrina/Professor can lock opponents out

**Bench-Dependent Damage:**

- Mega Altaria ex: 40 + 30/bench (max 130 for 2E)
- Must fill bench quickly, vulnerable to Cyrus

## Deck Archetype Patterns

| Archetype           | Core Mechanic                   | Key Examples                      |
| ------------------- | ------------------------------- | --------------------------------- |
| Mega + Partner      | Mega ex power + utility partner | Altaria+Greninja, Absol+Hydreigon |
| Disruption          | Hand/board control + steady dmg | Absol+Hydreigon+Nihilego          |
| Snipe/Spread        | Bench chip → Cyrus finish       | Chien-Pao ex, Greninja            |
| Energy Acceleration | Ramp faster than 1/turn         | Baxcalibur→Chien-Pao ex           |
| Self-Sufficient     | Powers itself, attacks on curve | Magnezone                         |
| Switch Combo        | Switch for damage trigger       | Mega Scizor ex+Revavroom          |

## Type Meta Framework

Use MCP `get_type_stats` and `query_cards` for live data. Key type interactions:

- **Darkness** → beats Psychic (disruption dominance)
- **Water** → beats Fire (Greninja ubiquity)
- **Lightning** → beats Water (Manectric, Bellibolt)
- **Fighting** → beats Darkness (new counter to Absol)
- **Fire** → beats Grass/Metal (Charizard variants)

## Data Sources

- **Pokemon Zone** — Top player polling + tournament results
- **PokemonMeta** — Automated power rankings from 400+ topping decklists
- **Limitless** — Tournament platform (147+ events, 16K+ players)
- **MCP Server** — `get_type_stats`, `query_cards`, `analyze_deck`, `find_counters`

For current tier lists, power rankings, and matchup matrix, see [REFERENCE.md](REFERENCE.md).
