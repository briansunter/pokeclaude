# Pokemon TCG Pocket: Ultra-Competitive Mastery Guide

## Table of Contents

1. [Situational Decision Trees](#situational-decision-trees)
2. [Turn-by-Turn Play Optimization](#turn-by-turn-play-optimization)
3. [Reading Opponents](#reading-opponents)
4. [Mulligan Decision Framework](#mulligan-decision-framework)
5. [Tempo vs. Race Decisions](#tempo-vs-race-decisions)
6. [Deck Archetype Sequencing](#deck-archetype-sequencing)
7. [Endgame Scenarios & KO Calculations](#endgame-scenarios--ko-calculations)
8. [Professional-Level Micro-Decisions](#professional-level-micro-decisions)
9. [High-Level Psychology & Pressure](#high-level-psychology--pressure)

---

## Situational Decision Trees

### Opening Turn Decision Tree (Turn 1)

**IF you have a Basic Pokemon in hand:**

```
YES → Play it as Active
│
├─ IF opponent has no Basic Pokemon
│  └─ Attack if 50+ damage (use Giovanni if needed for KO)
│
├─ IF opponent has Basic Pokemon with 70+ HP
│  └─ DO NOT ATTACK if you can't KO (save energy)
│     └─ Play backup Pokemon to bench
│
└─ IF opponent has Basic Pokemon with ≤60 HP
   └─ Attack with Giovanni for KO → +1 point advantage
```

**IF you have NO Basic Pokemon in hand:**

```
PLAY PROFESSOR'S RESEARCH
│
├─ IF you draw a Basic Pokemon
│  └─ Play it (even if suboptimal) - you need an Active
│
├─ IF you draw evolution cards only
│  └─ Play the Basic you find, evolve immediately
│     └─ Accept tempo loss, stabilize position
│
└─ IF you draw no Pokemon
   └─ Use Pokeball or Pokemon Communication
      └─ If still no Basic, concede tempo, draw more
```

### Mid-Game Decision Tree (Turns 3-5)

**SITUATION: Opponent has high-HP Pokemon (120+ HP)**

```
Is their Pokemon ex (worth 2 points)?
├─ YES
│  ├─ Do you have 2+ attackers?
│  │  ├─ YES → Focus fire, plan 2-turn KO
│  │  │        ├─ Turn 1: Damage to 40-60 HP range
│  │  │        └─ Turn 2: Use Giovanni + attack for KO
│  │  │
│  │  └─ NO → Use Sabrina to force it to bench
│  │           └─ Now it's worth only 1 point
│  │           └─ Save it for later or force them to use it
│  │
│  └─ Do you have Giovanni?
│     ├─ YES → Calculate KO math:
│     │        ├─ Attack ≥50 damage → Giovanni guarantees KO
│     │        └─ Attack 40-50 damage → Need 2 turns anyway
│     │
│     └─ NO → Calculate damage needed:
│              ├─ Need 60+ damage → Attack anyway, push damage
│              └─ Need 80+ damage → Consider Sabrina switch
│
└─ NO (Regular Pokemon, worth 1 point)
   ├─ Do you need tempo?
   │  ├─ YES → Attack immediately, push advantage
   │  └─ NO → Calculate if you can get 2 points elsewhere
   │
   └─ Is their bench weak?
      ├─ YES → Attack through it, deny evolution
      └─ NO → Consider going to their bench instead
```

### Professor Oak Decision Tree (Late Game)

**WHEN TO USE PROFESSOR OAK:**

```
What is your hand size?
├─ 0-2 cards
│  └─ USE IMMEDIATELY - You're empty, need resources
│
├─ 3-4 cards
│  ├─ Is opponent winning?
│  │  ├─ YES → USE IMMEDIATELY - Need comeback tools
│  │  └─ NO → Save for next turn
│  │
│  ├─ Do you have exact answers in hand?
│  │  ├─ YES → Save for when you use answers
│  │  └─ NO → Use to find answers
│  │
│  └─ Are you at 1-2 points?
│     └─ Consider saving for final push
│
├─ 5-6 cards
│  ├─ Are you behind on board?
│  │  ├─ YES → USE IMMEDIATELY - Need resource parity
│  │  └─ NO → Don't waste, save for better opportunity
│  │
│  └─ Can opponent kill you next turn?
│     ├─ YES → USE IMMEDIATELY - Need answers now
│     └─ NO → Save for value
│
└─ 7+ cards
   └─ DO NOT USE - Hand is healthy, don't overdraw
```

### Sabrina Decision Tree

**WHEN TO USE SABRINA:**

```
What is opponent's Active Pokemon?
├─ ex Pokemon
│  ├─ Is it worth 2 points?
│  │  ├─ YES → ALWAYS USE Sabrina
│  │  │        └─ Best value: 2-point Pokemon becomes 1-point
│  │  └─ NO → Evaluate other factors
│  │
│  ├─ Do they have bench space?
│  │  ├─ YES → Use Sabrina (they can replace it)
│  │  └─ NO → Don't waste, bench is full anyway
│  │
│  └─ Is your bench full?
│     ├─ YES → Don't use, you can't receive
│     └─ NO → Use Sabrina, force bad matchup
│
├─ Weak Pokemon (≤60 HP)
│  ├─ Can you KO it anyway?
│  │  ├─ YES → Don't waste Sabrina
│  │  │        └─ Attack for the point
│  │  └─ NO → Use Sabrina to force stronger Pokemon
│  │
│  └─ Is their bench stronger?
│     ├─ YES → Use Sabrina to expose threat
│     └─ NO → Don't disrupt, attack what you have
│
└─ Stage 2 Pokemon
   ├─ Did they invest energy in it?
   │  ├─ YES → Use Sabrina, waste their investment
   │  └─ NO → Consider letting it stay
   │
   └─ Is it heavily damaged?
      ├─ YES → Don't use, they might discard anyway
      └─ NO → Use Sabrina, reset their progress
```

### Energy Zone Decision Tree

**HOW TO PLAY BASED ON ENERGY TYPES:**

```
How many energy types in your deck?
├─ 1 Type (Mono-type)
│  └─ PLAY AGGRESSIVELY
│     └─ You know exactly what energy you'll get
│     └─ Can plan attacks reliably
│     └─ No randomness = lower variance
│
├─ 2 Types
│  ├─ Do you have attacks for BOTH types?
│  │  ├─ YES → Play flexibly
│  │  │        ├─ If you get Type A → Attack with Type A Pokemon
│  │  │        └─ If you get Type B → Attack with Type B Pokemon
│  │  │
│  │  └─ NO → You're playing wrong
│  │           └─ Every attacker should have an attack for each type
│  │
│  └─ Do you have low-energy attacks (1 energy)?
│     ├─ YES → Play high-confidence, simple lines
│     └─ NO → You're too inconsistent
│
└─ 3+ Types
   └─ CHANGE YOUR DECK
      └─ 33% consistency is too low for competitive play
```

### Healing Decision Tree (Potion Usage)

**WHEN TO USE POTION:**

```
Your Active Pokemon HP?
├─ 10-30 HP
│  └─ ALWAYS USE POTION
│     └─ You can't survive another hit
│     └─ Buying 1-2 extra turns is worth it
│
├─ 31-50 HP
│  ├─ Can opponent KO you next turn?
│  │  ├─ YES → USE POTION
│  │  │        └─ If you die, your Pokemon is wasted anyway
│  │  │
│  │  └─ NO → Consider saving
│  │           └─ If opponent can't kill, save for later
│  │
│  ├─ Is this your best attacker?
│  │  ├─ YES → USE POTION
│  │  │        └─ Don't lose your primary threat
│  │  └─ NO → Save for better Pokemon
│  │
│  └─ Do you have backup attackers?
│     ├─ YES → Evaluate if backup is comparable
│     └─ NO → USE POTION (this Pokemon matters)
│
├─ 51-70 HP
│  ├─ Are you behind in points?
│  │  ├─ YES → Consider using
│  │  │        └─ Every turn matters when losing
│  │  └─ NO → Save for when you need it
│  │
│  ├─ Is opponent's damage high (50+ per turn)?
│  │  ├─ YES → USE POTION
│  │  │        └─ You'll die in 2 turns anyway
│  │  └─ NO → Save energy and card
│  │
│  └─ Are you in endgame (both at 2 points)?
│     └─ USE POTION
│        └─ Every point matters, don't lose momentum
│
└─ 71+ HP
   └─ DO NOT USE POTION
      └─ You're fine, save for emergency
```

---

## Turn-by-Turn Play Optimization

### Turn 1: Establishing Tempo

**OPENING DECISION MATRIX:**

| Your Hand | Opponent's Play | Your Action                               |
| --------- | --------------- | ----------------------------------------- |
| 2 Basics  | No Pokemon      | Aggressive attack with stronger Basic     |
| 2 Basics  | Basic 60 HP     | Attack if you have Giovanni for KO        |
| 2 Basics  | Basic 70+ HP    | Setup position, don't waste energy        |
| 1 Basic   | No Pokemon      | Attack for free damage                    |
| 1 Basic   | Basic 60 HP     | Use Professor's Research to find damage   |
| 1 Basic   | Basic 70+ HP    | Professor's Research to improve hand      |
| 0 Basics  | Any             | Professor's Research → Pokeball if needed |

**TURN 1 OPTIMAL SEQUENCING:**

```
Step 1: Draw card (Turn 1 has no draw, skip)
Step 2: Get energy from zone (1 random energy)
Step 3: Play Pokemon if you have it
Step 4: Play supporter if needed (Professor's Research)
Step 5: Attack if you can get value

PROTIP: Turn 1 has no energy generation before your turn
        You only get energy AFTER playing Pokemon
        Plan accordingly
```

### Turn 2: Building Advantage

**KEY DECISIONS:**

```
Do you have energy this turn?
├─ YES → Attack if possible
│        └─ Don't save energy for "better" turns
│        └─ Pressure opponent's hand size
│
└─ NO → Setup plays
         ├─ Evolve if possible
         ├─ Bench Pokemon for later
         └─ Use Professor's Research

ATTACKING DECISIONS:
├─ Can KO their Pokemon?
│  ├─ YES → Attack (prioritize KOs over damage)
│  └─ NO → Should you attack anyway?
│           ├─ Are you behind in tempo?
│           │  └─ YES → Attack for pressure
│           └─ Are you behind in points?
│              └─ YES → Attack for pressure
│
└─ Can't KO
   ├─ Deal meaningful damage (40-60 HP)
   │  └─ Sets up future KO
   ├─ Chip damage (10-30 HP)
   │  └─ If nothing better to do
   └─ Don't attack
      └─ If energy inefficient or you need setup
```

**TURN 2 PRIORITY ORDER:**

1. **Evolve Pokemon** (if ready)
2. **KO opponent's Pokemon** (if possible)
3. **Deal damage to valuable targets**
4. **Play backup Pokemon** (to bench)
5. **Use supporters** (if needed)
6. **Attack for value** (if nothing better)

### Turn 3-4: Mid-Game Control

**BOARD STATE EVALUATION:**

**If You're Winning:**

```
Your Points > Opponent Points

├─ Maintain tempo
│  ├─ Keep attacking
│  ├─ Don't waste cards on defense
│  └─ Convert advantage to victory
│
├─ Deny their resources
│  ├─ Sabrina their best Pokemon
│  ├─ Force them to use suboptimal attackers
│  └─ Press card advantage
│
├─ Close method selection
│  ├─ Direct route: Attack for final point
│  ├─ Sabrina trick: Force ex to bench
│  └─ Board lock: Build unanswerable state
│
└─ Don't overextend
   └─ Don't play unnecessary cards
   └─ Save resources for finish
```

**If You're Losing:**

```
Your Points < Opponent Points

├─ Evaluate position
│  ├─ Can you come back in 1-2 turns?
│  │  └─ YES → All-in on pressure
│  └─ Do you need longer game?
│     └─ YES → Stall and heal
│
├─ Find power cards
│  ├─ Professor Oak immediately
│  ├─ Find your best attacker
│  └─ Heal your best Pokemon
│
├─ Disrupt opponent
│  ├─ Sabrina to slow them down
│  └─ Force them to waste tempo
│
└─ Calculate exact damage needed
   └─ Don't waste damage
   └─ Each attack must count
```

**If Even:**

```
Your Points = Opponent Points

├─ Play for card advantage
│  ├─ Don't trade down
│  ├─ Make them use resources first
│  └─ Professor Oak for parity
│
├─ Energy advantage
│  ├─ Mono-type decks have advantage
│  ├─ Play consistent, reliable lines
│  └─ Don't rely on luck
│
├─ Information advantage
│  ├─ Track their deck usage
│  └─ Predict their draws
│
└─ Position for endgame
   └─ Plan final point method
   └─ Don't waste late-game cards
```

### Turn 5-7: Endgame Execution

**ENDGAME CALCULATION FRAMEWORK:**

**Current Point Scenario:**

```
You: X points, Opponent: Y points

├─ X = 2, Y = 2
│  └─ FINAL TURN
│     ├─ Calculate if you can KO
│     │  ├─ YES → Execute perfect attack
│     │  └─ NO → Deny their KO
│     │
│     └─ Consider all lines
│        ├─ Attack → Win
│        ├─ Sabrina → Force different angle
│        ├─ Heal → Survive their attack
│        └─ Professor → Find exact answer
│
├─ X = 2, Y = 1
│  └─ You can play safer
│     ├─ Opponent must attack
│     ├─ Force them to KO you to win
│     ├─ Deny easy KOs with healing
│     └─ Build answer to their attack
│
├─ X = 1, Y = 2
│  └─ You MUST win this turn
│     ├─ Professor Oak immediately
│     ├─ Find double KO line
│     ├─ Or Sabrina + KO for 2 points
│     └─ No room for error
│
└─ X = 0, Y = 2
   └─ Comeback mode
      ├─ Professor Oak immediately
      ├─ Find your best board state
      ├─ Heal aggressively
      └─ Force them to misplay
```

**EXACT DAMAGE CALCULATION:**

```
Target: Opponent's Pokemon HP

Attack Damage = D
Giovanni Bonus = +10
Weakness Bonus = +30 (if applicable)

Total Damage = D + 10 (if G) + 30 (if weakness)

HP Remaining = Target HP - Total Damage

├─ ≤ 0 → KO (2 points if ex, 1 point if regular)
├─ 1-20 → Vulnerable to chip damage
├─ 21-40 → Can finish with small attack
├─ 41-60 → Needs medium attack
└─ 61+ → Requires large attack or multiple turns
```

---

## Reading Opponents

### Hand Size Interpretation

**CARD COUNT ANALYSIS:**

**Opponent has 0-2 cards:**

```
WHAT IT MEANS:
├─ They drew nothing useful
├─ They used cards last turn
└─ They're desperate

WHAT TO DO:
├─ Play aggressively
│  └─ They can't respond well
├─ Don't give free points
│  └─ Make them work for KOs
├─ Force them to have exact cards
│  └─ Most players don't
└─ Consider baiting
   └─ Make them waste resources
```

**Opponent has 3-5 cards:**

```
WHAT IT MEANS:
├─ Normal hand size
├─ They haven't drawn much
└─ They're in decent shape

WHAT TO DO:
├─ Play your normal game
├─ Don't overcommit
├─ Watch for professor usage
└─ If they don't play professor, they might have better hand
```

**Opponent has 6+ cards:**

```
WHAT IT MEANS:
├─ They drew well
├─ Professor's Research or Oak recently
├─ They have options

WHAT TO DO:
├─ Play more conservatively
├─ Don't overextend
├─ Save disruption for later
├─ Make them use cards first
└─ Don't fall behind on tempo
```

### Predicting Their Actions

**BEHAVIORAL READS:**

**If they hesitate before playing Pokemon:**

```
POSSIBILITIES:
├─ They only have evolutions (no Basics)
├─ They're deciding which Basic to play
├─ They don't have a good play
└─ They're considering professor

RESPONSE:
├─ If no Basic → Play aggressively
├─ If choosing between Basics → Both are similar
├─ If no good play → Maintain pressure
├─ If considering professor → Disrupt their timing
```

**If they play multiple cards at once:**

```
POSSIBILITIES:
├─ They have good setup
├─ They're committing to a line
├─ They have multiple options
└─ They're desperate (playing everything)

RESPONSE:
├─ If good setup → Sabrina to disrupt
├─ If committing → Force them to follow through
├─ If multiple options → They have good hand
├─ If desperate → Play conservatively
```

**If they don't attack when they could:**

```
POSSIBILITIES:
├─ Can't KO anything meaningful
├─ Saving energy for next turn
├─ Don't have energy
├─ Waiting for better opportunity
└─ Want to evolve first

RESPONSE:
├─ Can't KO → Safe to play aggressively
├─ Saving energy → Deny that opportunity
├─ No energy → Attack for free damage
├─ Better opportunity → Deny that opportunity
├─ Evolve first → Attack before evolution
```

### Trainer Reading

**PROFESSOR OAK LOCATION:**

**If they just used Professor Oak:**

```
WHAT IT MEANS:
├─ Hand was terrible (3+ bad cards)
├─ They needed specific cards
├─ They're behind on resources
└─ They're committing to a strategy

NEXT 2-3 TURNS:
├─ They have 3 new cards
├─ They might have found their best Pokemon
├─ Play around disruption (Sabrina, healing)
├─ Don't give free turns
└─ Track what they're using
```

**If they haven't used Professor Oak:**

```
WHAT IT MEANS:
├─ They have it in hand
├─ Hand is decent
├─ Waiting for better opportunity
└─ 20-card deck, they'll draw it eventually

PLAY AROUND IT:
├─ Don't overcommit to single Pokemon
├─ Keep healing in hand
├─ Have answers to disruption
└─ They might oak next turn

WHEN THEY USE IT (inevitably):
├─ Expect strong follow-up
├─ Play defensively
├─ Disrupt their setup
└─ Don't let them convert advantage
```

**SABRINA LOCATION:**

**If they haven't used Sabrina yet:**

```
ASSUMPTIONS:
├─ They have it (70%+ chance by turn 5)
├─ Waiting for your best Pokemon
├─ Save it for right moment

PROTECTION STRATEGIES:
├─ Don't over-bench important Pokemon
├─ Keep expendable Pokemon on bench
├─ Have multiple threats
├─ Be ready for switch

HOOKS (force them to use it):
├─ Play your best Pokemon anyway
├─ Force them to choose between 2 threats
└─ Make them have it now or lose
```

**If they used Sabrina early:**

```
WHAT IT MEANS:
├─ They didn't save it for late game
├─ They panicked
├─ Your threat was too immediate
└─ They don't have good late game

ADVANTAGES:
├─ No disruption for endgame
├─ You can play safely
├─ They used valuable resource early
└─ Focus on your plan

DANGERS:
├─ They have other disruption
├─ They're confident in their position
└─ They might have calculated value
```

### Energy Zone Tracking

**TRACKING OPPONENT'S ENERGY:**

**Turn-by-Turn Log:**

```
Track: Energy type they receive each turn

PATTERNS:
├─ Same type every time → Mono-type deck
│  └─ Predict their attacks
│  └─ Build resistance matchup
│
├─ Alternates between 2 types → 2-type deck
│  └─ Calculate 50% chances
│  └─ Watch for which type they need
│
├─ Random types → Inconsistent deck
│  └─ Play aggressively
│  └─ They might miss energy
│
└─ Consistently bad types → They'll struggle
   └─ Maintain pressure
   └─ Force them to overcommit
```

**Using Their Energy Against Them:**

```
If they need Lightning energy:
├─ Play Water Pokemon (resists Lightning)
├─ Keep Grass Pokemon on bench (weak to Lightning)
├─ Force them to attack with resistance
└─ Heal against chip damage

If they need Fire energy:
├─ Play Grass Pokemon (resists Fire)
├─ Keep Water Pokemon away (weak to Fire)
├─ Force inefficient attacks
└─ Chip damage through resistance

If they need Grass energy:
├─ Play Fire Pokemon (weakness)
├─ Keep Water Pokemon available
└─ Exploit weakness for KOs
```

---

## Mulligan Decision Framework

### Aggressive Deck Mulligan

**EXAMPLE: Pikachu ex Deck, Mewtwo Deck**

**KEEP CRITERIA:**

```
MUST HAVE (Keep 70%+ of games):
├─ At least 1 Basic Pokemon
├─ At least 1 attacker (or evolution path)
├─ 0-1 evolution requirements
└─ At least 1 energy in starting hand

IDEAL HAND (Keep 20%+ of games):
├─ 2 Basics (different if possible)
├─ Strong attacker ready to play
├─ Giovanni (for early KOs)
├─ Professor's Research (for consistency)
└─ Pokemon Communication (search utility)

DECENT HAND (Keep 50%+ of games):
├─ 1 Basic attacker
├─ Path to evolution (Rare Candy or Basics)
├─ Some energy
└─ 1 supporter
```

**MULLIGAN DECISIONS:**

```
Starting Hand Analysis:
├─ 0 Basics
│  └─ MULLIGAN ALWAYS
│     └─ You can't play without Pokemon
│
├─ 1 Basic, 0 energy, 3+ supporters
│  └─ MULLIGAN (dead hand)
│     └─ Supporters are useless without Pokemon
│
├─ 1 Basic, 1 energy, 1 evolution
│  └─ KEEP (can evolve turn 2)
│     └─ Set up tempo
│
├─ 2 Basics, both need evolution
│  └─ MULLIGAN (too slow)
│     └─ You need immediate pressure
│
├─ 1 Basic, 1 energy, Professor Oak
│  └─ KEEP (refill immediately)
│     └─ Oak fixes bad hands
│
└─ 1 Basic, Giovanni, Professor's Research
   └─ KEEP (perfect setup)
   └─ Attack + draw cycle
```

### Control Deck Mulligan

**EXAMPLE: Slow Stall, Healing Control**

**KEEP CRITERIA:**

```
MUST HAVE (Keep 80%+ of games):
├─ At least 1 Basic Pokemon
├─ High-HP Pokemon or evolution path
├─ Potion or healing ability
├─ Energy for 2-3 turns
└─ Professor Oak or Research

IDEAL HAND (Keep 25%+ of games):
├─ High-HP Basic (90+ HP)
├─ Evolution path to high-HP Stage 2
├─ Potion + Professor Oak
├─ Multiple energy types (for flexibility)
└─ Sabrina (disruption)

DECENT HAND (Keep 60%+ of games):
├─ Tanky Pokemon (70+ HP)
├─ Healing options
├─ Energy for setup
└─ 1-2 supporters
```

**MULLIGAN DECISIONS:**

```
Starting Hand Analysis:
├─ All attackers (no healing)
│  └─ MULLIGAN (too fragile)
│     └─ Control needs sustain
│
├─ 0 energy, 0 supporters
│  └─ MULLIGAN (can't do anything)
│
├─ 1 Basic 60 HP, no healing
│  └─ MULLIGAN (dies turn 2)
│     └─ Control needs longevity
│
├─ 1 Basic 80+ HP, Potion
│  └─ KEEP (can stabilize)
│     └─ Healing extends games
│
├─ High-HP evolution, no setup
│  └─ MULLIGAN (too slow)
│     └─ Needs immediate board
│
└─ Evolution path + Rare Candy
   └─ KEEP (accelerates setup)
   └─ Gets tank online faster
```

### Evolution Deck Mulligan

**EXAMPLE: Charizard, Blastoise Decks**

**KEEP CRITERIA:**

```
MUST HAVE (Keep 75%+ of games):
├─ Basic Pokemon (any)
├─ Evolution path
│  ├─ Basic + Stage 1 + Stage 2
│  ├─ Basic + Rare Candy + Stage 2
│  └─ Basic + Pokemon Communication
└─ Energy for setup (2-3)

IDEAL HAND (Keep 30%+ of games):
├─ Basic Pokemon
├─ Stage 1 or Stage 2 Pokemon
├─ Rare Candy (acceleration)
├─ Professor Oak (refill for evolutions)
└─ Pokemon Communication (find missing piece)

DECENT HAND (Keep 55%+ of games):
├─ Basic + evolution chain
├─ 2-3 energy
├─ Some supporters
└─ 1-2 Bench slots available
```

**EVOLUTION TIMING:**

```
Turn 1:
├─ Play Basic Pokemon
├─ Don't evolve yet
├─ Draw cards for setup
└─ Establish board

Turn 2:
├─ Evolve to Stage 1 (if you have it)
├─ Get energy for Stage 2
├─ Professor's Research if needed
└─ Avoid overcommitting

Turn 3:
├─ Evolve to Stage 2 (Rare Candy or naturally)
├─ If Rare Candy: Bypass Stage 1 entirely
├─ Now you have power
├─ Start attacking
```

**MULLIGAN CHECKLIST:**

```
Starting Hand:
├─ Has Basic? YES → Continue analysis
│        NO → Mulligan
│
├─ Has evolution path?
│  ├─ Basic + Stage 1 + Stage 2 → Keep (perfect)
│  ├─ Basic + Rare Candy + Stage 2 → Keep (great)
│  ├─ Basic + Stage 1 → Keep (decent)
│  ├─ Basic + Stage 2 → Keep (good)
│  └─ Basic only → Mulligan (too slow)
│
├─ Has energy?
│  ├─ 2+ energy → Keep
│  ├─ 1 energy → Keep if good setup
│  └─ 0 energy → Mulligan
│
└─ Has supporters?
   ├─ Professor Oak → Keep (finds missing pieces)
   ├─ Research → Keep (improves hand)
   └─ None → Keep if hand is good
```

### Weakness Exploitation Mulligan

**EXAMPLE: Fire vs. Grass, Lightning vs. Water**

**MULLIGAN FOR MATCHUP:**

```
YOUR STRATEGY: Exploit weakness

MUST HAVE:
├─ Pokemon with right weakness
├─ Energy for attacking type
├─ Multiple attackers of same weakness type
└─ Get online fast (turn 2-3)

IDEAL HAND:
├─ 2+ Pokemon of weakness type
├─ Energy matching weakness
├─ Giovanni (+10 makes KOs easier)
└─ Professor Oak (find more weakness Pokemon)

MULLIGAN DECISIONS:
├─ Only 1 Pokemon of weakness type
│  └─ Mulligan (need consistency)
│
├─ Wrong energy types
│  └─ Mulligan (can't exploit weakness)
│
├─ Evolution-only (no Basics)
│  └─ Mulligan (too slow for aggression)
│
└─ Correct Pokemon + correct energy
   └─ Keep (exploit matchup)
```

---

## Tempo vs. Race Decisions

### Understanding Tempo vs. Race

**TEMPO STRATEGY:**

```
Definition: Control the pace, make opponent react to you

WHEN TO PLAY TEMPO:
├─ You're going first
├─ You have disruption (Sabrina, etc.)
├─ You have card advantage
├─ Opponent has slow setup
└─ You have more efficient attackers

TEMPO PLAY STYLE:
├─ Attack every turn
├─ Force opponent to use resources
├─ Disrupt their setup
├─ Don't give free turns
├─ Convert small advantages into big ones
└─ Close with efficient KOs
```

**RACE STRATEGY:**

```
Definition: Build faster than opponent, win before they stabilize

WHEN TO RACE:
├─ Opponent has healing/control
├─ You're both going for same strategy
├─ You have faster setup
├─ Opponent has slow evolutions
└─ Energy zone favors you

RACE PLAY STYLE:
├─ Maximize damage output
├─ Ignore opponent's threats
├─ Build unstoppable board
├─ Don't waste on defense
└─ Get to 3 points ASAP
```

### Decision Framework

**BOARD STATE EVALUATION:**

```
Turn 2 Decision Point:

Question: Can opponent threaten your Pokemon next turn?
├─ NO → Play tempo (attack, setup, deny)
│
└─ YES → Can you heal/retreat?
   ├─ YES → Play tempo (can survive)
   └─ NO → Race (can't afford to play defensive)
```

**EXAMPLE SCENARIO:**

**Situation A: Both players at 0 points**

```
Opponent's board: 60 HP Basic, no benched Pokemon
Your board: 80 HP Basic, bench empty

TEMPO DECISION:
├─ Can you KO their Basic?
│  ├─ YES (with Giovanni) → Attack immediately
│  │        └─ +1 point advantage
│  └─ NO → Do you have setup?
│           ├─ YES → Setup (evolve, bench)
│           └─ NO → Attack for damage
│
├─ Do they have professor?
│  ├─ YES → Don't overcommit
│  └─ NO → Play aggressively
│
└─ Your hand quality?
   ├─ Good → Tempo (maintain advantage)
   └─ Bad → Race (need immediate value)
```

**Situation B: You're behind (0 points, opponent has 1 point)**

```
Opponent: 1 point, high-HP attacker ready
You: 0 points, decent setup

TEMPO vs RACE:
├─ Can you get 2 points in next 2 turns?
│  ├─ YES → Race (must catch up)
│  │        └─ Professor Oak immediately
│  │        └─ Find your best attackers
│  │        └─ Ignore their threats
│  │
│  └─ NO → Tempo (play from ahead)
│           ├─ Survive their attack
│           ├─ Heal your Pokemon
│           ├─ Force them to use resources
│           └─ Counter-attack when safe
│
├─ Their damage output?
│  ├─ 60+ per turn → Race (can't out-heal)
│  └─ 30-40 per turn → Tempo (can survive)
│
└─ Your healing options?
   ├─ 2+ Potions → Tempo (sustain advantage)
   └─ 0-1 Potions → Race (need to end fast)
```

### Matchup-Specific Decisions

**VS. AGGRO (Fast attackers, low HP):**

```
THEIR STRATEGY: Speed to victory

YOUR DECISIONS:
├─ If you can out-speed them
│  └─ Race (be faster)
│     └─ Prioritize KOs over healing
│     └─ Ignore some damage
│     └─ Get to 3 points first
│
├─ If you have more HP
│  └─ Tempo (outlast them)
│     └─ Heal every turn
│     └─ Force them to overcommit
│     └─ Counter when they run out of steam
│
├─ Do you have Sabrina?
│  ├─ YES → Tempo tool
│  │        └─ Remove their best attacker
│  │        └─ Break their momentum
│  └─ NO → Consider racing
│           └─ Can't disrupt, must be faster
│
└─ Card count?
   ├─ More cards → Tempo (resource advantage)
   └─ Fewer cards → Race (no room for tempo)
```

**VS. CONTROL (Healing, stalling):**

```
THEIR STRATEGY: Survive long, win late

YOUR DECISIONS:
├─ Always race
│  └─ Can't heal race conditions
│  └─ Build fast, end before stall matters
│  └─ Don't waste on defense
│  └─ Get 3 points by turn 5-6
│
├─ Energy efficiency
│  └─ Mono-type advantage
│  └─ Predictable attacks
│  └─ Don't need backup plans
│
├─ Their disruption?
│  ├─ Sabrina saved → Don't over-bench
│  └─ Sabrina used → Play freely
│
├─ Your finishers?
│  ├─ High-damage attackers → Race focus
│  └─ Multiple attackers → Race focus
│
└─ Their healing?
   ├─ 2+ Potions → Race harder (ignore healing)
   └─ 0-1 Potions → Standard race
```

**VS. MIRROR (Same strategy):**

```
THEIR STRATEGY: Same as yours

TEMPO DECISIONS:
├─ Who goes first?
│  ├─ You → Tempo (establish advantage)
│  └─ They → Race (catch up)
│
├─ Energy zone luck?
│  ├─ Better luck → Tempo (maintain)
│  └─ Worse luck → Race (before luck evens)
│
├─ Card quality?
│  ├─ Better hand → Tempo (leverage)
│  └─ Worse hand → Race (desperation)
│
├─ Professor Oak location?
│  ├─ You have it → Tempo (refill advantage)
│  └─ They have it → Race (before they use it)
│
└─ Board position?
   ├─ Ahead → Tempo (don't give up)
   └─ Behind → Race (must catch up)
```

---

## Deck Archetype Sequencing

### Mono-Type Aggro Sequencing

**EXAMPLE: Pikachu ex (Lightning), Charizard (Fire)**

**TURN-BY-TURN SEQUENCE:**

**Turn 1:**

```
Goal: Establish board presence

IF you have Basic Pokemon:
├─ Play Basic as Active
├─ If 60+ HP, play second Basic to bench
└─ Do not attack (no energy yet)

IF no Basic Pokemon:
├─ Professor's Research
├─ Look for Basic Pokemon
└─ If found, play it

TURN 1 PRIORITY:
1. Pokemon in play
2. Bench Pokemon
3. Don't attack
4. Set up for turn 2
```

**Turn 2:**

```
Goal: Start attacking

ENERGY PHASE:
├─ You get 1 Lightning energy
└─ Can now attack

ATTACKING DECISIONS:
├─ Opponent has no Pokemon
│  └─ Attack for free damage
│
├─ Opponent has 60 HP Basic
│  ├─ Use Giovanni for +10 damage
│  └─ Total 60 damage = KO = +1 point
│
├─ Opponent has 70+ HP Pokemon
│  ├─ Attack for 30-50 damage
│  └─ Set up future KO
│
├─ Have evolution line?
│  └─ Evolve if ready
│  └─ Bench evolution for turn 3
│
└─ Have Rare Candy?
   ├─ Skip Stage 1 if you have Stage 2
   └─ Get online faster
```

**Turn 3:**

```
Goal: Establish dominance

ENERGY + ATTACK:
├─ 2 Lightning energy available
├─ Pikachu ex Circle Circuit = 50 damage
├─ With Giovanni = 60 damage

ATTACK PRIORITIES:
├─ KO their Pokemon if possible
│  └─ 60 damage KOs most Basics
│
├─ If can't KO ex, damage to 40-60 HP
│  └─ Sets up turn 4 KO
│
├─ Set up bench pressure
│  └─ Play second attacker
│  └─ Multiple threats
│
├─ Sabrina usage?
│  ├─ If you have board advantage → Save
│  └─ If behind → Use to disrupt
│
└─ Professor Oak?
   ├─ If behind → Use immediately
   └─ If ahead → Save
```

**Turn 4-5:**

```
Goal: Close the game

FINISHING MOVES:
├─ If at 1 point → Need 2 more
│  ├─ Double KO line available?
│  │  ├─ YES → Attack both threats
│  │  └─ NO → KO one, pressure other
│  │
│  └─ Sabrina trick?
│     └─ Force ex to bench (now worth 1)
│     └─ Easier to get 2nd point
│
├─ If at 2 points → Need 1 more
│  ├─ Direct attack for KO
│  ├─ Sabrina to make ex worth 1
│  └─ Build unanswerable board
│
├─ Resources management
│  ├─ Don't waste cards
│  ├─ Save healing for finish
│  └─ Energy efficient attacks
│
└─ Card advantage
   ├─ Professor Oak if needed
   └─ Don't overdraw late game
```

### Evolution Control Sequencing

**EXAMPLE: Mewtwo, Slow stall with disruption**

**TURN-BY-TURN SEQUENCE:**

**Turn 1:**

```
Goal: Survive, establish foundation

OPENING PLAY:
├─ Play highest-HP Basic (80+ HP)
├─ Bench tanky Pokemon for later
├─ If 60 HP Pokemon only → Professor's Research
└─ Find better tank

SETUP CARDS:
├─ Play Potion if available
├─ Pokemon Communication for answers
├─ Don't attack (need survival)
└─ Establish defensive position
```

**Turn 2:**

```
Goal: Evolve, heal, control

EVOLUTION TIMING:
├─ Evolve to Stage 1 if you have it
├─ If Stage 2 ready → Use Rare Candy
│  └─ Skip Stage 1 energy cost
│
├─ If no evolution → Play second Basic
│  └─ Multiple defenders
│
├─ Energy efficiency
│  └─ Get energy for big attacks
│  └─ Don't waste on small attacks
│
└─ Heal priority
   ├─ Use Potion on tankiest Pokemon
   └─ Extend their life
```

**Turn 3-4:**

```
Goal: Gain control of game

CONTROL ESTABLISHED:
├─ If you have Stage 2 online
│  ├─ High HP = hard to kill
│  ├─ Strong attacks = pressure
│  └─ Use Potion to extend
│
├─ Sabrina timing
│  ├─ If behind → Use to disrupt
│  ├─ If ahead → Save for endgame
│  └─ Don't waste early
│
├─ Energy management
│  └─ Build up for big attacks
│  └─ Don't waste energy
│
└─ Professor Oak timing
   ├─ If behind → Use immediately
   ├─ If ahead → Save for perfect moment
   └─ When you need specific answers
```

**Turn 5-6:**

```
Goal: Close from control position

ENDGAME CONTROL:
├─ If opponent needs last point
│  ├─ Sabrina their threat
│  ├─ Heal your Pokemon
│  └─ Force them to find exact line
│
├─ If you need last point
│  ├─ Attack for KO
│  └─ Exploit type advantages
│
├─ Resource priority
│  ├─ Don't waste Potion
│  ├─ Use Sabrina optimally
│  └─ Energy for reliable attacks
│
└─ Winning lines
   ├─ If ahead → Play conservatively
   ├─ If behind → All-in pressure
   └─ Calculate exact damage needed
```

### Weakness Exploitation Sequencing

**EXAMPLE: Fire vs. Grass, Lightning vs. Water**

**MATCHUP-SPECIFIC SEQUENCE:**

**Pre-Game Planning:**

```
Matchup awareness:
├─ You: Fire type
├─ Opponent: Likely Grass type
├─ Weakness: Fire deals +30 to Grass
├─ Strategy: Exploit weakness hard
│
Deck requirements:
├─ Multiple Fire Pokemon
├─ Fire energy consistently
├─ Giovanni (+10 makes KOs easier)
├─ Fast attackers (turn 2-3 online)
```

**Turn 1:**

```
Goal: Get weakness Pokemon active

OPENING:
├─ Play Fire-type Basic
├─ If you have Charizard or high-Fire attacker
│  └─ Bench it for evolution
├─ Don't attack (no energy)
└─ Establish Fire presence
```

**Turn 2:**

```
Goal: Exploit weakness immediately

ENERGY + ATTACK:
├─ Get Fire energy (1st turn)
├─ Attack with 30-damage Fire attack
├─ Weakness bonus = +30 damage
└─ Total = 60 damage

OHKO POTENTIAL:
├─ Many Grass Basics have 60-70 HP
├─ 30 + 30 = 60 exactly
├─ With Giovanni = 40 + 30 = 70
└─ KO most Grass Basics turn 2

ATTACK DECISIONS:
├─ Opponent has Grass-type?
│  ├─ YES → Attack immediately
│  │        └─ Exploit weakness
│  └─ NO → Assess other options
│
├─ Don't save energy for later
│  └─ Exploit advantage now
│
└─ Multiple Fire Pokemon?
   ├─ YES → Keep pressure
   └─ NO → Make this count
```

**Turn 3:**

```
Goal: Maintain weakness pressure

CONTINUOUS ADVANTAGE:
├─ Opponent's Grass Pokemon now at 0-40 HP
├─ You have 1-2 Fire energy
├─ Fire attack = 50 damage + 30 weakness = 80
└─ KO most remaining threats

BOARD MANAGEMENT:
├─ If you KOed their Grass
│  ├─ Sabrina to force another Grass
│  └─ Continue exploiting weakness
│
├─ If you have bench Fire Pokemon
│  └─ Play it to maintain pressure
│
├─ If opponent switched types
│  └─ Sabrina back to Grass if possible
│
└─ Maintain fire advantage
   └─ Don't waste turns on non-Grass
```

**Turn 4-5:**

```
Goal: Close with weakness advantage

FINISHING:
├─ If opponent persists with Grass
│  ├─ Continue exploiting
│  ├─ Every attack gets +30
│  └─ Faster KOs
│
├─ If opponent switched to resistant type
│  ├─ Sabrina back to Grass
│  └─ Force weakness matchup
│
├─ Deck exhaustion
│  ├─ You have fewer cards (20-card deck)
│  └─ Win before resources run out
│
└─ Calculate points
   ├─ Weakness makes each KO easier
   ├─ Faster point accumulation
   └─ Close by turn 5-6
```

### Multi-Type Flexible Sequencing

**EXAMPLE: Fire/Water deck with flexible attackers**

**TURN-BY-TURN FLEXIBILITY:**

**Turn 1:**

```
Setup Phase:

PLAY OPTIONS:
├─ Play Water-type Basic (flexible)
├─ Play Fire-type Basic (aggressive)
├─ Look at opponent's probable type
│
├─ If opponent unknown
│  └─ Play more flexible option
│  └─ Water Pokemon often have 0-energy attacks
│
└─ Establish board
   └─ Get any Basic in play
```

**Turn 2:**

```
Energy Flexibility:

ENERGY ZONE ROLL:
├─ If Fire energy
│  └─ Fire Pokemon can attack
│     └─ More aggressive plays
│
├─ If Water energy
│  └─ Water Pokemon can attack
│     └─ More defensive options
│
├─ If neither Fire nor Water
│  └─ Don't attack (wasted turn)
│  └─ Setup plays (evolve, bench)
│
└─ PREDICTION GAME
   └─ Don't commit based on one energy
```

**Turn 3:**

```
Flexible Response:

OPPONENT'S BOARD:
├─ Fire-weak Pokemon (Grass)
│  └─ Use Water Pokemon
│     └─ They resist Fire
│     └─ You gain advantage
│
├─ Water-weak Pokemon (Lightning)
│  └─ Use Fire Pokemon
│     └─ They resist Water
│     └─ You gain advantage
│
├─ Neutral Pokemon
│  └─ Pick your best energy type
│  └─ Choose most efficient attack
│
└─ Resistant Pokemon
   └─ Switch to other type
   └─ Find weakness matchup
```

**Turn 4-5:**

```
Endgame Flexibility:

RESOURCE ALLOCATION:
├─ Have both Fire and Water attackers?
│  ├─ YES → Keep both on bench
│  │        └─ Adapt to their board
│  └─ NO → Commit to one energy type
│
├─ Energy efficiency
│  ├─ Both types available → Flexible
│  └─ One type only → Commit to that line
│
├─ Opponent adaptation
│  ├─ If they match your type → Switch
│  └─ If they resist your type → Switch
│
└─ Close decisions
   ├─ Use whichever attacker is ready
   └─ Adapt to energy zone luck
```

---

## Endgame Scenarios & KO Calculations

### Final Turn Mathematics

**SCENARIO 1: You Can Win This Turn**

**Current State:**

```
You: 2 points, Opponent: 2 points
Your Pokemon: 80 HP remaining
Opponent's Pokemon: 40 HP remaining

KO CALCULATION:
├─ Your attack damage: 50
├─ With Giovanni: +10 = 60
├─ Total damage: 60
├─ Opponent HP: 40
├─ Result: 60 > 40 → KO
└─ Action: WIN

PERFECT LINE:
1. Use Giovanni (+10 damage)
2. Attack for 60 total damage
3. Opponent's Pokemon at 40 HP = KO
4. You get 1 point → 3 points total = WIN
```

**SCENARIO 2: You Must Defend This Turn**

**Current State:**

```
You: 2 points, Opponent: 2 points
Your Pokemon: 50 HP
Opponent's Pokemon: 90 HP, can attack for 60

DEFENSE CALCULATION:
├─ Opponent will do 60 damage
├─ Your Pokemon at 50 HP
├─ 60 > 50 → You will lose Pokemon
├─ Result: They get 1 point → 3 points = LOSS
└─ Must prevent KO

DEFENSE OPTIONS:
├─ Use Potion (+30 HP)
│  └─ 50 + 30 = 80 HP
│  └─ Opponent 60 damage → 20 HP remaining
│  └─ You survive → Game continues
│
├─ Sabrina their attacker
│  └─ Switch them to weak Pokemon
│  └─ You survive turn
│  └─ Force them to find another KO line
│
└─ Retreat to benched Pokemon
   └─ If you have 0-cost retreat
   └─ Don't give them point
```

**SCENARIO 3: Double KO Line**

**Current State:**

```
You: 1 point, Opponent: 2 points
Your bench: 2 Pokemon ready
Opponent: 1 Pokemon active (90 HP)

CALCULATION:
├─ You need 2 points this turn
├─ Opponent needs 1 point to win
├─ You have 2 attackers
├─ Both can attack for 50+ damage

DOUBLE KO LINE:
Turn 5:
├─ Attacker 1: Attack for 50
│  └─ If 50+ damage → KO their Pokemon
│  └─ +1 point for you (now 2 points)
│
├─ Attacker 2: Attack for 50
│  └─ +1 point for you (now 3 points)
│  └─ WIN

REQUIRES:
├─ Both attackers ready
├─ Both can get 50+ damage
├─ Both can attack same turn
└─ No opponent disruption (Sabrina, etc.)
```

### Exact Damage Calculations

**KO THRESHOLDS BY HP:**

**Target: 60 HP Basic Pokemon**

```
Required damage without Giovanni:
├─ 30 damage attack: Leaves 30 HP (not KO)
├─ 40 damage attack: Leaves 20 HP (not KO)
├─ 50 damage attack: Leaves 10 HP (not KO)
├─ 60 damage attack: KO exactly
└─ 70+ damage attack: Overkill

Required damage WITH Giovanni (+10):
├─ 30 damage attack: 40 total → Leaves 20 HP
├─ 40 damage attack: 50 total → Leaves 10 HP
├─ 50 damage attack: 60 total → KO exactly
└─ 60+ damage attack: Overkill

KEY INSIGHT: Giovanni changes 40-damage attacks into KO
```

**Target: 70 HP Basic Pokemon**

```
Required damage without Giovanni:
├─ 50 damage attack: Leaves 20 HP
├─ 60 damage attack: Leaves 10 HP
├─ 70 damage attack: KO exactly
└─ 80+ damage attack: Overkill

Required damage WITH Giovanni (+10):
├─ 40 damage attack: 50 total → Leaves 20 HP
├─ 50 damage attack: 60 total → Leaves 10 HP
├─ 60 damage attack: 70 total → KO exactly
└─ 70+ damage attack: Overkill

INSIGHT: Need 60 damage total for KO with G
```

**Target: 80 HP Basic Pokemon**

```
Required damage without Giovanni:
├─ 60 damage attack: Leaves 20 HP
├─ 70 damage attack: Leaves 10 HP
├─ 80 damage attack: KO exactly
└─ 90+ damage attack: Overkill

Required damage WITH Giovanni (+10):
├─ 50 damage attack: 60 total → Leaves 20 HP
├─ 60 damage attack: 70 total → Leaves 10 HP
├─ 70 damage attack: 80 total → KO exactly
└─ 80+ damage attack: Overkill

INSIGHT: 70 damage attacks are premium for KOs
```

**Target: 150 HP ex Pokemon**

```
Required damage without Giovanni:
├─ Attack 1: 60 damage → 90 HP remaining
├─ Attack 2: 60 damage → 30 HP remaining
├─ Attack 3: 60 damage → KO
└─ Total: 3 attacks needed

Required damage WITH Giovanni (+10):
├─ Attack 1: 70 damage → 80 HP remaining
├─ Attack 2: 70 damage → 10 HP remaining
├─ Attack 3: Any damage → KO
└─ Total: 3 attacks (but more damage done)

COMPARISON:
├─ Without G: 180 total damage
├─ With G: 150 total damage
└─ Savings: 30 damage = half an attack
```

### Weakness/Resistance Math

**FIRE ATTACKING GRASS (Fire weakness):**

**Base Damage: 50**

```
Calculation:
├─ Base damage: 50
├─ Weakness bonus: +30
├─ Total: 80 damage

KO thresholds:
├─ KO 60 HP Pokemon: Easy (20 overkill)
├─ KO 70 HP Pokemon: Easy (10 overkill)
├─ KO 80 HP Pokemon: Exact KO
├─ KO 90 HP Pokemon: Needs 60 base damage
└─ KO 120 HP Pokemon: Needs 90 base damage

INSIGHT: Weakness effectively reduces all HP by 30
```

**FIRE ATTACKING WATER (Fire resistance):**

**Base Damage: 50**

```
Calculation:
├─ Base damage: 50
├─ Resistance penalty: -30
├─ Total: 20 damage

KO thresholds:
├─ Can't KO Basics (60+ HP) in 1 hit
├─ Needs multiple attacks
├─ Even 60 base damage = 30 total
├─ Needs 3 attacks on 90 HP Pokemon
└─ Very inefficient

INSIGHT: Resistance makes attacks nearly useless
SOLUTION: Use different attacker type
```

### Energy Efficiency Calculations

**1-ENERGY ATTACKS:**

```
Damage per energy:
├─ 30 damage attack: 30 damage/energy
├─ 40 damage attack: 40 damage/energy
├─ 50 damage attack: 50 damage/energy

BEST RATIOS:
├─ 50 damage/energy is ideal
├─ 40 damage/energy is good
├─ 30 damage/energy is acceptable

USAGE:
├─ Use 50-damage attacks when available
├─ Save energy for 40+ damage attacks
├─ Don't waste on 30 damage (inefficient)
```

**2-ENERGY ATTACKS:**

```
Damage per energy:
├─ 60 damage attack: 30 damage/energy
├─ 70 damage attack: 35 damage/energy
├─ 80 damage attack: 40 damage/energy

EFFICIENCY COMPARISON:
├─ 2-energy 70 damage = 35 damage/energy
├─ 1-energy 40 damage = 40 damage/energy
└─ Conclusion: 1-energy attacks often better

WHEN TO USE 2-ENERGY:
├─ When it enables KO
├─ When you have energy banked
├─ When 1-energy attacks can't finish
└─ Late game when you have excess energy
```

**MULTI-TURN DAMAGE:**

```
3-turn KO sequence, 70 HP target:

Option A: 1-energy attacks
├─ Turn 1: 40 damage → 30 HP remaining
├─ Turn 2: 40 damage → KO
└─ Total: 2 turns, 2 energy

Option B: 2-energy attacks
├─ Turn 1: 70 damage → KO
└─ Total: 1 turn, 2 energy

ANALYSIS:
├─ Option A: Slower, more energy efficient
├─ Option B: Faster, same energy cost
└─ Recommendation: Use Option B when possible
```

### Opponent KO Prevention

**CALCULATING WHAT THEY NEED:**

**Their attack damage: 60**

```
Your Pokemon HP thresholds:

60 HP Pokemon:
├─ Without healing → 1 hit = KO
├─ With Potion → 1 hit = 30 HP, 2nd hit = KO
└─ Two turns of life with Potion

70 HP Pokemon:
├─ Without healing → 1 hit = 10 HP, 2nd hit = KO
├─ With Potion → 1 hit = 40 HP, 2nd hit = 10 HP, 3rd hit = KO
└─ Three turns of life with Potion

80 HP Pokemon:
├─ Without healing → 1 hit = 20 HP, 2nd hit = KO
├─ With Potion → 1 hit = 50 HP, 2nd hit = 20 HP, 3rd hit = KO
└─ Three turns of life with Potion

HEALING MATH:
├─ Potion heals 30 damage
├─ Effectively adds 30 HP
└─ Extends life by 30/opponent damage
```

**DEFENDING AGAINST EX:**

```
ex Pokemon worth 2 points

DEFENSE OPTIONS:
├─ Sabrina to force to bench
│  └─ Now worth only 1 point
│  └─ Force them to score differently
│
├─ Out-HP them
│  └─ If you have 150+ HP
│  └─ Takes multiple hits
│
├─ Kill them first
│  └─ Calculate exact KO sequence
│  └─ Get there first
│
├─ Prevent damage
│  └─ Retreat before they attack
│  └─ Sabrina switch to weak Pokemon
│
└─ Accept the point
   └─ If you can score 2 points elsewhere
```

---

## Professional-Level Micro-Decisions

### Card Timing Optimization

**PROFESSOR'S RESEARCH vs PROFESSOR OAK:**

**Turn 1 Decision:**

```
Your hand: 0 Pokemon, 3 supporters, 1 energy

PROFESSOR'S RESEARCH:
├─ Draw 2 cards
├─ 60% chance to find Pokemon
├─ Hand improves from 0 to 2 cards
├─ Can play Pokemon next turn
└─ GOOD PLAY

PROFESSOR OAK:
├─ Draw 3 cards
├─ 75% chance to find Pokemon
├─ Better odds, worse timing
├─ You discard 3 cards you can't use anyway
└─ ACCEPTABLE BUT RESEARCH IS BETTER

DECISION: Research improves odds 60% → Oak 75%
         But Research costs less (discard fewer cards)
         Choose Research
```

**Turn 3 Decision:**

```
Your hand: 5 cards, decent Pokemon, no good attackers

PROFESSOR'S RESEARCH:
├─ Draw 2 cards
├─ Add 2 new options
├─ Better chance of improvement
├─ Costs 2 discards
└─ Use if you have 2 bad cards

PROFESSOR OAK:
├─ Draw 3 cards
├─ Bigger power play
├─ Better at finding specific answers
├─ Costs 3 discards
└─ Use if you have 3+ bad cards

DECISION MATRIX:
├─ 2-3 bad cards → Research
├─ 4+ bad cards → Oak
├─ Need specific answer → Oak
├─ Just need more options → Research
```

### Hand Management Precision

**WHEN TO HOLD CARDS:**

**Holding Sabrina:**

```
HOLD SABBINA WHEN:
├─ Opponent has high-value target
│  ├─ ex Pokemon worth 2 points
│  ├─ Heavy evolution investment
│  └─ Pokemon with multiple energies
│
├─ You have threats in hand
│  ├─ Good Pokemon to counter-attack
│  ├─ Energy for attacks
│  └─ Don't need immediate disruption
│
├─ Opponent hasn't committed
│  ├─ They might switch voluntarily
│  ├─ Don't waste on bench target
│  └─ Save for their real threat
│

DON'T HOLD SABBINA WHEN:
├─ You're behind in points
│  └─ Need disruption now
│
├─ Opponent is committing hard
│  └─ They just evolved Stage 2
│  └─ Don't let them cash it in
│
├─ It's late game
│  └─ 5+ turns in, time is short
│  └─ Use it or lose it
│
└─ They have multiple threats
   └─ Disrupt the most important one
```

**Holding Energy:**

**Why you DON'T hold energy in hand:**

```
HAND ENERGY IS DEAD
├─ Can't use it until it's in play
├─ Takes up card slot
├─ Doesn't generate value sitting in hand
└─ You get energy from zone anyway

BETTER PLAY:
├─ Play energy when drawn
├─ Get it active on Pokemon
├─ Enables attacks immediately
└─ Card in hand is wasted card

EXCEPTION:
├─ No Pokemon to attach to
├─ Waiting to evolve
├─ Saving for future attacker
└─ Temporary hold is OK, not permanent
```

**Holding Supporters:**

**When NOT to use Professor's Research:**

```
DON'T USE RESEARCH IF:
├─ Hand already has 5+ good cards
│  └─ Can't improve much
│  └─ Don't waste the card
│
├─ You're ahead on board
│  └─ Don't give card advantage
│  └─ Maintain position
│
├─ Opponent has Oak in hand
│  └─ They might oak and refill
│  └─ You might be at disadvantage
│
└─ You're close to endgame
   └─ Cards are finite
   └─ Save for when you need them
```

### Evolution Timing Psychology

**EVOLVING ON CURSE vs EVOLVING AHEAD:**

**Evolving to Stage 2:**

```
EVOLVE ON CURSE (turn you need it):
├─ Opponent threatens KO next turn
├─ You have Rare Candy
├─ Stage 2 can attack immediately
└─ Need power NOW

EVOLVE AHEAD OF SCHEDULE:
├─ You have extra turns
├─ Energy already built up
├─ Opponent can't threaten you
└─ Get online faster for later pressure

PSYCHOLOGY:
├─ Evolving early → You look strong
├─ Opponent might over-commit
├─ Might use Sabrina too early
└─ Use as mind game
```

**Reacting to Opponent Evolution:**

**They evolve to Stage 2:**

```
YOUR OPTIONS:
├─ Attack before evolution
│  ├─ If you can KO Basic
│  └─ Don't let them evolve
│
├─ Use Sabrina after evolution
│  ├─ Waste their energy investment
│  ├─ They lose tempo
│  └─ Force them to start over
│
├─ Attack through evolution
│  ├─ Stage 2 is stronger
│  └─ Might be worth attacking anyway
│
├─ Retreat your Pokemon
│  ├─ If Stage 2 has weakness to you
│  └─ Avoid bad matchup
│
└─ Prepare counter-evolution
   ├─ If you have Stage 2 too
   └─ Battle of Stage 2s
```

### Bench Management

**BENCH SLOT ECONOMICS:**

**3-Bench Limit (Pokemon TCG Pocket):**

```
BENCH SLOTS ARE VALUABLE:
├─ Don't waste on weak Pokemon
├─ Bench cards you NEED later
├─ Don't bench energy (can't attack from bench)
└─ Each slot must pull weight

WHAT TO BENCH:
├─ Good attackers (ready to use)
├─ Evolution requirements (for later)
├─ Energy-accelerating Pokemon
├─ Backup plans
└─ Answer cards (specific matchups)

WHAT NOT TO BENCH:
├─ Weak Pokemon (will die immediately)
├─ Energy cards (dead in bench)
├─ Redundant copies (if you have better)
├─ Setup cards (Rare Candy used, etc.)
└─ Cards without clear purpose
```

**Bench Trap Prevention:**

**Opponent has Sabrina:**

```
DON'T BENCH:
├─ Your best Pokemon (vulnerable to Sabrina)
├─ Your only good attacker
├─ Pokemon with energy attached
├─ Evolution in progress
└─ High-value targets

SAFE BENCHING:
├─ Weak Pokemon (Sabrina makes them active)
├─ Pokemon without energy
├─ Pokemon you can afford to lose
├─ Backup plans
└─ Fodder for Sabrina

THE SABBINA THREAT:
├─ If they use Sabrina → Your bench becomes Active
├─ Make sure bench can survive
├─ Don't over-bench important Pokemon
└─ Force them to choose bad targets
```

### Resource Trading

**2-FOR-1 TRADES:**

**Using Giovanni + Sabrina:**

```
COST: 2 cards (Giovanni + Sabrina)
VALUE:
├─ Sabrina: Force opponent's Pokemon to bench
│        └─ If ex: Worth 2 points → Now worth 1
│
├─ Giovanni: +10 damage to any attack
└─ TOTAL: Often changes KO math

WHEN WORTH IT:
├─ Their Pokemon is ex (2 points)
├─ +10 damage enables KO
├─ You're behind and need swing
└─ Card advantage doesn't matter if you win

WHEN NOT WORTH IT:
├─ Their Pokemon is regular (1 point)
├─ +10 damage doesn't change anything
├─ You're ahead on cards
└─ Save cards for later value
```

**Using Professor Oak + Attack:**

```
COST: 2 cards (Oak + attack energy)
VALUE:
├─ Oak: Draw 3 new cards
├─ Find better Pokemon
├─ Find healing
├─ Find disruption
└─ Sometimes game-winning play

WHEN WORTH IT:
├─ Hand is terrible (no good cards)
├─ Opponent has board advantage
├─ You need specific cards now
├─ Late game, all cards matter
└─ You're desperate

WHEN NOT WORTH IT:
├─ Hand is good already
├─ You have tempo advantage
├─ Opponent is in worse spot
└─ Save Oak for when you truly need it
```

### Bluff and Information Control

**FALSE SABBINA TELL:**

**How to make them think you have Sabrina:**

```
BEHAVIORAL BLUFFS:
├─ Pause before obvious plays
├─ Look at their Active Pokemon
├─ Hover over Sabrina in hand
├─ Don't attack aggressively
├─ Play more conservatively
└─ Suggest you're waiting

LINE IN SAND:
├─ When they commit resources
├─ After they evolve Stage 2
├─ When they attach multiple energy
└─ Then you "use" Sabrina

WHEN BLUFF BREAKS:
├─ They play safely anyway
├─ You lose tempo waiting
├─ They use their own Sabrina first
└─ Bluff doesn't work

EFFECTIVENESS:
├─ High-level play: Works 40-50%
├─ Lower ranks: Works 60-70%
├─ After you use it once: Blocker up
└─ Use sparingly
```

**Professor Oak Bluff:**

**Making them think you DON'T have Oak:**

```
SIGNS OF NO OAK:
├─ Use Research instead of Oak
├─ Don't refill aggressively
├─ Play conservatively
├─ Seem low on options
└─ Don't threaten big plays

WHEN TO REVEAL:
├─ You actually need cards
├─ Your hand is dead
├─ You're behind on resources
└─ Late game requires power

CONTRAINDICATIONS:
├─ If you can win without using Oak
├─ If saving it for perfect moment
├─ If opponent thinks you have it
└─ INFORMATION IS WEAPON
```

---

## High-Level Psychology & Pressure

### Creating Optimal Pressure

**RESOURCE PRESSURE:**

```
MAKE OPPONENT FEEL THE SQUEEZE:

Card pressure:
├─ Track their hand size
├─ If they're at 0-2 cards → Press hard
├─ Force them to make plays
├─ Don't give them free turns
└─ Make every card count

Energy pressure:
├─ If they need specific energy → Deny it
├─ Make them guess your type
├─ Force inefficient attacks
└─ Make energy matter

Point pressure:
├─ Track points carefully
├─ If they need 1 point → Defend aggressively
├─ If you need 1 point → Attack decisively
├─ Never let them score easy points
└─ Force them to work for victory
```

**TEMPO PRESSURE:**

**Never giving free turns:**

```
THE FREE TURN RULE:
├─ If opponent doesn't attack → You failed
├─ Every turn should be threatening
├─ Force them to respond
├─ Don't give setup time
└─ Make tempo your weapon

HOW TO APPLY:
├─ Keep attacking
├─ Damage their Pokemon every turn
├─ Force them to heal
├─ Don't let them build
└─ Make them react to you
```

**Psychological Tells:**

**Recognizing opponent weakness:**

```
BEHAVIORAL SIGNS:
├─ Hesitation before plays
│  └─ They don't like their options
│
├─ Playing obvious lines only
│  └─ No creativity = poor hand
│
├─ Not using trainers
│  └─ Saving for emergency OR don't have good ones
│
├─ Attacking without KO potential
│  └─ Desperate for damage
│
├─ Playing multiple backup Pokemon
│  └─ Expecting their Active to die
│
├─ Hoarding energy
│  └─ Building for big turn
│
└─ Checking points frequently
   └─ Nervous about situation
```

### Managing Your Tells

**CONFIDENCE BODY LANGUAGE:**

**Playing strong:**

```
YOUR BEHAVIOR:
├─ Play quickly (you know your lines)
├─ Don't overthink obvious plays
├─ Take your time on hard decisions
├─ Have backup plans ready
└─ Act like you're in control

VOICE/MOOD:
├─ Don't celebrate early
├─ Stay focused
├─ Don't show frustration
├─ Act like you expected good draws
└─ Professional composure

WHAT NOT TO DO:
├─ Don't celebrate small advantages
├─ Don't show disappointment
├─ Don't rush through easy decisions
├─ Don't telegraph your hand
└─ Don't give free information
```

**Playing weak (strategic):**

```
WHEN TO ACT WEAK:
├─ You want them to overcommit
├─ You want them to waste resources
├─ You're actually strong but hiding it
└─ Mind game technique

YOUR BEHAVIOR:
├─ Pause before obvious plays
├─ Look concerned
├─ Check your hand repeatedly
├─ Seem uncertain
└─ Make them think you need help

DANGER:
├─ If they call your bluff
├─ If you actually ARE weak
├─ If they play better because of it
└─ Use sparingly
```

### Advanced Mind Games

**The Information Game:**

**What to reveal:**

```
SAFE INFORMATION:
├─ You have energy (obvious from attacking)
├─ You have basic cards (playing them)
├─ You're committed to strategy
└─ You can attack

DANGEROUS INFORMATION:
├─ You have Sabrina (use it or hide it)
├─ You have Professor Oak (big power play)
├─ You have healing (extends games)
├─ You're low on cards (desperate)
└─ You need specific cards (what you're searching for)

STRATEGIC REVEALS:
├─ Sometimes show strength to force mistakes
├─ Sometimes show weakness to bait plays
├─ Usually hide disruption (Sabrina)
├─ Usually hide power plays (Oak)
└─ Information is advantage
```

**The Commitment Trap:**

**Making them overcommit:**

```
THE TRAP:
├─ Act like you have Sabrina
├─ They play safely
├─ You actually play your real hand
├─ They're disadvantaged from playing safe
└─ You win through position

WHEN IT WORKS:
├─ Against cautious players
├─ When you actually DO have disruption
├─ If you can sustain the bluff
└─ In important games

WHEN IT FAILS:
├─ If they call your bluff
├─ If they have better position anyway
├─ If you can't back up the threat
└─ Against aggressive players
```

### Tournament-Level Decisions

**Time Pressure Play:**

**With limited time on turn:**

```
FAST PLAY DECISIONS:
├─ Default to obvious lines
├─ Don't overthink
├─ Use time on complex decisions only
├─ Trust your instincts
└─ Make plays confidently

SLOW PLAY DECISIONS:
├─ Professor Oak timing
├─ Whether to use Sabrina now or later
├─ KO math calculations
├─ Energy allocation decisions
├─ Bench vs Active decisions
└─ When to heal vs attack

TIME MANAGEMENT:
├─ Don't burn time on obvious plays
├─ Spend time on swing decisions
├─ If you're behind → Use time to find answers
├─ If you're ahead → Play fast, don't give time
└─ Respect shot clock
```

**Game State Assessment:**

**Quick evaluation checklist:**

```
EVERY TURN:
├─ Point differential (who is ahead?)
├─ Board control (who has better position?)
├─ Hand quality (who has more options?)
├─ Energy situation (who has better attacks?)
├─ Opponent disruption (what do they have?)
└─ Your outs (what can you draw?)

KEY DECISIONS:
├─ Am I winning? → Maintain advantage
├─ Am I losing? → Find power plays
├─ Is it even? → Play for card advantage
├─ Am I ahead on cards? → Press advantage
├─ Am I behind on cards? → Oak immediately
└─ Can I win this turn? → Calculate and execute
```

### Perfect Play Scenarios

**Optimal lines in common situations:**

**Situation: Both players at 2 points**

```
YOU MUST WIN THIS TURN

Option 1: Direct attack
├─ Calculate exact KO damage
├─ Use Giovanni if needed
├─ Attack for exact damage
└─ Win

Option 2: Sabrina + attack
├─ If they have ex → Sabrina to bench
├─ If they have weak Pokemon → Attack it
├─ Net result: You get 1 point
└─ They get 0 points → You win

Option 3: Double attack
├─ If you have 2 attackers ready
├─ Attack both threats
├─ Get 2 points in one turn
└─ WIN BIG

DECISION TREE:
├─ Can you KO their Active? → YES → Do it
├─ If NO → Do you have Sabrina? → YES → Use it
├─ If NO → Do you have 2 attackers? → YES → Use both
├─ If NO → Can you defend? → NO → You're losing
└─ If YES → Defend and hope they miss
```

**Situation: You're behind 0-2**

```
COMEBACK MODE - ALL IN

Your turn 1:
├─ Professor Oak immediately
├─ Draw 3 new cards
├─ Find your best Pokemon
├─ Find your best supporters
└─ Commit to comeback

Your turn 2:
├─ Play best Pokemon
├─ Heal if you can
├─ Start attacking
├─ Don't waste any cards
└─ Every card must count

Your turn 3:
├─ Continue pressure
├─ Calculate if you can get 2 points
├─ If YES → Attack both targets
├─ If NO → Find alternative line
└─ No room for error

COMEBACK REQUIREMENTS:
├─ Must score 2 points in 2-3 turns
├─ Every draw must be perfect
├─ No wasted cards
└─ Opponent must miss some opportunities
```

---

## Conclusion: Mastering Competitive Play

### Key Principles Summary

**THE ULTIMATE DECISION FRAMEWORK:**

1. **Calculate exact KO math before every attack**
   - 50 damage with Giovanni = 60 total
   - Weakness adds 30, resistance subtracts 30
   - Don't waste damage

2. **Tempo vs. Race decision on turn 2**
   - Can you survive their attacks? → Tempo
   - Can you out-speed them? → Race
   - Commit to strategy

3. **Professor Oak timing**
   - When behind: Use immediately
   - When ahead: Save for perfect moment
   - When desperate: Use without hesitation

4. **Sabrina usage**
   - ex Pokemon always worth it (2 points → 1 point)
   - Save for their best threat
   - Don't waste on weak targets

5. **Energy zone mastery**
   - Mono-type = 100% consistency
   - 2-type = 50% consistency
   - 3-type = 33% consistency (don't do this)

6. **Endgame calculation**
   - Track exact points needed
   - Calculate exact damage required
   - Plan 2-3 turns ahead
   - Don't leave it to chance

7. **Information management**
   - Track opponent's resources
   - Predict their draws
   - Hide your disruption
   - Apply pressure constantly

8. **Resource efficiency**
   - Don't waste cards
   - Don't heal dead Pokemon
   - Don't attack without purpose
   - Every card must count

### The Professional Mindset

**ADAPTING TO OPPONENTS:**

- Read their behavior and tells
- Adjust your pace to their comfort zone
- Apply pressure where they're weakest
- Don't let them play their optimal game

**MANAGING VARIANCE:**

- Energy zone luck happens
- Focus on decisions, not results
- Play for high-probability lines
- Minimize variance with mono-type decks

**THE 20-CARD ECONOMY:**

- Every card is precious
- No dead cards in your deck
- Multi-purpose cards are premium
- Cut situational tech

**TEMPO IS KING:**

- Never give free turns
- Attack every turn if possible
- Force opponent to react
- Convert small advantages into wins

### Perfect Practice

**TO MASTERY:**

1. Calculate KO math in every game
2. Practice decision trees until automatic
3. Review your games for mistakes
4. Learn from better players
5. Adapt to the metagame

**CONFIDENCE:**

- Know your lines
- Play with conviction
- Trust your reads
- Don't second-guess good decisions

**CONSISTENCY:**

- Same decisions in same situations
- No tilt after bad luck
- Professional composure
- Every game is new

**THE COMPETITIVE EDGE:**

- Most players make 3-5 mistakes per game
- Pros make 0-1 mistakes per game
- Master these concepts and you'll be in top 1%
- Perfect the micro-decisions

---

_This guide represents the highest level of Pokemon TCG Pocket competitive play. Master these concepts through deliberate practice, and you'll dominate at the ultra-competitive level._
