# Pokemon TCG Pocket: Type Matchups & Matchup Strategies

## Table of Contents

1. [Type Effectiveness Chart](#type-effectiveness-chart)
2. [Understanding Weakness & Resistance](#understanding-weakness--resistance)
3. [Type Synergy with Energy Zone](#type-synergy-with-energy-zone)
4. [Individual Type Strategies](#individual-type-strategies)
5. [Head-to-Head Matchup Guide](#head-to-head-matchup-guide)
6. [Counter-Picking for Tournament Play](#counter-picking-for-tournament-play)
7. [Tech Cards by Type](#tech-cards-by-type)
8. [Meta-Based Type Selection](#meta-based-type-selection)
9. [Common Type-Based Interactions](#common-type-based-interactions)
10. [Advanced Type Matchup Tactics](#advanced-type-matchup-tactics)

---

## Type Effectiveness Chart

### Official Pokemon TCG Pocket Type Relationships

This guide uses Pokemon TCG Pocket's specific type chart, which differs from the mainline TCG games.

#### Type Effectiveness Matrix

| Attacking →     | Fire | Water | Grass | Lightning | Psychic | Fighting | Darkness | Metal | Grass | Colorless |
| --------------- | ---- | ----- | ----- | --------- | ------- | -------- | -------- | ----- | ----- | --------- |
| **Fire** ↓      | 1x   | 0.5x  | 2x    | 1x        | 1x      | 1x       | 1x       | 2x    | 1x    | 1x        |
| **Water** ↓     | 2x   | 1x    | 0.5x  | 1x        | 1x      | 1x       | 1x       | 1x    | 1x    | 1x        |
| **Grass** ↓     | 0.5x | 2x    | 1x    | 1x        | 1x      | 1x       | 1x       | 1x    | 1x    | 1x        |
| **Lightning** ↓ | 1x   | 2x    | 1x    | 1x        | 1x      | 0.5x     | 1x       | 1x    | 1x    | 1x        |
| **Psychic** ↓   | 1x   | 1x    | 1x    | 1x        | 1x      | 0.5x     | 2x       | 1x    | 1x    | 1x        |
| **Fighting** ↓  | 1x   | 1x    | 1x    | 1x        | 2x      | 1x       | 1x       | 1x    | 1x    | 1x        |
| **Darkness** ↓  | 1x   | 1x    | 1x    | 1x        | 0.5x    | 1x       | 1x       | 1x    | 1x    | 1x        |
| **Metal** ↓     | 0.5x | 1x    | 1x    | 1x        | 1x      | 1x       | 1x       | 1x    | 1x    | 1x        |
| **Colorless** ↓ | 1x   | 1x    | 1x    | 1x        | 1x      | 1x       | 1x       | 0.5x  | 1x    | 1x        |

### Key Strengths and Weaknesses Summary

#### Fire

- **Strong against**: Grass (2x), Metal (2x)
- **Weak against**: Water (0.5x)
- **Neutral**: Lightning, Psychic, Fighting, Darkness, Colorless

#### Water

- **Strong against**: Fire (2x)
- **Weak against**: Grass (0.5x), Lightning (0.5x)
- **Neutral**: Psychic, Fighting, Darkness, Metal, Colorless

#### Grass

- **Strong against**: Water (2x)
- **Weak against**: Fire (0.5x)
- **Neutral**: Lightning, Psychic, Fighting, Darkness, Metal, Colorless

#### Lightning

- **Strong against**: Water (2x)
- **Weak against**: Fighting (0.5x), Metal (0.5x)
- **Neutral**: Fire, Grass, Psychic, Darkness, Colorless

#### Psychic

- **Strong against**: Fighting (2x), Darkness (2x)
- **Weak against**: Metal (0.5x)
- **Neutral**: Fire, Water, Grass, Lightning, Colorless

#### Fighting

- **Strong against**: Psychic (2x)
- **Weak against**: Lightning (0.5x)
- **Neutral**: Fire, Water, Grass, Darkness, Metal, Colorless

#### Darkness

- **Strong against**: Psychic (2x)
- **Weak against**: Fighting (0.5x)
- **Neutral**: Fire, Water, Grass, Lightning, Metal, Colorless

#### Metal

- **Strong against**: (No major strengths)
- **Weak against**: Fire (0.5x), Lightning (0.5x), Colorless (0.5x)
- **Neutral**: Water, Grass, Psychic, Fighting, Darkness

#### Colorless

- **Strong against**: Metal (2x)
- **Weak against**: Fighting (0.5x)
- **Neutral**: Fire, Water, Grass, Lightning, Psychic, Darkness

---

## Understanding Weakness & Resistance

### Weakness (+30 Damage)

When you attack a Pokemon that's weak to your type:

- **Adds 30 damage** to your total attack
- **Most impactful on close KOs**: Changes many 1-turn KOs to 2-turn KOs
- **Giovanni synergy**: Weakness + Giovanni = +40 total damage
- **Exploiting weakness**: Build decks to capitalize on common weaknesses

#### Examples of Impact

```
Fire (50 damage) vs. Grass Pokemon:
- Base: 50 damage
- Weakness: +30 damage
- Total: 80 damage

This KO thresholds:
- 70 HP Pokemon: 10 damage OHKO
- 80 HP Pokemon: Still needs follow-up

Water (60 damage) vs. Fire Pokemon:
- Base: 60 damage
- Weakness: +30 damage
- Total: 90 damage

vs. ex Pokemon (150 HP):
- First attack: 90 damage, 60 HP remaining
- Second attack: 90 damage, KO
```

### Resistance (-30 Damage)

When your opponent attacks a Pokemon that's resistant to their type:

- **Subtracts 30 damage** from their total attack
- **Defensive anchor**: Makes Pokemon much harder to KO
- **Stall strategy**: Build walls that resist common attack types
- **Energy denial**: Force them to use specific energy types

#### Examples of Impact

```
Metal Pokemon (120 HP) vs. Lightning Pokemon:
- Opponent attacks for 60 damage
- Resistance: -30 damage
- Total: 30 damage taken

Survives 4 attacks vs. 2 attacks (without resistance)

Fighting Pokemon (100 HP) vs. Lightning Pokemon:
- Opponent attacks for 60 damage
- Resistance: -30 damage
- Total: 30 damage taken
- Potion heals 30 = full heal!
```

### Weakness/Resistance Interaction with KO Math

#### Scenario 1: Weakness Enables OHKO

```
Your Fire Pokemon: 50 damage attack
Opponent's Grass Pokemon: 70 HP

Without Weakness:
- 50 < 70, can't KO
- Need 2 attacks

With Weakness:
- 50 + 30 = 80 > 70
- OHKO for 1 point

Decision: Attack immediately with weakness
```

#### Scenario 2: Resistance Prevents KO

```
Your Lightning Pokemon: 60 damage attack
Opponent's Metal Pokemon: 90 HP

Without Resistance:
- 60 damage, 30 HP remaining
- 1 more attack needed

With Resistance:
- 60 - 30 = 30 damage, 60 HP remaining
- 2 more attacks needed

Decision: Change targets or use Sabrina
```

#### Scenario 3: Both Players Have Advantage

```
Fire vs. Water: Fire takes 2x, Water takes 0.5x
- Fire attack on Water: Double damage to Water
- Water attack on Fire: Half damage to Fire
- Fire wins exchanges
- Water needs more hits or healing
```

---

## Type Synergy with Energy Zone

### The Critical Energy Zone Factor

In Pokemon TCG Pocket, the Energy Zone generates 1 energy per turn randomly. This fundamentally changes type strategy:

#### Single-Type Decks (100% Reliability)

```
Advantages:
- Always get the energy you need
- Predictable damage output
- Easier KO calculations
- Consistent turn-to-turn performance

Best types for mono:
1. Lightning: Strong attackers with 1-energy attacks
2. Psychic: Good damage + useful disruption
3. Fire: Strong weakness exploitation
4. Fighting: High damage output

Example Lightning Deck:
- Zapdos ex: 30 damage with 1 Lightning
- Raichu: 50 damage with 1 Lightning
- Pikachu ex: 40 damage with 1 Lightning
- Result: Every turn = reliable 30-50 damage
```

#### Two-Type Decks (50% Reliability)

```
Advantages:
- Cover multiple weaknesses
- Have backup plans
- Surprise factor

Disadvantages:
- 50% chance for right energy
- Inconsistent turn-to-turn
- Harder to plan KOs

Best type combinations:
1. Lightning/Fighting: Cover Lightning's weakness
2. Fire/Grass: Cover Fire's weakness to Water
3. Psychic/Darkness: Both strong against common types
4. Water/Fighting:互补 type advantages

Example Fire/Grass Deck:
- Charizard ex: 80 damage with 3 Fire
- Bulbasaur: 20 damage with 1 Grass
- Strategy: Use Grass when you get Grass energy, Fire when Fire energy
- Backup: Bulbasaur always usable (low cost)
```

#### Three-Type Decks (NOT RECOMMENDED)

```
Math:
- 33% chance for any specific energy
- Inconsistent in a 5-7 turn game
- Verdict: Don't do it

Exceptions:
- Only if all attackers cost 0 energy
- Or you have excellent draw/search
- Verdict: Still not worth it
```

### Energy Zone Reading and Prediction

#### Track Energy Types

After 2-3 turns, you can predict opponent's strategy:

- **Same energy twice**: Likely mono-type
- **Different energies**: Running 2-type
- **0-cost attackers**: Don't care about energy

#### Force Energy Mismatches

Use Sabrina strategically:

```
Opponent: Lightning deck (needs Lightning energy)
Your play: Sabrina their Pokemon
Result: They now need different energy for next attacker
If they only have Lightning energy generators = dead turn
```

#### Energy Zone Counters

Certain types naturally counter others:

```
Grass struggles vs. Fire (both common)
Solution: Play Water or Lightning

Lightning weak vs. Fighting
Solution: Play Fighting or Darkness

Psychic strong vs. Fighting/Darkness
Solution: Play Lightning or Metal
```

---

## Individual Type Strategies

### Fire

#### Core Strengths

- **Exploits Grass**: Grass is very common, Fire crushes it
- **Strong Metal matchup**: Metal is defensive, Fire breaks through
- **Ex Pokemon hunters**: High damage can pressure ex
- **Giovanni synergy**: +10 damage enables many OHKOs

#### Best Fire Cards

```
Pikachu ex (Genetic Apex A1-001):
- 90 HP
- Circle Circuit: 40 damage with 1 Lightning (NOT Fire)
- Thunder Shock: 10 damage with 1 Lightning
- Weakness: Fighting
- Retreat: 1

Charizard ex (Genetic Apex A1-009):
- 150 HP
- Flame Burst: 80 damage with 3 Fire
- Fire Spin: 120 damage with 3 Fire
- Weakness: Water
- Retreat: 3
- Strategy: Use Rare Candy to get online Turn 2

Charmander (Base Set):
- 60 HP
- Scratch: 10 damage
- Fiery 10: 30 damage with 1 Fire
- Strategy: Early attacker, evolves later

Charmeleon (Base Set):
- 80 HP
- Slash: 40 damage
- Fiery 20: 60 damage with 1 Fire
- Strategy: Middle evolution, solid stats
```

#### Fire Deck Strategy

```
Early Game (Turns 1-2):
- Play Charmander, attack for 10-30
- Try to get evolution online
- Don't overcommit if opponent is Water

Mid Game (Turns 3-4):
- Charizard ex online
- Attack for 80-120 damage
- Use Sabrina to remove threats
- Giovanni when needed for KO

Late Game (Turns 5+):
- Pressure ex Pokemon for 2 points
- Use weakness against Grass types
- Close with sustained pressure

Key Matchups:
- vs. Grass: Favored (2x weakness)
- vs. Water: Disadvantaged (0.5x resistance)
- vs. Metal: Slightly favored
- vs. Fighting: Neutral
```

#### When to Play Fire

- **Meta has lots of Grass**: Grass is common starter type
- **Want direct pressure**: Fire has immediate impact
- **Versus slow decks**: Fire can race control decks
- **Energy zone cooperates**: Getting Fire energy regularly

#### Fire Tech Cards

```
Professor Oak: Find your Fire attackers
Giovanni: Enable OHKOs against 60-70 HP Basics
Potion: Keep Fire attackers alive longer
Sabrina: Remove Water types (your weakness)
Pokeball: Find Charizard or rare Fire Pokemon
```

### Water

#### Core Strengths

- **Exploits Fire**: Fire is very common in meta
- **Solid defensive options**: High HP Water types
- **Energy acceleration**: Many Water attackers need only 1-2 energy
- **Healing synergy**: Water types often have healing options

#### Best Water Cards

```
Squirtle (Base Set):
- 60 HP
- Tackle: 10 damage
- Water Gun: 30 damage with 1 Water
- Strategy: Consistent early game attacker

Wartortle (Base Set):
- 80 HP
- Bite: 40 damage
- Water Gun: 50 damage with 1 Water
- Strategy: Reliable mid-game attacker

Blastoise ex (Genetic Apex A1-004):
- 180 HP
- Squall Cannon: 120 damage with 3 Water
- Energy Bomb: Attach up to 3 energy from your deck
- Weakness: Grass
- Retreat: 3
- Strategy: Late-game finisher, energy acceleration

Starmie ex (Genetic Apex A1-014):
- 110 HP
- Swift: 60 damage (no energy cost!)
- Recover: Heal 60 damage (discard energy)
- Weakness: Lightning
- Retreat: 1
- Strategy: Versatile attacker, cycling attacker
```

#### Water Deck Strategy

```
Early Game (Turns 1-2):
- Play Squirtle, establish Water energy
- Attack for 30-50 damage
- Watch for Grass weakness

Mid Game (Turns 3-4):
- Wartortle or early Starmie ex
- Use Recover to stay healthy
- Build energy for Blastoise ex

Late Game (Turns 5+):
- Blastoise ex + energy acceleration
- Exhaust their attackers
- Use Recover to outlast

Key Matchups:
- vs. Fire: Favored (2x weakness)
- vs. Grass: Disadvantaged (0.5x resistance)
- vs. Lightning: Neutral to slightly unfavorable
```

#### When to Play Water

- **Meta dominated by Fire**: Counter the popular choice
- **Want defensive options**: Recover, high HP
- **Energy acceleration**: Blastoise ex is powerful
- **Versus aggro**: Outlast their early pressure

### Grass

#### Core Strengths

- **Exploits Water**: Water is very common
- **Status effects**: Many Grass Pokemon have paralysis, sleep
- **Energy acceleration**: Some Grass Pokemon reduce energy costs
- **Stall potential**: High HP with recovery

#### Best Grass Cards

```
Bulbasaur (Base Set):
- 60 HP
- Tackle: 10 damage
- Vine Whip: 30 damage with 1 Grass
- Strategy: Consistent early attacker

Ivysaur (Base Set):
- 80 HP
- Razor Leaf: 50 damage
- Vine Whip: 30 damage with 1 Grass
- Strategy: Reliable damage output

Venusaur ex (Genetic Apex A1-010):
- 160 HP
- Solar Beam: 120 damage with 2 Grass
- Growth: +20 damage to next attack
- Weakness: Fire
- Retreat: 3
- Strategy: High HP attacker, scales with Growth

Gengar (Promo Pack):
- 90 HP
- Spirit Shackle: 50 damage
- Spook: Switch opponent's active Pokemon
- Weakness: Psychic
- Retreat: 2
- Strategy: Disruption + damage
```

#### Grass Deck Strategy

```
Early Game (Turns 1-2):
- Bulbasaur for consistent 30 damage
- Avoid Fire types
- Set up evolution

Mid Game (Turns 3-4):
- Ivysaur or early Venusaur ex
- Use status effects when possible
- Control the board

Late Game (Turns 5+):
- Venusaur ex for 120+ damage
- Use Growth for extra pressure
- Stall with healing if needed

Key Matchups:
- vs. Water: Favored (2x weakness)
- vs. Fire: Disadvantaged (0.5x resistance)
- vs. Lightning: Neutral
```

#### When to Play Grass

- **Counter Water meta**: Water is very common
- **Want status effects**: Control the game
- **Stall strategy**: High HP + healing
- **Energy acceleration**: Solar Beam only needs 2 energy

### Lightning

#### Core Strengths

- **No retreat cost**: Many Lightning Pokemon have 0 retreat
- **Fast attacks**: Many 1-energy attackers
- **Energy consistency**: 1 energy is easy to get
- **Ex Pokemon pressure**: Good damage output

#### Best Lightning Cards

```
Pikachu (Base Set):
- 60 HP
- Tackle: 10 damage
- Thunder Jolt: 30 damage with 1 Lightning
- Weakness: Fighting
- Retreat: 1
- Strategy: Reliable early game

Raichu (Base Set):
- 80 HP
- Thunder Shock: 40 damage
- Agility: 30 damage + Retreat cost 0
- Weakness: Fighting
- Retreat: 0
- Strategy: Versatile, can switch freely

Zapdos ex (Genetic Apex A1-011):
- 120 HP
- Thunder Spear: 30 damage with 1 Lightning
- Lightning Strike: 80 damage with 3 Lightning
- Weakness: Fighting
- Retreat: 0
- Strategy: Versatile attacker, excellent stats
```

#### Lightning Deck Strategy

```
Early Game (Turns 1-2):
- Pikachu for 30 damage
- Zapdos ex for 30 damage
- Maintain board control

Mid Game (Turns 3-4):
- Raichu for 40 damage
- Zapdos ex for 80 damage (with energy)
- Use Agility for flexible positioning

Late Game (Turns 5+):
- Sustained pressure from 0-retreat attackers
- Force bad trades
- Close with fast KOs

Key Matchups:
- vs. Water: Favored (2x weakness)
- vs. Metal: Disadvantaged (0.5x resistance)
- vs. Fighting: Disadvantaged (weakness)
```

#### When to Play Lightning

- **Fast deck**: 1-energy attacks
- **Flexible positioning**: 0 retreat costs
- **Consistent energy**: Only need 1 Lightning energy
- **Versus Water-heavy meta**: Water is very common

### Psychic

#### Core Strengths

- **Exploits Fighting**: Fighting is popular
- **Exploits Darkness**: Darkness sees play
- **Disruption**: Many Psychic Pokemon have status effects
- **Versatile**: Good matchup spread

#### Best Psychic Cards

```
Abra (Base Set):
- 60 HP
- Teleport: Switch to bench
- Psychic: 20 damage + 20 per damage counter
- Weakness: Psychic
- Retreat: 1
- Strategy: Early game with Teleport

Kadabra (Base Set):
- 90 HP
- Teleport: Switch to bench
- Confusion: 40 damage + flip coin
- Weakness: Psychic
- Retreat: 2
- Strategy: Disruption with coin flips

Alakazam (Genetic Apex A1-020):
- 130 HP
- Psychic: 30 damage + 30 per damage counter
- Damage Swap: Switch damage counters
- Weakness: Psychic
- Retreat: 2
- Strategy: Scales with damage counters, can manipulate them
```

#### Psychic Deck Strategy

```
Early Game (Turns 1-2):
- Abra for early pressure
- Use Teleport for safety
- Build energy for evolution

Mid Game (Turns 3-4):
- Kadabra confusion disruption
- Alakazam for high damage
- Exploit Fighting/Darkness weakness

Late Game (Turns 5+):
- High damage output
- Status effects and disruption
- Solid matchup spread

Key Matchups:
- vs. Fighting: Favored (2x weakness)
- vs. Darkness: Favored (2x weakness)
- vs. Metal: Disadvantaged (0.5x resistance)
```

#### When to Play Psychic

- **Versatile strategy**: Good into multiple types
- **Disruption focus**: Confusion, status effects
- **Meta has Fighting**: Fighting is common archetype
- **Damage manipulation**: Alakazam is unique

### Fighting

#### Core Strengths

- **Exploits Psychic**: Psychic is strong
- **High damage**: Fighting Pokemon hit hard
- **No energy weaknesses**: Attacks often cost Fighting
- **Energy efficient**: Many need only 1-2 Fighting energy

#### Best Fighting Cards

```
Machop (Base Set):
- 60 HP
- Karate Chop: 20 damage
- Low Kick: 40 damage with 1 Fighting
- Weakness: Lightning
- Retreat: 1
- Strategy: Solid early attacker

Machoke (Base Set):
- 100 HP
- Karate Chop: 40 damage
- Low Kick: 60 damage with 1 Fighting
- Weakness: Lightning
- Retreat: 2
- Strategy: Sticky mid-game attacker

Machamp ex (Genetic Apex A1-021):
- 180 HP
- Beatdown: 120 damage with 3 Fighting
- Cross Chop: 90 damage, flip coin
- Weakness: Lightning
- Retreat: 3
- Strategy: Heavy hitter, late-game finisher
```

#### Fighting Deck Strategy

```
Early Game (Turns 1-2):
- Machop for 20-40 damage
- Establish Fighting energy
- Avoid Lightning if possible

Mid Game (Turns 3-4):
- Machoke for 60 damage
- Build energy for Machamp ex
- Pressure Psychic types

Late Game (Turns 5+):
- Machamp ex for 120 damage
- Force KO exchanges
- Close with big attacks

Key Matchups:
- vs. Psychic: Favored (2x weakness)
- vs. Lightning: Disadvantaged (weakness)
- vs. Neutral types: Favored
```

#### When to Play Fighting

- **Exploit Psychic**: Psychic is common
- **High damage strategy**: Hit hard, hit fast
- **Simple game plan**: Straightforward attacks
- **Versus control**: Beatdown strategy

### Darkness

#### Core Strengths

- **Exploits Psychic**: Psychic is strong
- **Disruption**: Many Darkness Pokemon disrupt
- **Intimidation**: Psychic damage reduction
- **Unique effects**: Bypass defenses

#### Best Darkness Cards

```
Ekans (Base Set):
- 50 HP
- Bite: 10 damage
- Spite: Put damage counter on Pokemon in play
- Weakness: Fighting
- Retreat: 1
- Strategy: Early disruption

Arbok (Base Set):
- 80 HP
- Bite: 40 damage
- Wrath: 60 damage, discard all energy
- Weakness: Fighting
- Retreat: 2
- Strategy: High-risk, high-reward

Mewtwo (Promo Pack):
- 110 HP
- Barrier: Reduce damage by 30
- Psychic: 40 damage
- Weakness: Darkness
- Retreat: 2
- Strategy: Defensive attacker with Psychic typing
```

#### Darkness Deck Strategy

```
Early Game (Turns 1-2):
- Ekans for Spite disruption
- Apply damage counters early
- Set up for evolution

Mid Game (Turns 3-4):
- Arbok for pressure
- Mewtwo for consistent 40 + barrier
- Control the board state

Late Game (Turns 5+):
- Sustain pressure
- Use disruption to gain advantage
- Close with KOs

Key Matchups:
- vs. Psychic: Favored (2x weakness)
- vs. Fighting: Disadvantaged (weakness)
- vs. Neutral types: Slightly favored
```

#### When to Play Darkness

- **Disruption strategy**: Apply early pressure
- **Versus Psychic**: Counter strong matchup
- **Unique effects**: Spite, barrier, etc.
- **Control the board**: Make opponent's life hard

### Metal

#### Core Strengths

- **High HP**: Many Metal Pokemon are defensive
- **Resistance**: Reduce common damage types
- **Late-game scaling**: Strong end-game
- **Stall potential**: Outlast opponents

#### Best Metal Cards

```
Magnemite (Base Set):
- 50 HP
- Thunder Jolt: 30 damage with 1 Lightning
- Tackle: 10 damage
- Weakness: Fire
- Retreat: 1
- Strategy: Early attacker despite Metal typing

Magneton (Base Set):
- 80 HP
- Thunder Jolt: 30 damage with 1 Lightning
- Zap: 60 damage with 2 Lightning
- Weakness: Fire
- Retreat: 1
- Strategy: Versatile mid-game

Steelix ex (Genetic Apex A1-017):
- 170 HP
- Steel Wing: 80 damage + reduce damage by 30
- Iron Tail: 120 damage with 3 Metal
- Weakness: Fire
- Retreat: 3
- Strategy: Defensive attacker, high HP
```

#### Metal Deck Strategy

```
Early Game (Turns 1-2):
- Magnemite for surprising Lightning damage
- Avoid Fire at all costs
- Build energy for Steelix ex

Mid Game (Turns 3-4):
- Magneton for versatility
- Steel Wing for 80 + defense
- Control board with resistance

Late Game (Turns 5+):
- Steelix ex for 170 HP wall
- Resist common attacks
- Outlast and close

Key Matchups:
- vs. Metal: Neutral (mirror)
- vs. Fire: Disadvantaged (weakness)
- vs. Lightning: Disadvantaged (weakness)
- vs. Colorless: Favored (resistance)
```

#### When to Play Metal

- **Defensive strategy**: High HP, resistance
- **Versus Colorless-heavy meta**: Colorless is common
- **Stall plan**: Outlast opponents
- **Late-game strength**: Strong finishers

### Colorless

#### Core Strengths

- **Versatility**: Works with any energy type
- **No energy dependencies**: Most attacks cost Colorless
- **Exploits Metal**: Metal is defensive
- **Simple game plan**: Straightforward damage

#### Best Colorless Cards

```
Pidgey (Base Set):
- 50 HP
- Gust: 10 damage
- Tackle: 30 damage
- Weakness: Lightning
- Retreat: 1
- Strategy: Early filler

Pidgeotto (Base Set):
- 80 HP
- Gust: 20 damage
- Quick Attack: 40 damage + flip coin
- Weakness: Lightning
- Retreat: 2
- Strategy: Coin flip disruption

Pidgeot (Genetic Apex A1-006):
- 130 HP
- Gale: 60 damage
- Hurricane: 120 damage with 3 Colorless
- Weakness: Lightning
- Retreat: 2
- Strategy: High damage late-game

Mew (Promo Pack):
- 60 HP
- Free Fix: Look at top 3 cards, choose 1
- Psychic: 20 damage
- Weakness: Darkness
- Retreat: 1
- Strategy: Consistency engine
```

#### Colorless Deck Strategy

```
Early Game (Turns 1-2):
- Pidgey for 30 damage
- Use Mew for consistency
- Play simple, efficient attacks

Mid Game (Turns 3-4):
- Pidgeotto for 40-60 damage
- Mew for card selection
- Build energy for big finishers

Late Game (Turns 5+):
- Pidgeot for 120 damage
- Consistent 30-60 damage from basics
- Use Mew to find answers

Key Matchups:
- vs. Metal: Favored (2x weakness)
- vs. Lightning: Disadvantaged (weakness)
- vs. Neutral types: Neutral
```

#### When to Play Colorless

- **Simple strategy**: Easy to play
- **Consistency**: No energy dependencies
- **Versatility**: Any deck can use Colorless
- **Mew synergy**: Free Fix is powerful

---

## Head-to-Head Matchup Guide

### Fire vs. Water

#### Matchup Analysis

```
Fire Attack on Water Pokemon:
- Fire does 0.5x damage to Water
- Water does 2x damage to Fire
- Water player has advantage

Example:
Fire Pokemon: 50 damage → 25 damage on Water
Water Pokemon: 50 damage → 100 damage on Fire
Result: Fire takes double damage, Water takes half
```

#### Fire Player Strategy

1. **Avoid Water types**: Use Sabrina to switch them out
2. **Go around**: Hit non-Water Pokemon
3. **Energy denial**: Force Water player to use Water energy
4. **Rush down**: Get KOs before Water builds up
5. **Giovanni timing**: Use +10 to enable close KOs

**Key plays**:

- If Water player plays Squirtle: Don't attack with Fire
- If only attacker is weak to Water: Heal instead of attack
- Use Sabrina on Blastoise ex before energy acceleration

#### Water Player Strategy

1. **Stack Water types**: Maximize weakness advantage
2. **Energy acceleration**: Get Blastoise ex online
3. **Healing priority**: Recover keeps attackers alive
4. **Forcing Fire to trade**: Make them take bad exchanges
5. **Control the game**: Use Starmie ex cycling

**Key plays**:

- Early Squirtle pressure forces Fire to trade poorly
- Blastoise ex energy acceleration snowballs
- Recovery vs. Fire's high-damage attacks

#### Deck Lists

**Fire Deck**:

```
2x Charmander (Base Set)
1x Charizard ex (Genetic Apex)
2x Charmeleon (Base Set)
4x Professor's Research
2x Giovanni
2x Sabrina
4x Fire Energy
5x Other trainers
```

**Water Deck**:

```
2x Squirtle (Base Set)
1x Blastoise ex (Genetic Apex)
1x Starmie ex (Genetic Apex)
2x Wartortle (Base Set)
4x Professor Oak
2x Potion
2x Sabrina
4x Water Energy
5x Other trainers
```

#### Win Conditions

```
Fire Win Conditions:
1. Knock out 3 Water Pokemon before they build up
2. Sabrina blastoise ex to prevent energy acceleration
3. Build rapid Charizard ex for 80+ damage
4. Exploit non-Water Pokemon on their bench

Water Win Conditions:
1. Use weakness to trade 2-for-1
2. Energy acceleration for late-game snowball
3. Recovery to outlast Fire attacks
4. Stack multiple Water attackers for pressure
```

### Grass vs. Fire

#### Matchup Analysis

```
Grass Attack on Fire Pokemon:
- Grass does 0.5x damage to Fire
- Fire does 2x damage to Grass
- Fire player has significant advantage

Example:
Grass Pokemon: 40 damage → 20 damage on Fire
Fire Pokemon: 40 damage → 80 damage on Grass
Result: Fire has 4x effective damage advantage
```

#### Grass Player Strategy

1. **Avoid early Fire**: If they lead with Fire, Sabrina immediately
2. **Target bench**: Hit non-Fire Pokemon when possible
3. **Status effects**: Paralyze or sleep Fire Pokemon
4. **Healing priority**: Keep Grass Pokemon alive
5. **Late-game**: Venusaur ex can pressure

**Key plays**:

- Gengar's Spook to remove dangerous Fire attackers
- Healing to extend Grass Pokemon life
- Avoid attacking Fire unless you have KO

#### Fire Player Strategy

1. **Lead with Fire**: Charmander or Charizard ex
2. **Exploit weakness**: Every attack gets +30 damage
3. **Rush down**: Get KOs quickly before healing
4. **Don't overcommit**: Don't play into Sabrina
5. **Close efficiently**: Use weakness to get quick KOs

#### Common Scenarios

**Scenario 1: Fire Leads, Grass Reacts**

```
Turn 1: Fire plays Charmander
Turn 1: Grass plays Squirtle (trying to counter Fire later)

Analysis: Grass is playing scared. They should either:
- Play Grass and accept the bad matchup
- Sabrina immediately to disrupt Fire
```

**Scenario 2: Both Evolve**

```
Turn 2: Fire evolves Charmeleon (80 HP)
Turn 2: Grass evolves Ivysaur (80 HP)

Damage calculation:
Fire: 60 damage → 120 damage (weakness)
Grass: 50 damage → 25 damage (resistance)

Result: Fire takes 25, Grass takes 120
Grass needs immediate healing or will lose
```

### Lightning vs. Fighting

#### Matchup Analysis

```
Lightning Attack on Fighting Pokemon:
- Lightning does normal damage
- Fighting does 2x damage to Lightning (weakness)

Example:
Lightning Pokemon: 60 damage → 60 damage on Fighting
Fighting Pokemon: 50 damage → 100 damage on Lightning

Result: Fighting has advantage in exchanges
```

#### Lightning Player Strategy

1. **Avoid Fighting types**: Use Sabrina or switch
2. **Fast KOs**: Get quick KOs before Fighting builds up
3. **0-retreat advantage**: Use Zapdos ex flexibility
4. **Target bench**: Hit non-Fighting when possible
5. **Healing priority**: Keep attackers alive

**Key plays**:

- Zapdos ex's 0 retreat cost lets you switch out of bad matchups
- Raichu's Agility for flexible positioning
- Avoid Machop/Machoke if you can

#### Fighting Player Strategy

1. **Stack Fighting types**: Maximize weakness advantage
2. **Evolve quickly**: Machoke → Machamp ex
3. **Apply pressure**: Force Lightning to trade
4. **Energy efficient**: 1-2 Fighting energy attacks
5. **Close with power**: Machamp ex late game

### Psychic vs. Fighting/Darkness

#### Matchup Analysis

```
Psychic Attack on Fighting/Darkness:
- Psychic does 2x damage to Fighting
- Psychic does 2x damage to Darkness
- Neither Fighting nor Darkness resist Psychic

Result: Psychic has significant advantage
```

#### Psychic Player Strategy

1. **Lead with Psychic**: Abra early pressure
2. **Exploit weakness**: Every attack gets +30
3. **Control the game**: Confusion from Kadabra
4. **Scale with damage**: Alakazam with damage counters
5. **Force trades**: Make Fighting/Darkness take bad exchanges

**Key plays**:

- Abra → Kadabra → Alakazam line
- Confusion coin flips can disrupt
- Damage Swap manipulation

#### Fighting/Darkness Player Strategy

1. **Avoid Psychic if possible**: Switch with Sabrina
2. **Speed**: Rush down before Psychic evolves
3. **Resilient attackers**: High HP to survive
4. **Healing priority**: Keep attackers alive
5. **Alternative targets**: Hit their bench

### Water vs. Grass

#### Matchup Analysis

```
Water Attack on Grass Pokemon:
- Water does 0.5x damage to Grass
- Grass does 2x damage to Water
- Grass player has advantage

Example:
Water Pokemon: 60 damage → 30 damage on Grass
Grass Pokemon: 40 damage → 80 damage on Water

Result: Grass has effective 2.67x damage advantage
```

#### Water Player Strategy

1. **Avoid Grass types**: Sabrina or switch
2. **Energy acceleration**: Blastoise ex early
3. **Healing priority**: Recover extends life
4. **Target alternatives**: Hit non-Grass Pokemon
5. **Fast KOs**: Rush before weakness stacks

#### Grass Player Strategy

1. **Stack Grass types**: Maximize advantage
2. **Apply pressure**: Vine Whip every turn
3. **Status effects**: Control Water attacker
4. **Forced trades**: Make Water take bad exchanges
5. **Close efficiently**: Use weakness for quick KOs

---

## Counter-Picking for Tournament Play

### Understanding Tournament Metagame

Tournament play is different from ladder:

- **Predictable archetypes**: Players bring proven strategies
- **Best-of-3**: Sideboarding or adaptation between games
- **Meta calls**: Choosing types based on expected field

#### Common Tournament Archetypes

**Archetype 1: Aggro Fire**

- Charmander → Charmeleon → Charizard ex
- Focus: Fast KOs, exploit Grass weakness
- Weakness: Water, healing denial
- **Counter-pick**: Water or Metal with healing

**Archetype 2: Control Water**

- Squirtle → Wartortle → Blastoise ex
- Starmie ex for cycling
- Focus: Energy acceleration, recovery
- Weakness: Grass, fast aggro
- **Counter-pick**: Grass or fast Lightning

**Archetype 3: Disruption Psychic**

- Abra → Kadabra → Alakazam
- Focus: Damage counter manipulation
- Weakness: Metal, fast aggro
- **Counter-pick**: Metal or fast Fire

**Archetype 4: Beatdown Fighting**

- Machop → Machoke → Machamp ex
- Focus: High damage, energy efficiency
- Weakness: Psychic, Energy denial
- **Counter-pick**: Psychic or Sabrina-based disruption

### Tier List for Tournament Play

#### Tier 1: Top Tournament Choices

**1. Psychic**

- **Why**: Strong vs. Fighting and Darkness (both common)
- **Versatility**: Good matchup spread
- **Disruption**: Confusion and status effects
- **Energy**: Consistent 1-2 Psychic energy
- **Weakness**: Only weak to Metal (uncommon)

**2. Water**

- **Why**: Exploits common Fire decks
- **Recovery**: Outlast strategies
- **Energy acceleration**: Blastoise ex is powerful
- **Versatility**: Starmie ex, multiple attackers
- **Weakness**: Grass (counterable with Sabrina)

**3. Lightning**

- **Why**: Consistent 1-energy attacks
- **No retreat**: Zapdos ex flexibility
- **Exploits Water**: Water is common
- **Fast**: Quick KOs
- **Weakness**: Fighting (play around it)

#### Tier 2: Strong Tournament Choices

**4. Grass**

- **Why**: Exploits Water
- **Status effects**: Control elements
- **Energy acceleration**: Solar Beam
- **Weakness**: Fire (manageable)

**5. Fighting**

- **Why**: High damage output
- **Exploits Psychic**: Strong matchup
- **Energy efficient**: 1-2 energy attacks
- **Weakness**: Lightning (common)

#### Tier 3: Situational Choices

**6. Fire**

- **Why**: Strong vs. Grass
- **High damage**: Charizard ex pressure
- **Weakness**: Water (very common)

**7. Darkness**

- **Why**: Disruption elements
- **Exploits Psychic**: If Psychic is popular
- **Weakness**: Fighting (common)

**8. Metal**

- **Why**: Defensive stall
- **Exploits Colorless**: If Colorless is popular
- **Weakness**: Fire, Lightning (both common)

**9. Colorless**

- **Why**: Consistency engine
- **Versatility**: No energy dependencies
- **Weakness**: Metal, Fighting (manageable)

### Counter-Picking Strategy

#### Before Tournament: Research the Meta

**1. Check recent tournaments**

- What decks are winning?
- What types are most common?
- What are the weak matchups?

**2. Practice common matchups**

- Play all types yourself to understand
- Know the key cards and strategies
- Practice KO math with weaknesses/resistances

**3. Pick a type with good matchups**

- Avoid types with bad tournament matchups
- Consider your personal skill with each type
- Pick something you're comfortable playing

#### During Tournament: Adaptation

**Game 1: Scout**

- Play your planned deck
- See what opponent plays
- Note their mistakes and strengths

**Game 2: Adapt**

- Switch if you have multiple decks
- Adjust your strategy based on Game 1
- Exploit their specific build

**Game 3: Close**

- Execute your game plan
- Force them into bad matchups
- Use counter-picks effectively

#### Deck Selection Guide

**If meta is unknown (Swiss rounds)**:

```
Recommended: Psychic or Water
Reason: Good matchup spread, versatile
Safe choice for 50% of meta
```

**If meta is Fire-heavy**:

```
Recommended: Water or Grass
Reason: Both exploit Fire
Water has healing, Grass has status
Choose based on preference
```

**If meta is Fighting-heavy**:

```
Recommended: Psychic or Lightning
Reason: Psychic exploits Fighting
Lightning is fast enough to rush
Psychic has better late game
```

**If meta is Water-heavy**:

```
Recommended: Grass or Lightning
Reason: Grass exploits Water
Lightning is fast and consistent
Grass has status effects
```

### Sideboard Strategy (If Available)

In tournaments with sideboards:

#### Water Sideboard vs. Fire

```
Add:
- More healing (Potion)
- Sabrina for targeting
- Metal Pokemon for resistance

Remove:
- Bulbasaur (weak to Fire)
- Grass-only attackers
```

#### Grass Sideboard vs. Water

```
Add:
- High-HP Grass Pokemon
- Status effect enablers
- Sabrina for targeting

Remove:
- Fire-weak Pokemon
- Low-HP attackers
```

#### Psychic Sideboard vs. Fighting

```
Add:
- High-HP Psychic Pokemon
- Disruption elements
- Energy acceleration

Remove:
- Low-HP basics
- Non-Psychic attackers
```

---

## Tech Cards by Type

### Universal Tech Cards

These cards work well in ANY type:

#### Professor Oak (Draw 3)

```
Type: Supporter
Effect: Draw 3 cards
Best in: Any deck that needs card draw

Usage by type:
- Fire: Find Charizard ex faster
- Water: Find Blastoise ex, recovery
- Lightning: Find Raichu, Zapdos ex
- Psychic: Find Alakazam, damage counters
- All types: Recover from bad starts

When to play:
- When behind in cards
- When you need specific answers
- When building late-game pressure
```

#### Sabrina (Switch Opponent's Pokemon)

```
Type: Supporter
Effect: Switch opponent's active Pokemon with benched Pokemon

Usage by type:
- Fire: Force Water types to fight Fire Pokemon
- Water: Force Fire types to fight Water Pokemon
- Lightning: Force Fighting types to fight Lightning
- Psychic: Force Darkness to fight Psychic
- All types: Remove problem Pokemon

Key plays:
- Force ex Pokemon to bench (now worth only 1 point)
- Break evolution lines
- Force bad matchups
```

#### Giovanni (+10 Damage)

```
Type: Supporter
Effect: All your Pokemon attacks do +10 damage

Impact by type:
- Fire: Enables many OHKOs (50→60)
- Lightning: Makes 30-damage attacks into 40
- Fighting: Boosts already high damage
- Psychic: Helps with Alakazam scaling
- All types: Changes KO thresholds

When to use:
- Before attacks that are close to KO
- Against 60-70 HP Basics
- To enable 2-turn KOs on ex Pokemon
```

#### Potion (Heal 30 Damage)

```
Type: Item
Effect: Heal 30 damage from a Pokemon

Usage by type:
- Fire: Keep Charizard ex alive
- Water: Synergizes with recovery
- Lightning: Heal Zapdos ex
- Metal: Outlast opponents
- All types: Extend attacker life

Math:
- Heals 30 damage
- Often adds 1 extra turn of life
- Can be worth 2-3 attacks worth of value
```

### Type-Specific Tech Cards

#### Fire Tech Cards

**Charmander Line**

```
Charmander (60 HP) → Charmeleon (80 HP) → Charizard ex (150 HP)

Why it works:
- Consistent damage scaling
- Can surprise opponents
- Giovanni enables OHKOs

Tech additions:
- Rare Candy to skip Charmeleon
- Giovanni for +10 damage
- Sabrina to remove Water types
```

**Alternative Fire Tech**

```
Cyndaquil (Promo)
- Ember: 50 damage with 2 Fire
- Strategy: Faster than Charmander line
- Use with energy acceleration
```

#### Water Tech Cards

**Blastoise ex Energy Acceleration**

```
Blastoise ex (180 HP)
Energy Bomb: Attach up to 3 energy from your deck

Why it works:
- Gets high-damage attacks online quickly
- 120 damage on turn 3 possible
- Difficult to answer

Tech additions:
- Professor Oak to find it faster
- Starmie ex for cycling
- Multiple energy search cards
```

**Starmie ex Cycling**

```
Starmie ex (110 HP)
Swift: 60 damage (no energy!)
Recover: Heal 60 damage

Why it works:
- Consistent 60 damage every turn
- Self-healing extends life
- No energy dependencies

Tech additions:
- Pokemon Communication to find it
- Multiple copies for cycling
- Professor Oak to find next one
```

#### Grass Tech Cards

**Gengar Disruption**

```
Gengar (90 HP)
Spirit Shackle: 50 damage
Spook: Switch opponent's active Pokemon

Why it works:
- Unique disruption effect
- 50 damage is solid
- Forces opponent to play differently

Tech additions:
- Multiple Gengar copies
- Sabrina combo plays
- Status effect support
```

**Bulbasaur Line**

```
Bulbasaur (60 HP) → Ivysaur (80 HP) → Venusaur ex (160 HP)

Why it works:
- Vine Whip consistency
- Solar Beam late-game power
- Growth scaling

Tech additions:
- Status effect support
- Energy search cards
- High-HP support
```

#### Lightning Tech Cards

**Pikachu/Raichu Line**

```
Pikachu (60 HP) → Raichu (80 HP)

Why it works:
- 1-energy consistency
- Raichu's Agility (30 damage + 0 retreat)
- Zapdos ex late game

Tech additions:
- Multiple Pikachu copies
- Giovanni for OHKOs
- Sabrina to force switches
```

**Zapdos ex Versatility**

```
Zapdos ex (120 HP)
Thunder Spear: 30 damage (1 Lightning)
Lightning Strike: 80 damage (3 Lightning)
0 Retreat cost

Why it works:
- Flexible damage output
- Can switch freely
- Excellent stats

Tech additions:
- Energy acceleration
- Multiple Zapdos ex copies
- Agility support for switching
```

#### Psychic Tech Cards

**Abra → Kadabra → Alakazam Line**

```
Abra (60 HP) → Kadabra (90 HP) → Alakazam (130 HP)

Why it works:
- Psychic type (exploits Fighting/Darkness)
- Scales with damage counters
- Unique effects (Teleport, Damage Swap)

Tech additions:
- Pokemon Communication for Abra
- Damage counter manipulation
- Status effect support
```

**Mewtwo Promo**

```
Mewtwo (110 HP)
Barrier: Reduce damage by 30
Psychic: 40 damage

Why it works:
- Defensive attacker
- Reduces incoming damage
- Psychic typing is strong

Tech additions:
- Multiple Mewtwo copies
- Damage counter support
- Healing support
```

#### Fighting Tech Cards

**Machop → Machoke → Machamp ex Line**

```
Machop (60 HP) → Machoke (100 HP) → Machamp ex (180 HP)

Why it works:
- High damage output
- Energy efficient (1 Fighting)
- Exploits Psychic

Tech additions:
- Rare Candy to skip Machoke
- Sabrina to remove Psychic
- Energy acceleration
```

#### Metal Tech Cards

**Steelix ex Defense**

```
Steelix ex (170 HP)
Steel Wing: 80 damage + reduce damage by 30
Iron Tail: 120 damage (3 Metal)

Why it works:
- High HP (170)
- Damage reduction
- Late-game powerhouse

Tech additions:
- Healing support
- Metal energy acceleration
- Defensive positioning
```

---

## Meta-Based Type Selection

### Understanding the Current Meta

Meta analysis changes over time. Here's how to adapt:

#### Early Meta (After Set Release)

```
Characteristics:
- Basic decks dominate
- Fire, Water, Grass most common
- Energy zone luck matters more
- Players learning optimal plays

Best types:
1. Lightning (consistent 1-energy)
2. Psychic (good matchup spread)
3. Water (exploits Fire)

Avoid:
- Complex multi-type decks
- Slow stall strategies
- Experimental builds
```

#### Mature Meta (1-2 Months In)

```
Characteristics:
- Optimized decks emerge
- Players know the matchups
- Counters to popular strategies
- Sideboard adaptation

Best types:
1. Psychic (strong vs. common types)
2. Water (exploits popular Fire)
3. Grass (counter to Water)

Avoid:
- Predictable builds
- Types with obvious counters
- Single-threat strategies
```

#### Late Meta (3+ Months)

```
Characteristics:
- Deeper optimization
- Creative tech choices
- High-level play
- Surprise factor needed

Best types:
1. Any type played skillfully
2. Disruption-focused builds
3. Unexpected counters

Avoid:
- Obvious choices
- Unadapted builds
- Poor matchup types
```

### Meta Shift Indicators

#### Signs a Type is Overplayed

```
Data to track:
- 30%+ of tournament meta
- Many players report struggling vs. it
- Top tables have many copies
- Strategy articles focus on it

Example: Fire
- Counters: Water, Metal, healing strategies
- If 40% of field is Fire, Water becomes good
- If Water becomes popular, Grass becomes good
```

#### Signs a Type is Underplayed

```
Data to track:
- <10% tournament representation
- Good theoretical matchups
- Low meta awareness
- Players sleeping on it

Example: Psychic
- Often underplayed
- Strong vs. Fighting/Darkness
- When Fighting popular, Psychic is sleeper pick
```

### Adapting to Meta Changes

#### Weekly Adaptation

```
Monday: Check tournament results
- What won the weekend?
- What were the top 8?
- What unexpected types placed?

Tuesday: Analyze the data
- Which types increased?
- Which decreased?
- What counters emerged?

Wednesday: Test new matchups
- Practice vs. popular builds
- Identify weaknesses
- Find tech cards

Thursday: Finalize choice
- Pick your type for weekend
- Prepare sideboard plan
- Review key matchups

Friday: Final practice
- Refine play patterns
- Memorize KO math
- Confidence building
```

#### Monthly Meta Shifts

```
Track:
- Which types consistently place?
- Which are trending up/down?
- New tech cards emerging?
- Meta solutions (player adaptation)?

Adjust:
- May need to switch types entirely
- May need to add tech cards
- May need to change win conditions
- May need to practice new matchups
```

### Prediction Model for Meta

#### What Types Will Rise/Fall?

**Based on common counter relationships**:

```
If Fire becomes popular:
- Water increases (counters Fire)
- Grass increases (counters Water)
- Cycle continues

If Psychic becomes popular:
- Fighting increases (counters Psychic)
- Lightning increases (counters Fighting)
- Cycle continues

If Fighting becomes popular:
- Psychic increases (counters Fighting)
- Darkness increases (counters Psychic)
- Cycle continues
```

#### Seasonal Predictions

**Spring (New set release)**:

- Fire and Water dominate (popular Basics)
- Lightning consistent (1-energy)
- Psychic sleeper pick

**Summer (Optimization)**:

- Water and Psychic rise (good matchups)
- Tech cards emerge
- Disruption strategies

**Fall (Solved meta)**:

- Counter-picks dominate
- Grass and Fighting strong
- Unexpected types win

**Winter (Next set preview)**:

- Experimental builds
- Creative tech
- Surprise factors

---

## Common Type-Based Interactions

### Power Stacking: Multiple Weakness Targets

#### Example: Fire vs. Grass Team

```
Situation: Fire player has 2 Fire Pokemon on bench
Opponent has 2 Grass Pokemon

Strategy:
- Use Sabrina to force Grass Pokemon to attack Fire
- Every Grass attack does 0.5x damage
- Every Fire attack does 2x damage
- Fire gains huge advantage

Result:
- Grass Pokemon take double damage
- Fire Pokemon take half damage
- Fire wins exchanges easily
```

#### Example: Water vs. Fire Team

```
Situation: Water player builds team of all Water types
Opponent has Fire Pokemon

Strategy:
- Force Fire to attack Water
- Water attacks do 2x damage to Fire
- Fire attacks do 0.5x damage to Water
- Water gains advantage

Result:
- Fire Pokemon die in 2-3 hits
- Water Pokemon survive longer
- Water can heal and recover
```

### Resistance Stacking

#### Example: Metal Team Building

```
Situation: Building Metal team
Goal: Resist common attacking types

Metal takes:
- 0.5x from Fire
- 0.5x from Lightning
- 0.5x from Colorless

Strategy:
- Stack Metal Pokemon against Fire/Lightning/Colorless
- Each attack does half damage
- Metal Pokemon survive much longer
- Outlast strategy works

Result:
- Metal Pokemon can stall effectively
- Recovery/healing is amplified
- Difficult to KO without specific types
```

### Type Mismatch Tactics

#### Forcing Bad Matchups with Sabrina

**Scenario 1: Lightning vs. Fighting**

```
Lightning player has Zapdos ex (0 retreat)
Opponent has Machop

Play:
- When opponent plays Machop, use Sabrina immediately
- Zapdos ex attacks Machop
- Lightning attacks Fighting (normal damage)
- Machop attacks Lightning (2x damage, Lightning weakness)

Result: Fighting Pokemon takes normal damage, Lightning takes double
Lightning wins the exchange
```

**Scenario 2: Water vs. Fire**

```
Water player has Squirtle
Opponent has Charmander

Play:
- Opponent attacks with Charmander (Fire vs. Water)
- Squirtle does 0.5x damage (Water resists Fire)
- Charmander does 2x damage (Fire exploits Water)
- Fire wins the exchange

Solution for Water:
- Use Sabrina to force Fire to hit Metal Pokemon (resists Fire)
- Or build team of Grass types (exploit Water)
```

### Energy Zone Manipulation

#### Multi-Type Deck Building

**Fire/Lightning Example**:

```
Goal: Cover Fire's weakness to Water
Strategy: Add Lightning Pokemon

Pokemon:
- Charmander: 30 damage with 1 Fire
- Pikachu: 30 damage with 1 Lightning
- Charizard ex: 80 damage with 3 Fire
- Zapdos ex: 30 damage with 1 Lightning

Energy zone:
- Fire energy: Use Charmander or build to Charizard
- Lightning energy: Use Pikachu or Zapdos
- 50% consistency for either strategy
```

**Psychic/Fighting Example**:

```
Goal: Cover Psychic's weakness to Metal
Strategy: Add Fighting Pokemon

Pokemon:
- Abra: 20-60 damage with 1 Psychic
- Machop: 20-40 damage with 1 Fighting
- Alakazam: 30-90 damage with 2 Psychic
- Machamp ex: 120 damage with 3 Fighting

Energy zone:
- Psychic energy: Use Abra or build to Alakazam
- Fighting energy: Use Machop or build to Machamp
- Cover weakness to Metal with Fighting
```

### Bench Targeting Strategies

#### When to Attack Bench vs. Active

**Principle: Target the weaker matchup**

**Example 1: Fire vs. Team**

```
Opponent has:
- Active: Squirtle (Water, resists Fire)
- Bench: Charmander (Fire, weak to Fire)

Decision: Attack Charmander on bench
- 50 damage → 100 damage (weakness)
- Bench Pokemon = 1 point
- More efficient than attacking active

Result: Bench removal strategy
```

**Example 2: Psychic vs. Team**

```
Opponent has:
- Active: Machop (Fighting, weak to Psychic)
- Bench: Abra (Psychic, resists Psychic)

Decision: Attack Machop (active)
- 40 damage → 70 damage (weakness)
- Active Pokemon = 1 point
- Better than attacking resistant bench

Result: Focus on weakness exploitation
```

### Healing and Weakness Interaction

#### Potion Amplification with Resistance

**Example: Metal Pokemon with Resistance**

```
Metal Pokemon: 120 HP
Opponent attacks: 60 damage
Resistance: -30 damage
Damage taken: 30

Potion use:
- Heals 30 damage
- Restores to full HP immediately
- Potion value is amplified

Result:
- Potion heals full damage
- Metal Pokemon gets extra value
- Defensive strategy strengthened
```

#### Healing Weakness Targets

**Example: Fire Pokemon vs. Grass**

```
Fire Pokemon: 70 HP, 50 damage attack
Grass Pokemon: 70 HP

Attack without healing:
- 50 + 30 weakness = 80 damage
- KO Grass Pokemon
- Fire takes 0 damage (Grass resists Fire)

Attack with healing:
- Fire takes 0 damage
- KO same turn
- Healing wasn't needed

Conclusion:
- Don't heal Pokemon that resist opponent's attacks
- Focus healing on disadvantaged matchups
```

---

## Advanced Type Matchup Tactics

### Bluffing Type Advantages

#### Fake Weakness

**Scenario**: You have a Psychic Pokemon
**Opponent thinks**: Fighting Pokemon exploit Psychic (2x damage)
**Reality**: Your Psychic has 140 HP and recovery

**Bluff strategy**:

- Play conservatively with Psychic
- Let opponent attack confidently
- Use recovery to extend life
- Suddenly swing with high damage

**Opponent's mistake**: Attacking recklessly into your tank

#### Hide True Strength

**Scenario**: You have a Fire deck
**Opponent plays**: Water types thinking they counter you
**Reality**: Your Fire deck has healing and Sabrina

**Bluff strategy**:

- Let them think they have advantage
- Use healing to extend Fire Pokemon life
- Sabrina their Water types
- Turn the tables

**Opponent's mistake**: Overcommitting to what they think is winning matchup

### Multi-Turn Type Planning

#### Energy Setup for Type Switching

**Turn 1**: Play Pokemon with 0-energy attacks

- Don't commit to type yet
- See what energy zone gives

**Turn 2**: Based on energy, commit to type

- Got Fire energy? Play Fire Pokemon
- Got Lightning energy? Play Lightning Pokemon
- Got nothing useful? Play 0-energy Pokemon

**Turn 3**: Full type commitment

- Your attackers are online
- Energy zone supports your strategy

#### Evolution Line Protection

**Problem**: Evolving makes Pokemon vulnerable to Sabrina
**Solution**: Use multiple evolution lines

**Example**: Double Charmander Line

```
Turn 1: Play 2x Charmander
Turn 2: Evolve both to Charmeleon
Turn 3: Evolve one to Charizard ex

If opponent Sabrina:
- You still have Charmeleon attacking
- Can evolve second Charmeleon next turn
- Didn't lose evolution progress
```

### Reading Opponent's Type Strategy

#### Early Game Tells

**Signals they're playing mono-type**:

- Same energy twice in first 2 turns
- Only one type of Pokemon played
- No multi-energy attacks

**Signals they're playing 2-type**:

- Different energies in first 2 turns
- 2 different types of Pokemon
- Backup plans visible

**Signals they're playing around energy**:

- 0-energy attackers
- Multiple 1-energy Pokemon
- Don't seem committed to type

#### Mid-Game Reads

**They switch Pokemon frequently**:

- Don't like the matchup
- Playing around Sabrina
- Bad energy draws

**They avoid attacking**:

- Won't win the exchange
- Setting up evolution
- Saving energy for bigger play

**They play aggressively**:

- Have advantage
- Don't care about exchanges
- Close to victory

### Late-Game Type Counters

#### Final Point Denial

**Problem**: Opponent needs 1 point to win (their ex Pokemon is active)
**Solution**: Sabrina + type counter

```
Situation:
- Opponent ex Pokemon active (worth 2 points)
- They have 1 point already (need 1 more)
- You have Sabrina + counter type

Play:
- Sabrina their ex Pokemon
- ex goes to bench (now worth 1 point)
- You need 2 more points
- They need 3 more points
- You bought yourself time

Counter-play:
- They might have their own Sabrina
- Or they might be fine taking 1 point
- Calculate if this works or not
```

#### Energy Zone Racing

**Problem**: Both players close to victory, energy zone decides
**Solution**: Plan for both scenarios

```
Your deck: Fire/Lightning
Opponent: Fire

Turn 6:
- You get Lightning energy → Zapdos ex for 30
- They get Fire energy → Charizard ex for 80
- They win the race

Alternative:
- If you had 2 Fire Pokemon active
- Both could attack
- Might have won

Lesson:
- Multi-type has backup plans
- Plan for energy zone luck
- Don't rely on single outcome
```

### Tournament Sideboard Strategy

#### When You Know Opponent's Type

**Game 1**: Play your deck

- See what they have
- Note weaknesses
- Identify tech cards needed

**Game 2**: Sideboard in tech

- Add counters to their type
- Remove bad matchups
- Adjust strategy

**Game 3**: Same as Game 2

- Or adapt further if they changed

#### Common Sideboard Swaps

**Water vs. Fire**:

```
Add:
+ Sabrina (target their Fire Pokemon)
+ Metal Pokemon (resist Fire)
+ Potion (healing)

Remove:
- Grass Pokemon (weak to Fire)
- Squirtle (if low HP version)
- Cards that don't help matchup
```

**Grass vs. Water**:

```
Add:
+ High-HP Grass Pokemon
+ Status effect cards
+ Sabrina (target Water)

Remove:
- Fire-weak cards
- Low-HP attackers
- Cards that don't apply pressure
```

**Psychic vs. Fighting**:

```
Add:
+ High-HP Psychic Pokemon
+ Damage counter manipulation
+ Sabrina (remove Fighting)

Remove:
- Low-HP Psychic Pokemon
- Non-Psychic attackers
- Cards with poor matchups
```

---

## Conclusion

Mastering type matchups is fundamental to Pokemon TCG Pocket success. Key takeaways:

### Core Principles

1. **Know the chart**: Memorize all 81 type interactions
2. **Exploit weaknesses**: +30 damage changes everything
3. **Use resistances**: Defensive Pokemon gain extra value
4. **Energy zone synergy**: Mono-type for consistency, 2-type for coverage
5. **Adapt to meta**: Choose types based on tournament field

### Matchup Execution

1. **Force good trades**: Sabrina into favorable matchups
2. **Plan multi-turn KOs**: Account for weakness/resistance
3. **Heal strategically**: Prioritize disadvantaged matchups
4. **Close efficiently**: Use type advantages for quick wins

### Meta Gameplay

1. **Counter-pick tournaments**: Research the field
2. **Sideboard adaptation**: Adjust between games
3. **Read opponents**: Track their type strategy
4. **Bluff effectively**: Hide your true strength

### Continuous Improvement

1. **Practice matchups**: Play all types to understand
2. **Track results**: Know which types win
3. **Update tech**: Adapt to meta changes
4. **Study top players**: Learn from winners

Type mastery takes practice but separates good players from great ones. Every point counts in this format—use every advantage you can get.

---

_Next: [Energy Zone Mastery](./04-energy-zone-mastery.md) - Detailed guide to energy management and optimization_
