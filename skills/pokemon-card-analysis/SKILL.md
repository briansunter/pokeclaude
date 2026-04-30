---
name: Pokemon Card Analyst
description: |
  Use when analyzing individual Pokemon cards, comparing card stats, evaluating attacks/abilities, or researching card rarity.

  **Activates when user mentions:**
  - Card names (e.g., "Mega Altaria ex", "Chien-Pao ex")
  - Card comparisons ("compare X vs Y")
  - Card stats ("HP", "damage", "attacks")
  - Rarity inquiries ("rarest cards", "Secret Rare")
  - Strategic value ("is this card good", "tier ranking")

  **Provides:** Detailed card analysis with type effectiveness, strategic value, meta positioning, and synergy recommendations. References comprehensive card database (2908 cards) and current tournament meta.

  **Key benefit:** Instant access to complete card statistics, competitive viability, and strategic recommendations.
---

# Pokemon Card Analyst

Analyze individual Pokemon TCG Pocket cards with comprehensive statistics and strategic insights.

## Core Analysis Capabilities

### 1. Card Statistics Analysis

**Input:** Card name, set, or card number
**Output:** Complete card breakdown including:

- HP, attack power, abilities, energy costs
- Type effectiveness (weakness/resistance)
- Rarity and set information
- Meta positioning and tier

### 2. Top Cards by Tier (April 2026 Meta)

**S-Tier (Meta-Defining):**

| Card            | HP  | Type           | Key Attack/Ability                           | Why S-Tier                                |
| --------------- | --- | -------------- | -------------------------------------------- | ----------------------------------------- |
| Mega Altaria ex | 190 | Psychic/Dragon | Mega Harmony: 40+30/bench (max 130) for 2E   | Most versatile Mega, many partner options |
| Mega Absol ex   | 170 | Darkness       | Darkness Claw: 80 dmg + discard 1 Supporter  | Only hand disruption in format            |
| Greninja        | 120 | Water          | Water Shuriken: 20 dmg to any Pokemon (free) | In ~50% of top decks as partner           |
| Chien-Pao ex    | 130 | Water          | Diving Icicles: 130 to ANY, discard all E    | Tournament-dominating with Baxcalibur     |
| Cyrus           | -   | Trainer        | Bring damaged benched Pokemon to Active      | Most important gust effect                |

**A-Tier (Highly Competitive):**

| Card              | HP  | Type            | Key Attack/Ability                          | Why A-Tier                              |
| ----------------- | --- | --------------- | ------------------------------------------- | --------------------------------------- |
| Mega Manectric ex | 180 | Lightning       | Lightning Accelerator: 80+30/pt (max 140)   | Fastest deck, scales with game progress |
| Hydreigon         | 140 | Darkness        | Hyper Ray: 130 for 2E (with Roar in Unison) | 1-point powerhouse, aggressive decks    |
| Magnezone         | 150 | Lightning/Metal | Mirror Shot: 90 + coin flip no-attack       | Self-sufficient via Volt Charge chain   |
| Darkrai ex        | 140 | Darkness        | Nightmare Aura: 20 dmg to sleeping Pokemon  | Free damage enabler                     |
| Baxcalibur        | 140 | Water           | Ice Maker: attach W from EZ to Pokemon      | Best energy acceleration in format      |
| Jolteon ex        | 130 | Lightning       | Electromagnetic Wall: 20 on energy attach   | Punishes all energy-based strategies    |
| Suicune ex        | 140 | Water           | Legendary Pulse: draw + attack flexibility  | Consistency engine for Water decks      |
| Nihilego          | 90  | Psychic         | Passive poison damage amplification         | Enables poison-based strategies         |

**B-Tier (Viable):**

| Card                | HP  | Type      | Key Attack/Ability                         | Notes                            |
| ------------------- | --- | --------- | ------------------------------------------ | -------------------------------- |
| Mega Charizard X ex | 220 | Fire      | Raging Blaze: 100→180 when <half HP        | Needs damage to scale, risky     |
| Bellibolt ex        | 150 | Lightning | High-Voltage Cannon: 70→140 at 4+ E        | Requires energy commitment       |
| Mega Scizor ex      | 200 | Metal     | Bullet Slugger: 150 if switched from Bench | Revavroom-dependent, 3-cost slow |
| Mega Charizard Y ex | 220 | Fire      | Crimson Dive: 250 (strongest in game)      | 4-cost + 50 recoil, very slow    |
| Mega Lucario ex     | -   | Fighting  | Fighting Pulse: 90/140                     | New B3, being evaluated          |
| Mega Sceptile ex    | 210 | Grass     | Terminating Tail: 130 + Poison             | New B3, being evaluated          |
| Entei ex            | 150 | Fire      | Legendary Pulse + Blazing Beatdown         | Consistency + backup attacker    |

### 3. Key Trainer Cards by Category

**Draw:**

- Professor's Research - Draw 2 (staple, 2x in every deck)
- Copycat - Manipulate hand (strong vs disruption)

**Search:**

- Poke Ball - Random Basic from deck (staple, 2x)
- Rare Candy - Skip Stage 1 evolution (essential for Stage 2 decks)
- Lisia - Search 50HP-or-less Pokemon + fill bench

**Gusting:**

- Cyrus - Bring damaged benched Pokemon to Active (most important)
- Sabrina - Switch opponent's Active Pokemon

**Energy Acceleration:**

- Electric Generator - Attach Lightning energy
- Flame Patch - Move Fire energy from discard

**Utility:**

- Clemont - Search Magneton + related cards
- Korrina - Fighting search + support (B3)
- Misty - Coin-flip Water energy acceleration

**Stadium/Item:**

- Training Area - +10 damage to Stage 1/2 attacks
- Fragrant Forest - Search Grass basics (B3)
- Arena of Antiquity - Fighting support (B3)
- Poison Barb - Increase poison damage
- Lucky Ice Pop - Healing
- Inflatable Boat - Free retreat for Water Pokemon

### 4. Type Effectiveness System

**Weakness = +20 damage from that type**

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
| Colorless | Fighting       | Nothing                    |

### 5. Competitive Viability Scoring (1-100)

**Factors:**

- Base stats (30%): HP, attack damage, abilities
- Energy efficiency (25%): Cost vs damage output
- Type matchups (20%): Weakness/resistance profile
- Meta relevance (15%): Usage in competitive decks
- Versatility (10%): Fit in multiple deck types

**Rating Scale:**

- 90-100: S-tier (meta-defining, in multiple top decks)
- 80-89: A-tier (highly competitive, deck cornerstone)
- 70-79: B-tier (viable in right deck)
- 60-69: C-tier (niche use)
- Below 60: D-tier (collector/casual only)

### 6. Card Synergy Quick Reference

**Best Partners:**

- Greninja → anything (Water Shuriken is universally good)
- Darkrai ex → sleep-based strategies (Igglybuff, Swablu Sing)
- Baxcalibur → Chien-Pao ex (Ice Maker + Diving Icicles)
- Nihilego → Poison Barb → Mega Sceptile ex (poison stacking)
- Revavroom → Mega Scizor ex (Metal Transport switching)
- Magneton/Magnezone → any Lightning deck (self-sufficient)
- Pichu → any multi-energy deck (free energy battery)
- Lisia → Mega Altaria ex (searches Swablu/Chingling/Jirachi)

## MCP Server Integration

**Tools Used:**

- `search_cards` - Find cards matching criteria
- `get_card` - Get detailed single card info
- `get_type_stats` - Type-based analysis
- `query_cards` - Custom SQL queries

**Database Coverage:**

- 2908 total cards across 17+ sets
- Latest: Pulsing Aura (B3), April 2026

## Sample Analysis Output

```
=== MEGA ABSOL EX ===
Set: Promo B (PROMO-B) #9
Rarity: Double Rare
HP: 170
Type: Darkness

Attack: Darkness Claw (2 Energy)
- 80 damage
- Reveal opponent's hand, discard 1 Supporter of your choice

Weakness: Fighting (+20)
Resistance: None
Retreat Cost: 1

Strategic Analysis:
- ONLY hand disruption in the game (discards Supporters)
- 80 dmg is average, but the Supporter removal shifts games
- Top-tier decks run Hydreigon (130 dmg) or Darkrai ex (chip damage) as partners
- 170 HP is lowest for a Mega ex (losing it = game loss)
- Weakness to Fighting is relevant with new Mega Lucario ex
- Point map: 1-1-3 (send cheap Pokemon first, Absol as finisher or opener)

Competitive Tier: S (meta-defining disruption)
Recommended Decks: Absol/Hydreigon/Nihilego, Absol/Darkrai/Oricorio
```
