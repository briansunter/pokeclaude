# Card Analysis Reference Data

Supplementary data for the Pokemon Card Analyst skill. This file contains time-sensitive meta data that should be updated periodically.

## Top Cards by Tier

> Last updated: May 2026 (Paradox Drive B3a)

### S-Tier (Meta-Defining)

| Card             | HP  | Type      | Key Attack/Ability                           | Why S-Tier                             |
| ---------------- | --- | --------- | -------------------------------------------- | -------------------------------------- |
| Mega Altaria ex  | 190 | Psychic   | Mega Harmony: 40+30/bench (max 130) for 2E   | 3 S-tier variants, most versatile Mega |
| Mega Lucario ex  | —   | Fighting  | Fighting Pulse: 90/140                       | New S tier, Fighting dominance         |
| Greninja         | 120 | Water     | Water Shuriken: 20 dmg to any Pokemon (free) | In ~50% of top decks as partner        |
| Magnezone        | 150 | Lightning | Mirror Shot + Volt Charge self-powering      | Core of S-tier Magnezone Oricorio      |
| Oricorio         | —   | Lightning | Type-disrupting stall ability                | Enables Magnezone combo                |
| Mega Sceptile ex | 210 | Grass     | Terminating Tail: 130 + Poison (140 eff)     | Pushed Grass into top tier             |
| Cyrus            | —   | Trainer   | Bring damaged benched Pokemon to Active      | Most important gust effect             |

### A-Tier (Highly Competitive)

| Card              | HP  | Type      | Key Attack/Ability                          | Why A-Tier                              |
| ----------------- | --- | --------- | ------------------------------------------- | --------------------------------------- |
| Mega Absol ex     | 170 | Darkness  | Darkness Claw: 80 dmg + discard 1 Supporter | Hand disruption, multiple viable builds |
| Hydreigon         | 140 | Darkness  | Hyper Ray: 130 for 2E (self-charging)       | 1-point powerhouse, self-sufficient     |
| Darkrai ex        | 140 | Darkness  | Dark Dreams: 20 dmg to sleeping Pokemon     | Free damage enabler (non-ex version)    |
| Hitmontop         | —   | Fighting  | Early chip damage + Fighting synergy        | Key enabler for Mega Lucario decks      |
| Suicune ex        | 140 | Water     | Draw ability + attack flexibility           | Consistency engine for Water decks      |
| Baxcalibur        | 140 | Water     | Ice Maker: attach W from EZ to Pokemon      | Best energy acceleration in format      |
| Chien-Pao ex      | 130 | Water     | Diving Icicles: 130 to ANY, discard all E   | Tournament-proven snipe finisher        |
| Meowscarada ex    | 160 | Grass     | 70 dmg on opponent's turn (1E)              | Fastest reactive damage in format       |
| Mega Manectric ex | 180 | Lightning | Lightning Accelerator: 80+30/pt (max 140)   | Scales with game progress               |
| Zoroark ex        | —   | Darkness  | 90 dmg for 1E                               | Efficient Darkness attacker             |
| Darkrai (non-ex)  | —   | Darkness  | 20 dmg/turn to sleeping Active              | Sleep synergy enabler                   |
| Nihilego          | 90  | Psychic   | Passive poison damage amplification         | Enables poison-based strategies         |
| Teal Mask Ogerpon | —   | Grass     | Status protection + 140 potential           | Anti-status + Grass utility             |

### B-Tier (Viable)

| Card                | HP  | Type      | Key Attack/Ability                         | Notes                            |
| ------------------- | --- | --------- | ------------------------------------------ | -------------------------------- |
| Mega Charizard X ex | 220 | Fire      | Raging Blaze: 100→180 when <half HP        | Needs damage to scale, risky     |
| Mega Blaziken ex    | —   | Fire      | Scaling Fire damage + Castform Burn combo  | Rising in A tier                 |
| Castform Sunny      | —   | Fire      | Burn + early damage                        | Key partner for Mega Blaziken    |
| Mega Charizard Y ex | 220 | Fire      | Crimson Dive: 250 (strongest in game)      | 4-cost + 50 recoil, very slow    |
| Bombirdier          | —   | Colorless | Free retreat for any Pokemon               | Key mobility in Darkness decks   |
| Flygon ex           | —   | Dragon    | Bench-wide damage ability                  | Middle-tier Dragon option        |
| Entei               | 150 | Fire      | Tank + draw acceleration                   | Fire support                     |
| Flutter Mane ex     | 130 | Psychic   | Spellbinding Start: 70 (first attack only) | New B3a, being evaluated         |
| Koraidon ex         | 150 | Fighting  | World Wrecker: 110 (discard top deck)      | New B3a, Fighting partner option |
| Miraidon ex         | 140 | Lightning | Hadron Ray: scaling w/ Lightning energy    | New B3a, Lightning ramp option   |
| Terapagos ex        | 150 | Colorless | Prism Impact: 80+/energy type count        | New B3a, multi-energy synergy    |

## Key Trainer Cards

### Draw

- **Professor's Research** — Draw 2 (staple, 2x in every deck)
- **Copycat** — Manipulate hand (strong vs disruption, pairs with Magnezone)

### Search

- **Poke Ball** — Random Basic from deck (staple, 2x)
- **Rare Candy** — Skip Stage 1 evolution (essential for Stage 2 decks)
- **Lisia** — Search 50HP-or-less Pokemon + fill bench

### Gusting

- **Cyrus** — Bring damaged benched Pokemon to Active (most important)
- **Sabrina** — Switch opponent's Active Pokemon

### Energy Acceleration

- **Electric Generator** — Attach Lightning energy
- **Flame Patch** — Move Fire energy from discard

### Utility

- **Clemont** — Search Magneton + related cards
- **Korrina** — Fighting search + support
- **Misty** — Coin-flip Water energy acceleration
- **Irida** — Water-type support

### Stadium/Item

- **Training Area** — +10 damage to Stage 1/2 attacks
- **Fragrant Forest** — Search Grass basics
- **Arena of Antiquity** — Fighting support
- **Poison Barb** — Increase poison damage
- **Lucky Ice Pop** — Healing
- **Starting Plains** — Free retreat for Colorless

## Sample Analysis Output

```
=== MEGA LUCARIO EX ===
Type: Fighting | Mega Pokemon (3 points when KO'd)

Attack: Fighting Pulse (Fighting Energy)
- 90 damage base, up to 140 with Fighting support

Strategic Analysis:
- S tier with Hitmontop partner for early chip
- Igglybuff variant adds sleep stall for control
- Weak to Psychic (Mega Altaria ex is dominant)
- Point map: 1-1-3 (Hitmontop/Igglybuff as cheap front)
- Korrina provides Fighting search consistency

Competitive Tier: S (meta-defining Fighting powerhouse)
```
