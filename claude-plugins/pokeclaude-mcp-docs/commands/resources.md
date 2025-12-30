---
name: mcp:resources
description: Reference for PokeClaude MCP resources (card databases)
---

# MCP Resources Reference

The Pokemon Pocket MCP server provides 3 resources for accessing card data.

## Available Resources

| Resource URI             | Description       | Card Count  |
| ------------------------ | ----------------- | ----------- |
| `pokemon://cards/all`    | Full database     | 2,077 cards |
| `pokemon://cards/unique` | Unique cards only | 1,068 cards |
| `pokemon://stats/types`  | Type statistics   | 12 types    |

## Resource Details

### pokemon://cards/all

**Purpose**: Access the complete card database including all art variants.

**Returns**: All 2,077 cards with full details.

**Use when**: You need comprehensive data or are doing analysis that requires art variants.

**Example**:

```
Access pokemon://cards/all to see the complete database
```

### pokemon://cards/unique

**Purpose**: Access unique cards only (art variants removed).

**Returns**: 1,068 unique cards.

**Duplicate filtering**: Cards are considered duplicates if they share:

- name
- type
- hp
- attacks
- weakness
- retreat_cost

**Use when**: You want to search for cards without seeing duplicate art variants.

**Example**:

```
Query pokemon://cards/unique for deck building
```

### pokemon://stats/types

**Purpose**: Statistical breakdown by Pokemon type.

**Returns**: Type distribution including:

- Card count per type
- Average HP
- Average retreat cost

**Use when**: Understanding type balance and statistics.

**Example**:

```
Get pokemon://stats/types to see which types have the most cards
```

## Usage in Claude Desktop

Resources are automatically available when the MCP server is connected. Access them through:

1. **Direct query**: "Show me pokemon://cards/all"
2. **Tools**: Tools use these resources internally
3. **Analysis**: Automatic for relevant queries

## Full Reference

See `docs/03-resources-reference.md` for complete resource documentation.
