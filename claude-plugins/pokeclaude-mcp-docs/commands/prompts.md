---
name: mcp:prompts
description: Reference for PokeClaude MCP prompts (AI guidance)
---

# MCP Prompts Reference

The Pokemon Pocket MCP server provides 3 AI prompts for common tasks.

## Available Prompts

| Prompt        | Purpose                    | Key Input          |
| ------------- | -------------------------- | ------------------ |
| build-deck    | Build a deck around a card | mainCard, strategy |
| counter-deck  | Build a counter to a type  | targetType, sets   |
| optimize-deck | Optimize an existing deck  | deckList           |

## Prompt Details

### build-deck

**Purpose**: Generate a Pokemon TCG Pocket deck centered around a specific card.

**Parameters**:

- `mainCard` (required): Pokemon to build around
- `strategy` (optional): aggro, control, or midrange

**Output**: Complete 20-card deck with strategy explanation.

**Example**:

```
Use the build-deck prompt to create a deck around Pikachu ex
```

**What it provides**:

- 20-card deck list
- Energy analysis
- Win conditions
- Counter strategies

### counter-deck

**Purpose**: Build a deck that counters a specific type or strategy.

**Parameters**:

- `targetType` (required): Type or strategy to counter
- `sets` (optional): Available sets to use

**Output**: Counter deck with matchup explanation.

**Example**:

```
Use the counter-deck prompt to beat Lightning decks
```

**What it provides**:

- Type exploitation strategy
- Counter Pokemon selections
- Expected win rate
- How to play the matchup

### optimize-deck

**Purpose**: Analyze and improve an existing deck.

**Parameters**:

- `deckList` (required): Current deck (comma-separated)

**Output**: Analysis with specific improvements.

**Example**:

```
Use the optimize-deck prompt on my deck: [list]
```

**What it provides**:

- Rules compliance check
- Weakness identification
- Card swap suggestions
- Energy curve improvements

## Using Prompts

Prompts guide AI responses for specific tasks. The AI automatically:

1. Understands Pokemon TCG Pocket rules
2. Validates deck composition
3. Considers energy zone mechanics
4. Checks for competitive viability

## Full Reference

See `docs/04-prompts-reference.md` for complete prompt documentation.
