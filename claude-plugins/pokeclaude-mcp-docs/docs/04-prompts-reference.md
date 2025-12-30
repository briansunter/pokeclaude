# Prompts Reference

Complete reference for all 3 Pokemon Pocket MCP prompts.

## Prompt Overview

| Prompt        | Purpose                  | Key Parameters     |
| ------------- | ------------------------ | ------------------ |
| build-deck    | Build deck around a card | mainCard, strategy |
| counter-deck  | Counter a type/strategy  | targetType, sets   |
| optimize-deck | Improve existing deck    | deckList           |

---

## Prompt: build-deck

### Purpose

Generate a competitive Pokemon TCG Pocket deck centered around a specific card.

### Parameters

| Parameter | Type   | Required | Description                 |
| --------- | ------ | -------- | --------------------------- |
| mainCard  | string | Yes      | Pokemon to build around     |
| strategy  | string | No       | aggro, control, or midrange |

### What It Does

1. Searches for the main card
2. Finds synergistic cards
3. Calculates energy needs
4. Validates 20-card format
5. Provides complete deck list

### Returns

- **20-card deck list** with exact counts
- **Strategy explanation** (how to win)
- **Energy analysis** (type distribution, curve)
- **Validation** (format compliance)
- **Counter-strategies** (what beats this deck)

### Usage

```
Use the build-deck prompt to create a deck around Pikachu ex
```

Or with strategy:

```
Use build-deck for Mewtwo ex with control strategy
```

### Game Rules Applied

The prompt ensures decks follow Pokemon TCG Pocket rules:

- Exactly 20 cards
- Max 2 copies per card
- 1-2 energy types (for Energy Zone consistency)
- 5-6 basic Pokemon (for consistent starts)
- 0 energy cards (Energy Zone provides them)

---

## Prompt: counter-deck

### Purpose

Build a deck that counters a specific type or archetype.

### Parameters

| Parameter  | Type   | Required | Description                      |
| ---------- | ------ | -------- | -------------------------------- |
| targetType | string | Yes      | Type or strategy to counter      |
| sets       | string | No       | Available sets (comma-separated) |

### What It Does

1. Identifies the target's weakness
2. Finds Pokemon that exploit it
3. Selects disruptive trainers
4. Builds complete counter-deck
5. Explains the matchup

### Returns

- **20-card counter-deck list**
- **Type advantage explanation**
- **Win probability estimate**
- **How to play the matchup**
- **Expected game plan**

### Usage

```
Use the counter-deck prompt to beat Lightning decks
```

Or specific Pokemon:

```
Use counter-deck for Pikachu ex
```

### Type Weakness Exploitation

The prompt uses the weakness system:

- **2x damage** when hitting weaknesses
- Focuses on types that counter the target
- Considers energy efficiency
- Accounts for retreat and disruption

---

## Prompt: optimize-deck

### Purpose

Analyze and improve an existing Pokemon TCG Pocket deck.

### Parameters

| Parameter | Type   | Required | Description                |
| --------- | ------ | -------- | -------------------------- |
| deckList  | string | Yes      | Comma-separated card names |

### What It Does

1. Validates format compliance
2. Analyzes composition
3. Identifies weaknesses
4. Suggests specific card swaps
5. Optimizes energy curve

### Returns

- **Rules compliance check**
- **Composition analysis** (types, energy curve, basics)
- **Identified issues** (what's wrong)
- **Specific improvements** (what to add/remove)
- **Final optimized list**

### Usage

```
Use the optimize-deck prompt on: Pikachu ex, Zapdos ex, Raichu, ...
```

### Checks Performed

**Critical Errors:**

- Deck must be exactly 20 cards
- Max 2 copies per card
- At least 5 basic Pokemon

**Warnings:**

- 3+ energy types (inconsistent)
- Too few basics (<5)
- Wrong Pokemon/Trainer ratio
- Poor energy curve

### Optimization Suggestions

The prompt suggests:

- **Additions**: Cards that fix weaknesses
- **Removals**: Cards that cause problems
- **Swaps**: Better alternatives
- **Tech cards**: Specific answers

---

## Prompt Comparison

| Aspect   | build-deck  | counter-deck  | optimize-deck |
| -------- | ----------- | ------------- | ------------- |
| Input    | Single card | Type/strategy | Deck list     |
| Output   | New deck    | Counter deck  | Improved deck |
| Focus    | Synergies   | Weaknesses    | Optimization  |
| Best For | New decks   | Bad matchups  | Fixing issues |

---

## Using Prompts Effectively

### Starting from Scratch

```
Use build-deck for Charizard ex
```

→ Get a complete deck

### Fixing a Bad Matchup

```
Use counter-deck for the deck that beats me
```

→ Get a counter strategy

### Improving Your Deck

```
Use optimize-deck on my current deck list
```

→ Get specific improvements

---

## Prompt Context

All prompts are aware of:

**Pokemon TCG Pocket Rules:**

- 20-card format
- Energy Zone (1 energy/turn)
- 3-point win (ex = 2 pts)
- 3 bench slots

**Database Contents:**

- 2,077 total cards
- 1,068 unique cards
- All current sets

**Competitive Meta:**

- Tier rankings
- Usage statistics
- Win rates

This ensures prompts provide relevant, competitive advice.

---

## See Also

- `docs/02-tools-reference.md` - Tools for interacting with cards
- `docs/03-resources-reference.md` - Card databases
- `docs/06-meta-analysis-guide.md` (CLI docs) - Meta understanding
