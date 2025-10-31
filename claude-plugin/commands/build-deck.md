---
name: build-deck
description: Build a competitive Pokemon TCG Pocket deck around a specific Pokemon or strategy
---

# Build Pokemon TCG Pocket Deck

Create a competitive 20-card Pokemon TCG Pocket deck using AI-powered deck building with access to 2000+ cards.

## Required Input

- **Core Pokemon or Strategy**: Name of Pokemon ex or preferred strategy
- **Playstyle** (optional): Aggro (fast), Control (defensive), or Tempo (mid-range)
- **Budget** (optional): Beginner, Competitive, or No Limits

## Deck Building Process

### Step 1: Research Core Pokemon

Use Pokemon Pocket MCP server to search and analyze the core Pokemon:

```
- Get card details via MCP `search_cards`
- Analyze stats, energy costs, and type
- Check competitive viability
- Verify rarity and availability
```

### Step 2: Find Synergies

Discover cards that work well with the core strategy:

```
- Use MCP `find_synergies` for compatible cards
- Look for same-type Pokemon
- Find supporting trainer cards
- Identify energy acceleration options
```

### Step 3: Calculate Energy Curve

Analyze energy requirements (Pokemon TCG Pocket rules):

```
- Energy Zone: 1 energy/turn auto-generated (NOT in deck)
- Recommended: 1-2 energy types maximum
- Avoid: 3+ energy costs (inconsistent in 20-card format)
- Balance: Early game (1-2 energy) + Mid game (2-3 energy)
```

### Step 4: Verify Deck Composition

Ensure deck meets Pokemon TCG Pocket standards:

```
- Total: Exactly 20 cards
- Max copies: 2 per card
- Pokemon: 8-10 (mix of ex and regular)
- Trainers: 4-6 support cards
- Energy: 0 (handled by energy zone)
```

### Step 5: Analyze and Optimize

Use MCP `analyze_deck` for final analysis:

```
- Calculate average HP and attack
- Check type distribution
- Verify energy curve
- Identify potential weaknesses
- Suggest improvements
```

## Example Deck Builds

### Example 1: Pikachu ex Aggro Deck

```
Core Strategy: Lightning rush, fast ex Pokemon

Pokemon (9 cards):
- 2x Pikachu ex (Circle Circuit) - Primary attacker
- 2x Zapdos (Lightning Bird) - Energy acceleration
- 2x Raichu (Alolan) - Versatile attacker
- 1x Electabuzz (Genetic Apex) - Early game
- 1x Magneton (Genetic Apex) - Tech choice
- 1x Jolteon (Chain Attack) - Finisher

Trainers (6 cards):
- 2x Professor's Research (Switch)
- 2x Lisa
- 1x Pokemon Center
- 1x x Speed

Energy Analysis:
- Type: 100% Lightning
- Curve: 60% 1-2 energy, 40% 3 energy
- Expected: First attack turn 2, decisive damage turn 3

Win Condition:
- Knock out 3 Pokemon = 6 points
- Ex Pokemon = 2 points each
- Bench limit: 3 Pokemon (not 5 like standard TCG)
```

### Example 2: Mewtwo ex Control Deck

```
Core Strategy: High HP, defensive control

Pokemon (8 cards):
- 2x Mewtwo ex (Genetic Apex) - Primary attacker
- 2x Alakazam (Genetic Apex) - Heavy damage
- 2x Starmius (Dangerous Evolution) - Bench presence
- 1x Jynx (Genetic Apex) - Status effects
- 1x Slowbro (Genetic Apex) - Early game wall

Trainers (7 cards):
- 2x Professor's Research (Switch)
- 2x Sabrina
- 1x Pokemon Center
- 1x x All
- 1x x Speed

Energy Analysis:
- Type: 100% Psychic
- Curve: 40% 1-2 energy, 60% 3+ energy
- Expected: Slower start, overwhelming mid-game

Win Condition:
- High HP Pokemon = difficult to knock out
- Point advantage through耐久
- Control with status effects
```

### Example 3: Charizard ex Tempo Deck

```
Core Strategy: Early pressure, mid-game conversion

Pokemon (10 cards):
- 2x Charizard ex (Chaos Hurricane) - Primary threat
- 2x Charmander (Genetic Apex) - Early game
- 2x Charmeleon (Genetic Apex) - Mid evolution
- 2x Typhlosion (Searing Wind) - Secondary attacker
- 1x Arcanine (Genetic Apex) - Tech choice
- 1x Rapidash (Genetic Apex) - Speed option

Trainers (5 cards):
- 2x Professor's Research (Switch)
- 2x Potion
- 1x Pokemon Center

Energy Analysis:
- Type: 100% Fire
- Curve: 50% 1-2 energy, 50% 3 energy
- Expected: Consistent pressure, flexible attacks

Win Condition:
- Aggressive early game
- Charizard ex as finisher
- Multiple win paths
```

## Pokemon TCG Pocket Rules Reference

**Deck Size:** 20 cards (unique to Pocket format)

**Energy Zone:** Auto-generates 1 energy/turn

- Energy NOT in deck (major difference from standard TCG)
- Focus on Pokemon attacks, not energy acceleration
- 1-2 type decks recommended

**Win Conditions:**

- 3 Pokemon knocked out = 3 points
- Ex Pokemon = 2 points when knocked out
- Regular Pokemon = 1 point
- Faster games (10-15 minutes typical)

**Bench Limit:** Max 3 Pokemon on bench

- Unlike standard TCG's 5-card bench
- Limits defensive options
- Makes Pokemon selection critical

**Turn 1 Rules:**

- No initial draw
- No energy placement
- No attacks
- Player going second draws first

## MCP Server Tools Used

1. **search_cards** - Find cards matching criteria
2. **find_synergies** - Identify card synergies
3. **get_card** - Get detailed card information
4. **analyze_deck** - Analyze deck composition
5. **get_type_stats** - Type distribution analysis
6. **find_counters** - Find counter-strategies

## Quality Checklist

Before finalizing deck:

- [ ] Exactly 20 cards
- [ ] Max 2 copies per card
- [ ] 1-2 energy types maximum
- [ ] Energy curve balances early/mid game
- [ ] Bench strategy considered
- [ ] Counter-strategy awareness
- [ ] Consistent with chosen playstyle
- [ ] Competitive viability verified

## Usage Examples

```
Build a deck around Charizard ex
Build an aggro Lightning deck
Build a budget Fire-type deck
Build a control Psychic deck
Build a deck for tournament play
```

## Next Steps

After deck is built:

1. **Test the deck** - Play practice games
2. **Analyze matchups** - "What counters this deck?"
3. **Optimize** - "How can I improve energy curve?"
4. **Meta-check** - "Is this competitive in current meta?"
5. **Practice** - Play against different archetypes
