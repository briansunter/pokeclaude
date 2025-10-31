---
name: analyze
description: Analyze Pokemon cards or decks with detailed statistics, competitive viability, and strategic recommendations
---

# Analyze Pokemon Cards and Decks

Perform comprehensive analysis of Pokemon TCG Pocket cards and decks using data from 2000+ card database.

## Analysis Types

### 1. Card Analysis

Analyze individual Pokemon cards with detailed statistics and competitive insights.

**Input:**

- Card name (e.g., "Pikachu ex", "Mewtwo ex")
- Card set (optional, e.g., "Genetic Apex")
- Analysis focus (stats, competitive, meta, or all)

**Process:**

```
1. Retrieve card data via MCP `search_cards` or `get_card`
2. Get type statistics via `get_type_stats`
3. Calculate competitive metrics
4. Find counters via `find_counters`
5. Generate tier rating (S-D)
6. Provide strategic recommendations
```

**Output Format:**

```
=== [CARD NAME] ===

Basic Info:
- Set: [Set Name]
- Rarity: [Rarity Level]
- Type: [Type]
- HP: [Hit Points]
- Retreat Cost: [Energy cost to retreat]

Abilities:
- [Ability name]: [Description]

Attacks:
- [Attack name]: [Energy cost] - [Damage]
  → [Additional effects]

Weakness: [Type] (+20 damage)
Resistance: [Type] (-20 damage)

Competitive Analysis:
- Tier: [S/A/B/C/D]
- Competitive Viability: [Score]/100
- Usage Rate: [Percentage in competitive play]
- Archetypes: [List of deck types it fits in]

Strategic Value:
- Strengths: [Key advantages]
- Weaknesses: [Key disadvantages]
- Best Synergies: [Cards that work well]
- Primary Counters: [Cards that counter it]

Energy Efficiency:
- Average damage per energy: [Calculation]
- Recommended energy curve: [Suggestions]

Recommended Decks:
- [Deck type 1]: [How it fits]
- [Deck type 2]: [How it fits]
```

### 2. Deck Analysis

Analyze existing Pokemon TCG Pocket decks for optimization opportunities.

**Input:**

- Deck list (20 cards)
- Deck strategy (aggro/control/tempo)
- Desired improvements (optional)

**Process:**

```
1. Parse deck list
2. Verify 20-card format
3. Check max 2 copies per card
4. Analyze via MCP `analyze_deck`
5. Calculate energy curve
6. Identify type distribution
7. Find synergy gaps
8. Suggest improvements
```

**Output Format:**

```
=== DECK ANALYSIS ===

Deck Composition:
- Total Cards: [Count]
- Pokemon: [Count] ([Percentage])
- Trainers: [Count] ([Percentage])
- Energy: 0 (handled by energy zone)

Type Distribution:
- Lightning: [Count] ([Percentage])
- Psychic: [Count] ([Percentage])
- Fire: [Count] ([Percentage])
- [Other types]

Energy Curve:
- 1 energy: [Count] cards
- 2 energy: [Count] cards
- 3+ energy: [Count] cards
- Average: [X.X] energy

Statistics:
- Average HP: [Value]
- Average Attack: [Value]
- Retreat Costs: [Distribution]
- Bench Slots Used: [Estimated]

Strengths:
- [Strength 1 with data]
- [Strength 2 with data]
- [Strength 3 with data]

Weaknesses:
- [Weakness 1]
- [Weakness 2]
- [Weakness 3]

Optimization Suggestions:
1. [Suggestion with reasoning]
2. [Suggestion with reasoning]
3. [Suggestion with reasoning]

Meta Alignment:
- Current Tier: [S/A/B/C/D]
- Expected Win Rate: [Percentage]
- Best Matchups: [Types/strategies]
- Worst Matchups: [Types/strategies]

Recommended Changes:
KEEP:
- [Card]: [Reason]

ADD:
- [Card]: [Reason and expected impact]

REMOVE:
- [Card]: [Reason and what to replace it with]

Energy Optimization:
- Current curve: [Description]
- Recommended: [Description]
- Expected improvement: [Impact]
```

## Pokemon TCG Pocket Rules Integration

### Game Format Specifics

```
Deck Size: 20 cards (unique to Pocket format)
Energy Zone: 1 energy/turn auto-generated
Win Condition: 3 knocked out Pokemon = 3 points
Ex Pokemon: Worth 2 points (high risk, high reward)
Bench Limit: Max 3 Pokemon (not 5 like standard TCG)
Turn 1: No draw, no energy, no attack
Max Copies: 2 per card
```

### Type Effectiveness

```
Fire → Grass, Ice, Bug, Steel (+20 damage)
Water → Fire, Ground, Rock (+20 damage)
Grass → Water, Ground, Rock (+20 damage)
Lightning → Water, Flying (+20 damage)
Psychic → Fighting, Poison (+20 damage)
Fighting → Dark, Steel, Ice (+20 damage)
Dark → Psychic, Ghost (+20 damage)
Metal → Ice, Rock, Fairy (+20 damage)
Fairy → Fighting, Dark, Dragon (+20 damage)
Colorless → All types (resists nothing)

Weakness: +20 damage to receiver
Resistance: -20 damage to receiver
```

## MCP Server Tools Used

1. **get_card** - Retrieve specific card details
2. **search_cards** - Find cards matching criteria
3. **analyze_deck** - Comprehensive deck analysis
4. **get_type_stats** - Type-based statistics
5. **find_synergies** - Card compatibility analysis
6. **find_counters** - Counter-strategy identification
7. **query_cards** - Custom SQL analysis

## Analysis Examples

### Card Analysis Example

```
Input: "Analyze Charizard ex Chaos Hurricane"

Output:
=== CHARIZARD EX (CHAOS HURRICANE) ===

Basic Info:
- Set: Space-Time Smackdown (SVE)
- Rarity: Rare Rainbow
- Type: Fire
- HP: 150
- Retreat Cost: 2

Abilities:
- [None]

Attacks:
- [2] [1] [1] Chaos Hurricane (120 damage)
  → This attack's damage isn't affected by Weakness or Resistance
- [3] [1] [1] [1] Great Hurricane (200 damage)
  → [Additional effect]

Weakness: Water (+20 damage)
Resistance: None

Competitive Analysis:
- Tier: S
- Competitive Viability: 95/100
- Usage Rate: 35% in competitive play
- Archetypes: Fire tempo, Burn strategies, Aggro

Strategic Value:
- Strengths: High HP (150), powerful attacks, ignores defenses
- Weaknesses: High energy cost (4 total), weak to Water
- Best Synergies: Fire support cards, energy acceleration
- Primary Counters: Water-type Pokemon, energy denial

Energy Efficiency:
- Average damage per energy: 40-50 damage
- Recommended energy curve: Mix of 2-3 energy costs

Recommended Decks:
- Fire Aggro: Primary attacker with energy support
- Tempo Fire: Mid-game finisher with early pressure
- Burn Control: High-damage threat with status support
```

### Deck Analysis Example

```
Input: Analyze this Lightning deck
[2x Pikachu ex, 2x Zapdos, 2x Raichu, 2x Electabuzz, 2x Magneton,
 2x Professor's Research, 2x Lisa, 2x Pokemon Center, 2x x Speed, 2x Potion]

Output:
=== LIGHTNING AGGRO DECK ===

Deck Composition:
- Total Cards: 20 ✓
- Pokemon: 10 (50%)
- Trainers: 6 (30%)
- Energy: 0 (handled by energy zone) ✓

Type Distribution:
- Lightning: 10 cards (100%)
- [Other types]: 0 cards (0%)

Energy Curve:
- 1 energy: 4 cards (Electabuzz)
- 2 energy: 6 cards (Pikachu ex, Raichu)
- 3 energy: 2 cards (Zapdos, Magneton)
- Average: 2.0 energy

Statistics:
- Average HP: 95
- Average Attack: 65
- Retreat Costs: 1-2 energy
- Bench Slots Used: 2-3

Strengths:
- Mono-type strategy (consistent energy)
- Low energy curve (fast starts)
- Strong early game presence
- Ex Pokemon threat (Pikachu ex)

Weaknesses:
- Fighting-type weakness (common meta)
- Limited bench pressure
- No healing or stall options
- Weak to control strategies

Optimization Suggestions:
1. Add 1x-2x Electivire for Fighting resistance
2. Consider 1x Porygon-Z for tech option
3. Reduce Professor's Research to 1x (too many)

Meta Alignment:
- Current Tier: A
- Expected Win Rate: 68%
- Best Matchups: Water (80%), Grass (75%)
- Worst Matchups: Fighting (45%), Psychic (50%)

Recommended Changes:
KEEP:
- Pikachu ex: Core attacker, efficient damage
- Zapdos: Energy acceleration, solid stats

ADD:
- 1x Electivire: Fighting counter, resistance

REMOVE:
- 1x Professor's Research: Diminishing returns

Energy Optimization:
- Current curve: Excellent (2.0 average)
- Recommended: Maintain low curve, add 1x tech
- Expected improvement: +5% win rate vs Fighting
```

## Usage Examples

### Card Queries

```
Analyze Pikachu ex
Analyze Charizard ex Chaos Hurricane
Analyze Mewtwo ex Genetic Apex
What makes Articuno good?
Compare Pikachu vs Raichu
Is Mewtwo ex worth using?
```

### Deck Queries

```
Analyze my Lightning deck
Review my Fire-type deck
How is my energy curve?
What should I add to my deck?
Is this deck competitive?
Optimize my current deck
```

### Meta Queries

```
What counters Pikachu ex decks?
Which Pokemon beat Water types?
Find cards that work with Charizard
What's good against Fighting types?
Show me all Fire Pokemon with 100+ HP
```

## Advanced Analysis

### Competitive Viability Scoring (1-100)

```
Base Stats (30%):
- HP, attack, abilities
- Energy efficiency
- Retreat cost

Type Matchups (25%):
- Weakness profile
- Resistance options
- Type coverage

Meta Relevance (25%):
- Current usage rate
- Win rate in tournaments
- Deck representation

Versatility (20%):
- Multiple archetype fit
- Role flexibility
- Tech potential
```

### Tier Rankings

```
S-Tier (90-100): Meta-defining, must-play cards
A-Tier (80-89): Highly competitive, tournament viable
B-Tier (70-79): Good in specific matchups or archetypes
C-Tier (60-69): Niche use, requires specific support
D-Tier (50-59): Fun/casual, limited competitive use
Below 50: Collection value only
```
