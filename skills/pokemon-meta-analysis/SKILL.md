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
- Self-discard (e.g. Vespiquen ex Chase Order) removes potential KO points and Cyrus targets

**Turbo Evolution:**

- Caterpie Quick Growth: self-evolves from deck when it survives a turn Active — best-in-class turn-1 opener
- Quick-Grow Extract: accelerate evolutions on the bench

**Free Damage Abilities (stackable):**

- Greninja Water Shuriken: 20 dmg to any, once/turn, no energy
- Darkrai Bad Dreams: 20 dmg to sleeping Active
- Happiny Chubby Cheer: +20 to next-turn attacks
- These enable KO math + Cyrus pick-offs

**Energy-Zone Self-Chargers:**

- Magneton Volt Charge: attach Lightning from Energy Zone each turn (fuels Magnezone / Miraidon ex Hadron Ray)
- Milotic ex Aqua Charge: attach Water to itself each turn (fuels Vaporeon transfers / Chien-Pao)
- These leave your normal attachment free for partners

**Chip + Recoil Attackers:**

- Hoopa ex Shadow Bullet: 30 + 20 to bench for 1 Energy — manufactures Cyrus kills
- Mega Lucario ex / Hoopa ex Dynamite Punch: big numbers with self-damage tradeoffs

**Hand Disruption:**

- Mega Absol ex Darkness Claw: reveal hand, discard 1 Supporter
- Removing Cyrus/Sabrina/Professor can lock opponents out

**Status as Tempo (not Stall):**

- Team Rocket's Weezing ex: Poison + Burn ability, Confusion Gas adds Confused
- Milotic ex Water Pulse: 80 + Sleep
- Dedicated sleep stall underperforms; status works best attached to a real attacker

**Bench-Dependent Damage:**

- Mega Altaria ex: 40 + 30/bench (max 130 for 2E)
- Dedenne ex Circuit: 40× per Pokémon Tool across your board
- Must fill bench fast; vulnerable to Cyrus and self-discard synergies

## Deck Archetype Patterns

| Archetype           | Core Mechanic                                  | Key Examples                           |
| ------------------- | ---------------------------------------------- | -------------------------------------- |
| Mega + Partner      | Mega ex power + utility partner                | Mega Sceptile ex + Butterfree/Greninja |
| Turbo Evolution     | Self-evolving openers + evolution acceleration | Butterfree + Mega Sceptile ex          |
| Self-Discard Fuel   | Discard benched basics for damage / anti-Cyrus | Vespiquen ex + Shuckle ex              |
| Punish Ramp         | Damage scales with opponent's energy           | Indeedee ex + Giratina ex              |
| Disruption          | Hand/board control + steady dmg                | Mega Absol ex + Hydreigon              |
| Snipe/Spread        | Bench chip → Cyrus finish                      | Chien-Pao ex, Hoopa ex, Greninja       |
| Energy Acceleration | Ramp faster than 1/turn                        | Magnezone → Miraidon ex, Baxcalibur    |
| Self-Sufficient     | Powers itself, attacks on curve                | Magnezone, Milotic ex                  |
| Status Lock         | Poison/Burn/Sleep tempo                        | Team Rocket's Weezing ex + Hoopa ex    |
| Switch Combo        | Switch for damage trigger                      | Mega Scizor ex + Revavroom             |

## Type Meta Framework

Use MCP `get_type_stats` and `query_cards` for live data. Key type interactions:

- **Psychic** → beats Fighting (Mega Altaria ex walls Mega Lucario ex)
- **Lightning** → beats Water (Magnezone/Miraidon vs Suicune/Milotic)
- **Water** → beats Fire
- **Grass** → beats Water; **Fire** → beats Grass
- **Fighting** → beats Darkness (Lucario vs Hoopa/Absol/Weezing)
- **Darkness** → beats Psychic basics

## Data Sources

- **Pokemon Zone** — Top player polling + tournament results (Wilson-CI tier list on Limitless data)
- **PokemonMeta** — Automated power rankings from topping decklists
- **Limitless** — Tournament platform (deck counts, win rates)
- **MCP Server** — `get_type_stats`, `query_cards`, `analyze_deck`, `find_counters`

For current tier lists, power rankings, and matchup matrix, see [REFERENCE.md](REFERENCE.md).
