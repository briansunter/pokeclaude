---
name: Pokemon Deck Builder
description: |
  Use when building, analyzing, or optimizing Pokemon TCG Pocket decks.

  **Activates when user mentions:**
  - Deck building ("build a deck", "create deck")
  - Deck analysis ("analyze my deck", "check deck")
  - Synergy finding ("what works with X", "synergies")
  - Optimization ("improve my deck", "fix my deck")
  - Energy calculations ("energy curve", "energy needs")

  **Provides:** Complete deck construction with validation, energy curve analysis, synergy recommendations, and optimization suggestions. References proven deck archetypes and meta strategies.

  **Key benefit:** Legal, optimized, competitive-ready 20-card decks with detailed strategy explanations.
---

# Pokemon TCG Pocket Deck Builder

Build competitive Pokemon TCG Pocket decks with AI-powered analysis and strategy recommendations.

## Core Capabilities

### 1. Deck Construction Workflow

- **Initial Deck Build**: Start with a Mega ex or core strategy card
- **Synergy Analysis**: Find cards that work well together (type + trainers)
- **Energy Optimization**: Calculate energy requirements (1-2 types recommended)
- **Coverage Analysis**: Ensure diverse Pokemon types for matchup flexibility

### 2. Pokemon TCG Pocket Rules Integration

- **Deck Size**: 20 cards (standard format)
- **Energy Zone**: Auto-generates 1 Energy/turn (NOT from deck)
- **Win Conditions**: 3 points (ex Pokemon = 2 pts, regular = 1 pt; losing Mega ex = instant loss)
- **Bench Limit**: Max 3 Pokemon on bench (not 5 like standard TCG)
- **Turn 1**: No draw, no energy, no attack
- **Card Copies**: Max 2 copies per card
- **Point Mapping**: Optimal 1-1-3 (send cheap Pokemon first, Mega last)

### 3. MCP Server Integration

Access 2900+ Pokemon cards via integrated MCP server:

**Tools Available:**

- `search_cards`: Search with filters (name, type, HP, set, rarity)
- `find_synergies`: Find cards that work well together
- `find_counters`: Identify cards that counter specific strategies
- `get_type_stats`: Analyze type distributions and averages
- `analyze_deck`: Get detailed deck composition analysis

### 4. Strategic Analysis

**Deck Archetypes (Current Meta):**

| Archetype           | Description                     | Example Decks              |
| ------------------- | ------------------------------- | -------------------------- |
| Mega + Partner      | Mega ex power + utility partner | Mega Altaria ex + Greninja |
| Disruption          | Hand/board control + damage     | Mega Absol ex + Hydreigon  |
| Snipe/Spread        | Bench damage → Cyrus finish     | Chien-Pao ex, Greninja     |
| Energy Acceleration | Ramp faster than 1/turn         | Baxcalibur → Chien-Pao ex  |
| Self-Sufficient     | Powers itself, attacks on curve | Magnezone                  |
| Switch Combo        | Must switch for full damage     | Mega Scizor ex + Revavroom |

## Complete Top-Tier Deck Lists (Pulsing Aura B3 Meta, April 2026)

### Top Tier

**Chien-Pao ex + Suicune ex + Baxcalibur**

```
2 Frigibax, 2 Baxcalibur, 2 Suicune ex, Chien-Pao ex,
2 Rare Candy, 2 Poke Ball, 2 Professor's Research,
2 Cyrus, Inflatable Boat, Starting Plains, Lucky Ice Pop,
Irida, Copycat, Mars, Poke Ball
Strategy: Baxcalibur Ice Maker loads Chien-Pao ex with energy for
130 dmg to ANY Pokemon. Suicune ex as primary attacker + Legendary
Pulse consistency. 1-1-3 point map.
```

**Mega Altaria ex + Greninja + Chingling (Lisia build)**

```
2 Froakie, 2 Greninja, 2 Swablu, 2 Mega Altaria ex, Chingling,
2 Cyrus, 2 Rare Candy, 2 Poke Ball, 2 Professor's Research,
Copycat, Lisia, Training Area, 2 Lucky Ice Pop (or similar)
Strategy: Greninja Water Shuriken chips 20 dmg/turn free. Mega Altaria
ex's Mega Harmony hits 130 for 2 energy. Chingling disrupts Items.
Lisia fills bench + searches Swablu. Energy: Psychic.
```

**Mega Altaria ex + Darkrai + Igglybuff (Sleep variant)**

```
2 Swablu, 2 Mega Altaria ex, Darkrai, Igglybuff, Pichu,
2 Cyrus, 2 Rare Candy, 2 Poke Ball, 2 Professor's Research,
2 Copycat, Poison Barb (or support item), Lisia, Starting Plains
Strategy: Igglybuff/Darkrai puts Active to Sleep → Darkrai Dark Dreams
deals 20 free dmg. Build up Mega Altaria ex as finisher.
```

**Mega Absol ex + Hydreigon + Nihilego**

```
2 Deino, 2 Hydreigon, Nihilego, Absol, Mega Absol ex,
2 Rare Candy, 2 Poison Barb, 2 Copycat, 2 Lucky Ice Pop,
2 Poke Ball, 2 Professor's Research, Cyrus
Strategy: Mega Absol ex discards Supporters (hand disruption).
Hydreigon Hyper Ray hits 130 (1-point Pokemon). Nihilego + Poison
Barb raises poison to 20 dmg. Aggressive 1-1-3 point map.
```

### High Tier

**Mega Manectric ex + Zeraora**

```
2 Electrike, Mega Manectric ex, Pichu, Zeraora, Pom-Pom Oricorio,
2 Electric Generator, 2 Poke Ball, 2 Professor's Research,
2 Cyrus, Copycat, Lisia, Training Area, Rare Candy, Sabrina
Strategy: Fastest deck in format. Pichu + Electric Generator ramp.
Lightning Accelerator: 80 + 30 per point taken (up to 140).
```

**Magnezone + Heliolisk (Clemont build)**

```
2 Magnemite, 2 Magneton, 2 Magnezone, Heliolisk,
Clemont, Clemont's Backpack, 2 Poke Ball, 2 Professor's Research,
2 Cyrus, Copycat, Poke Ball, Sabrina, Training Area, Rare Candy
Strategy: Magneton Volt Charge self-powers. Clemont searches combo
pieces. Magnezone attacks on curve (reliable going 1st or 2nd).
Mirror Shot can lock opponent out of attacking.
```

**Greninja centerpiece**

```
2 Froakie, 2 Frogadier, 2 Greninja, Suicune ex, Greninja ex,
2 Rare Candy, 2 Poke Ball, 2 Professor's Research,
2 Cyrus, Misty, Irida, Lucky Ice Pop, Starting Plains, Copycat
Strategy: Greninja Water Shuriken every turn (free 20 dmg to any).
Paired with Water attackers. Misty for energy acceleration.
Cyrus picks off damaged benched Pokemon.
```

**Mega Charizard X ex + Entei ex**

```
2 Charmander, Charmeleon, Mega Charizard X ex, Entei ex,
2 Rare Candy, 2 Poke Ball, 2 Professor's Research,
2 Cyrus, Flame Patch, Copycat, Sabrina, Training Area
Strategy: Raging Blaze starts at 100, jumps to 180 when below
half HP (110). Entei ex Legendary Pulse draws + attacks as backup.
```

### Middle Tier

**Bellibolt ex + Magnezone**

```
2 Magnemite, 2 Magneton, 2 Magnezone, 2 Tadbulb, 2 Bellibolt ex,
2 Electric Generator, Clemont, Cyrus, Copycat, Lisia,
Training Area, Poke Ball, 2 Professor's Research
Strategy: Magnezone self-powers + counts toward Bellibolt's 4-energy
threshold. High-Voltage Cannon: 70→140 dmg. Fragile Tadbulb setup.
```

**Mega Scizor ex + Revavroom**

```
2 Scyther (or Skarmory), Mega Scizor ex, 2 Revavroom, Orthworm,
2 Rare Candy, 2 Poke Ball, 2 Professor's Research,
2 Cyrus, Metal support items, Copycat, Training Area
Strategy: Revavroom Metal Transport switches Active each turn →
Mega Scizor ex Bullet Slugger hits 150. 3-cost attack is slow.
```

### New (Pulsing Aura B3)

**Mega Lucario ex + Hitmonchan ex**

```
2 Riolu, Mega Lucario ex, 2 Hitmonchan ex, Lucario, Bonsly/Tyrogue,
2 Rare Candy, 2 Poke Ball, 2 Professor's Research,
2 Cyrus, Korrina, Arena of Antiquity, Copycat
Strategy: Fighting Pulse 90/140 dmg. Hitmonchan ex cheap 50 dmg
opener. Lucario Fighting Coach +10 buff. Korrina searches Fighting.
Weak to Mega Altaria ex (Psychic).
```

**Mega Sceptile ex + Pheromosa**

```
2 Treecko, 2 Grovyle, Mega Sceptile ex, Pheromosa, Nihilego,
2 Rare Candy, 2 Poke Ball, 2 Professor's Research,
2 Cyrus, Poison Barb, Fragrant Forest, Copycat
Strategy: Terminating Tail 130 + Poison (effective 140). Pheromosa
enables Cyrus plays. Fragrant Forest searches Treecko. Poison Barb
+ Nihilego stacks poison damage.
```

## Best Practices

### Deck Composition (Current Meta)

| Archetype           | Pokemon | Trainers | Key Cards                               |
| ------------------- | ------- | -------- | --------------------------------------- |
| Mega + Partner      | 8-10    | 10-12    | Rare Candy, Poke Ball, Cyrus, Professor |
| Disruption          | 7-8     | 12-13    | Copycat, Poison Barb, Lucky Ice Pop     |
| Snipe/Spread        | 8-10    | 10-12    | Free-damage abilities, Cyrus            |
| Energy Acceleration | 8-10    | 10-12    | Rare Candy, energy ramp cards           |
| Self-Sufficient     | 8-10    | 10-12    | Evolution search, draw power            |

### Universal Staples (Include in Nearly Every Deck)

- **Professor's Research** (2x) - Draw 2 cards
- **Poke Ball** (2x) - Search Basic Pokemon
- **Cyrus** (1-2x) - Gust damaged benched Pokemon to Active
- **Rare Candy** (2x in any Stage 2 deck) - Skip Stage 1 evolution
- **Copycat** (1-2x) - Hand manipulation, especially against disruption

### Common Mistakes to Avoid

- Running 3+ energy types (too inconsistent with Energy Zone)
- Missing Rare Candy in Stage 2 decks (required for on-curve attacks)
- Not including Cyrus (the most important gust effect in the format)
- Overloading on high-energy attackers without acceleration
- Ignoring bench size (must fill bench for Mega Altaria ex, plan bench carefully)
- Not planning point maps (1-1-3 is optimal for Mega decks)

## Deck Validation Checklist

**Legal Compliance:**

- [ ] Exactly 20 cards
- [ ] Max 2 copies per card
- [ ] At least 5-6 basic Pokemon
- [ ] Energy Zone handles energy (0-2 special energy cards max)

**Strategic Balance:**

- [ ] Clear win condition (Mega ex, ex attacker, or combo)
- [ ] Point map planned (which Pokemon to send first)
- [ ] Consistency tools (draw, search, evolution acceleration)
- [ ] 1-2 energy types maximum
- [ ] Answer to common meta threats

**Energy Curve:**

- [ ] Primary attacker at 2-3 energy cost
- [ ] Early game options at 1 energy
- [ ] Acceleration if needed (Rare Candy, abilities, items)
