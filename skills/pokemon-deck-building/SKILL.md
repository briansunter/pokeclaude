---
name: pokemon-deck-builder
description: |
  Use when building, analyzing, or optimizing Pokemon TCG Pocket decks.
  Activates when user mentions deck building, deck analysis, synergies, optimization, or energy calculations.
  Provides complete 20-card deck construction with validation, energy analysis, synergy recommendations, and competitive strategy.
---

# Pokemon TCG Pocket Deck Builder

Build competitive Pokemon TCG Pocket decks with validation and strategy.

## Rules (Always Enforce)

- **20 cards**, max 2 copies per card
- **Energy Zone** auto-generates 1 Energy/turn (no energy cards needed)
- **3 points to win** — ex = 2 pts, regular = 1 pt; losing Mega ex = instant loss
- **3 bench slots** max (not 5 like standard TCG)
- **Turn 1**: no draw, no energy, no attack
- **1-2 energy types** recommended (3+ is inconsistent)
- **Point map**: 1-1-3 optimal for Mega decks (cheap first, Mega last)

## Construction Workflow

1. **Identify core** — Mega ex or primary strategy card
2. **Find partners** — MCP `find_synergies` for type + utility partners
3. **Add staples** — Professor's Research (2x), Poke Ball (2x), Cyrus (1-2x)
4. **Support evolution** — Rare Candy (2x) for any Stage 2 deck
5. **Balance trainers** — 8-10 Pokemon + 10-12 trainers is typical
6. **Validate** — MCP `analyze_deck` for composition check

## Deck Archetypes

| Archetype           | Strategy                        | Example                    |
| ------------------- | ------------------------------- | -------------------------- |
| Mega + Partner      | Mega ex power + utility         | Mega Altaria ex + Greninja |
| Disruption          | Hand/board control + damage     | Mega Absol ex + Hydreigon  |
| Snipe/Spread        | Bench damage → Cyrus finish     | Chien-Pao ex + Baxcalibur  |
| Energy Acceleration | Ramp faster than 1/turn         | Baxcalibur → Chien-Pao ex  |
| Self-Sufficient     | Powers itself, attacks on curve | Magnezone                  |
| Switch Combo        | Must switch for full damage     | Mega Scizor ex + Revavroom |

## Universal Staples

| Card                 | Count | Role              |
| -------------------- | ----- | ----------------- |
| Professor's Research | 2     | Draw 2 (staple)   |
| Poke Ball            | 2     | Search Basic      |
| Cyrus                | 1-2   | Gust damaged mon  |
| Rare Candy           | 2     | Skip Stage 1      |
| Copycat              | 1-2   | Hand manipulation |

## Validation Checklist

**Legal:**

- [ ] Exactly 20 cards
- [ ] Max 2 copies per card
- [ ] At least 5-6 basic Pokemon

**Strategic:**

- [ ] Clear win condition
- [ ] Point map planned
- [ ] Draw/search consistency tools
- [ ] 1-2 energy types
- [ ] Answer to common meta threats

**Energy curve:**

- [ ] Primary attacker at 2-3 energy
- [ ] Early game options at 1 energy
- [ ] Acceleration if needed (Rare Candy, abilities, items)

## MCP Tools

| Tool             | Use For                        |
| ---------------- | ------------------------------ |
| `search_cards`   | Find cards matching criteria   |
| `find_synergies` | Discover partner cards         |
| `find_counters`  | Identify counter strategies    |
| `get_type_stats` | Type distribution analysis     |
| `analyze_deck`   | Full deck composition analysis |

For complete deck lists by tier, see [REFERENCE.md](REFERENCE.md).
