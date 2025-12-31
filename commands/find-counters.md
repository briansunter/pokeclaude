---
name: find-counters
description: Find Pokemon and strategies that counter specific Pokemon types, decks, or meta threats
---

# Find Pokemon Counters

Identify Pokemon TCG Pocket cards and strategies that counter specific opponents, types, or meta threats.

## Counter Strategy Types

### 1. Type-Based Counters

Find Pokemon that exploit specific type weaknesses using Pokemon TCG Pocket type effectiveness chart.

**Input:**

- Target type (e.g., "Lightning", "Fire", "Psychic")
- Target strategy (e.g., "aggro", "control")

**Process:**

```
1. Use type effectiveness chart
2. Query MCP for Pokemon with advantage
3. Filter by competitive viability
4. Calculate win probability
5. Provide strategic context
```

**Type Effectiveness Chart:**

```
Fire → Grass, Ice, Bug, Steel
Water → Fire, Ground, Rock
Grass → Water, Ground, Rock
Lightning → Water, Flying
Psychic → Fighting, Poison
Fighting → Dark, Steel, Ice
Dark → Psychic, Ghost
Metal → Ice, Rock, Fairy
Fairy → Fighting, Dark, Dragon
```

### 2. Specific Pokemon Counters

Find exact counter Pokemon for individual threats.

**Input:**

- Specific Pokemon name (e.g., "Pikachu ex", "Mewtwo ex")
- Competitive context (tournament, casual, ladder)

**Process:**

```
1. Analyze target Pokemon type and stats
2. Identify exploiting types via `find_counters`
3. Find specific counter cards
4. Calculate damage output potential
5. Provide battle scenarios
```

### 3. Deck Archetype Counters

Counter entire deck strategies (aggro, control, tempo).

**Input:**

- Deck archetype or strategy
- Meta context (current, upcoming, specific tournament)

**Process:**

```
1. Identify deck strategy characteristics
2. Find cards that exploit strategy weaknesses
3. Recommend counter-deck list
4. Calculate expected win rates
5. Provide strategic guidance
```

## Counter Analysis Framework

### Win Probability Calculation

```
Base Damage = [Attacker Attack]
Type Advantage = +20 (weakness) or -20 (resistance)
Effective Damage = Base + Type Modifier

Win Rate = 70% (2 energy advantage)
Win Rate = 60% (1 energy advantage)
Win Rate = 50% (even matchup)
Win Rate = 40% (1 energy disadvantage)
Win Rate = 30% (2 energy disadvantage)
```

### Counter Strategy Examples

#### Countering Aggro Decks

**Aggro Characteristics:**

- Fast ex Pokemon (low energy cost)
- 1-2 energy attackers
- Early pressure
- Limited bench

**Counter Strategy:**

```
Defense Options:
- High HP Pokemon (100+ HP)
- Status effects (Paralyze, Burn)
- Energy denial
- Bench sniping
- Point control (avoid early KOs)

Best Counters:
- Articuno (Freezing Ice) - High HP, status
- Starmius (Dangerous Evolution) - Bench pressure
- Alakazam (Genetic Apex) - High damage, late game
- Water-type Pokemon - Neutralize Fire, Lightning
```

#### Countering Control Decks

**Control Characteristics:**

- High HP Pokemon
- Defensive abilities
- Energy efficiency
- Win on points

**Counter Strategy:**

```
Aggression Options:
- Fast ex Pokemon
- Energy acceleration
- Burst damage
- Early KOs
- Avoid long games

Best Counters:
- Pikachu ex (Circle Circuit) - Fast 70-damage
- Charizard ex (Chaos Hurricane) - Burst 120+ damage
- Zapdos (Lightning Bird) - Consistent pressure
- Fighting-types - Beat Metal, Darkness
```

## MCP Server Integration

### Tools Used

1. **find_counters** - Get counter cards for specific Pokemon
2. **search_cards** - Find Pokemon matching counter criteria
3. **get_type_stats** - Analyze type distribution
4. **query_cards** - Custom SQL for advanced counter searches

### Counter Database

- 2077 cards analyzed for counter potential
- Type effectiveness pre-calculated
- Meta usage rates included
- Win rate statistics available

## Counter Examples by Type

### Counters to Lightning (Weak to Fighting)

```
Primary Counters:
- Lucario (Community Day) - Fighting-type, resistant to Lightning
- Machamp (Genetic Apex) - Pure Fighting, high attack
- Primeape (Genetic Apex) - Fighting-type, energy efficient
- Hariyama (Genetic Apex) - Fighting-type, high HP

Secondary Counters:
- Mewtwo ex (takes 20 less from Lightning) - Psychic-type
- Alakazam (Psychic beats Fighting, resists Lightning) - Versatile
- Gengar (Ghost resists Fighting, strong vs Lightning) - Tech option

Energy Considerations:
- Fighting-types: 2-3 energy attacks typical
- Pair with Fighting-energy acceleration
- Avoid Lightning-heavy decks (weakness synergy)

Win Rate: 70% vs Lightning aggro
```

### Counters to Psychic (Weak to Darkness)

```
Primary Counters:
- Yveltal (Genetic Apex) - Darkness-type, exploits Psychic weakness
- Darkrai (Shrouded Dark) - Darkness-type, consistent damage
- Umbreon (Genetic Apex) - Darkness-type, high HP
- Hoopa (Genetic Apex) - Darkness-type, bench sniping

Secondary Counters:
- Gengar (Ghost-type, resistances help)
- Banette (Ghost-type, status effects)
- Sableye (Darkness-type, disruptive abilities)

Energy Considerations:
- Darkness-types: 2-3 energy, versatile
- Can pair with Fighting for coverage
- Strong into most Psychic builds

Win Rate: 75% vs Psychic control
```

### Counters to Fire (Weak to Water)

```
Primary Counters:
- Blastoise (Genetic Apex) - Water-type, counters Fire weakness
- Gyarados (Lance) - Water-type, high HP and attack
- Starmius (Dangerous Evolution) - Water-type, bench pressure
- Vaporeon (Genetic Apex) - Water-type, energy efficient

Secondary Counters:
- Slowbro (Genetic Apex) - Water-type, defensive
- Tentacruel (Genetic Apex) - Water-type, status effects
- Lapras (Genetic Apex) - Water-type, Ice synergy

Energy Considerations:
- Water-types: 2-3 energy attacks
- Energy zone synergy (1 per turn)
- Counter Fire's energy acceleration

Win Rate: 80% vs Fire aggro
```

## Complete Counter-Deck Examples

### Counter to S-Tier: Pikachu ex Lightning Aggro

```
DECK: Fighting Control

Core Strategy: Exploit Lightning weakness to Fighting

Pokemon (9 cards):
- 2x Lucario (Community Day) - Primary counter, Fighting-type
- 2x Machamp (Genetic Apex) - Heavy hitter, Fighting-type
- 2x Primeape (Genetic Apex) - Energy efficient, Fighting-type
- 1x Hariyama (Genetic Apex) - High HP, Fighting-type
- 1x Mawile (Genetic Apex) - Tech choice, Metal-type
- 1x Riolu (Genetic Apex) - Early game pressure

Trainers (6 cards):
- 2x Professor's Research (Switch)
- 2x Sabrina
- 1x Pokemon Center
- 1x x All

Energy Analysis:
- Type: 100% Fighting
- Curve: 60% 2 energy, 40% 3 energy
- Advantage: Lightning Pokemon deal 20 less damage

Expected Win Rate: 75% vs Lightning aggro

Key Matchups:
- vs Pikachu ex (Circle Circuit): 80% (resists Lightning, Fighting attack)
- vs Zapdos (Lightning Bird): 75% (resists Lightning)
- vs Raichu (Alolan): 70% (type advantage throughout)

Strategic Notes:
- Exploit Fighting resistance to Lightning
- Use high HP Fighting-types to absorb hits
- Control energy with Sabrina
- Win on points through durability
```

### Counter to A-Tier: Mewtwo ex Psychic Control

```
DECK: Darkness Aggro

Core Strategy: Darkness Pokemon exploit Psychic weakness

Pokemon (8 cards):
- 2x Yveltal (Genetic Apex) - Primary counter, Darkness-type
- 2x Darkrai (Shrouded Dark) - Burst damage, Darkness-type
- 2x Umbreon (Genetic Apex) - High HP, Darkness-type
- 1x Hoopa (Genetic Apex) - Bench sniping, Darkness-type
- 1x Sableye (Genetic Apex) - Disruption, Darkness-type

Trainers (7 cards):
- 2x Professor's Research (Switch)
- 2x体能训练
- 1x Pokemon Center
- 1x x Speed
- 1x Potion

Energy Analysis:
- Type: 100% Darkness
- Curve: 50% 2 energy, 50% 3 energy
- Advantage: Darkness attacks deal +20 to Psychic

Expected Win Rate: 80% vs Psychic control

Key Matchups:
- vs Mewtwo ex (Genetic Apex): 85% (+20 damage from Darkness)
- vs Alakazam (Genetic Apex): 80% (type advantage)
- vs Starmius (Dangerous Evolution): 75% (Psychic weakness)

Strategic Notes:
- Exploit Darkness advantage over Psychic
- Use high-damage Darkness attacks
- Apply early pressure
- Avoid long games
```

## Usage Examples

### Type-Based Counters

```
"What counters Lightning types?"
"Find counters to Fire decks"
"Show me counters to Psychic"
"What beats Water-type Pokemon?"
"Find Fighting-type counters"
```

### Specific Pokemon Counters

```
"What counters Pikachu ex?"
"Find counters to Mewtwo ex"
"How do I beat Charizard ex?"
"What Pokemon beat Zapdos?"
"Find counters to Articuno"
```

### Archetype Counters

```
"How do I beat aggro decks?"
"Counter control strategies"
"Find anti-meta deck"
"What beats Lightning rush?"
"Build a counter to current S-tier"
```

### Meta Counters

```
"Current best counters"
"Top counter Pokemon list"
"Best counter strategies"
"Find counter for tournament meta"
"Anti-meta deck recommendations"
```

## Counter Strategy Tips

### Building Counter Decks

1. **Identify the threat** - What exactly needs countering?
2. **Check type effectiveness** - Use weakness/resistance
3. **Verify energy curve** - Can you execute counter strategy?
4. **Test matchup** - Calculate win probability
5. **Maintain consistency** - Don't over-tech counter options

### Playing Counter Strategies

1. **Recognize opponent** - What deck are they playing?
2. **Execute game plan** - Stick to counter strategy
3. **Manage resources** - Don't waste counter potential
4. **Adapt if needed** - Adjust based on actual plays
5. **Know win condition** - How does counter deck win?

### Meta Considerations

- Counter decks are situational
- Good against specific matchups
- Poor against unexpected decks
- Rotate counter strategies as meta shifts
- Practice mirror matchups
- Don't rely solely on counters
