---
name: mcp:tools
description: Reference for all 8 PokeClaude MCP tools
---

# MCP Tools Reference

The Pokemon Pocket MCP server provides 8 tools for querying card data.

## Tool Summary

| Tool           | Purpose                 | Key Parameters                  |
| -------------- | ----------------------- | ------------------------------- |
| search_cards   | Search with filters     | name, type, hp, set, uniqueOnly |
| get_card       | Get specific card       | name (exact match)              |
| find_synergies | Find compatible cards   | cardName                        |
| find_counters  | Find counter strategies | targetType                      |
| get_type_stats | Type statistics         | none                            |
| query_cards    | Custom SQL              | sql (SELECT only)               |
| list_trainers  | List trainer cards      | limit                           |
| analyze_deck   | Deck analysis           | cardNames array                 |

## Quick Examples

### Search Cards

```
Find Lightning Pokemon with HP >= 100
Search for Fire type cards with at least 120 HP
List all cards from set A1
```

### Get Card

```
Get details for Pikachu ex
Show me Mewtwo ex
```

### Find Synergies

```
What works with Pikachu ex?
Find synergies for Charizard ex
```

### Find Counters

```
What counters Psychic types?
Beat Lightning decks
```

### Type Stats

```
Show type statistics
Average HP by type
```

### Custom SQL

```
SELECT name, hp FROM cards WHERE type = 'Fire' ORDER BY hp DESC
Count cards by rarity
```

### List Trainers

```
List all trainer cards
Show me supporter cards
```

### Analyze Deck

```
Analyze deck: Pikachu ex, Zapdos ex, Raichu, ...
```

## Field Presets

Tools support field selection to control response size:

- **minimal**: id, name only (smallest)
- **basic**: id, name, type, hp, attacks, weakness, retreat, rarity (default)
- **full**: All fields including images, URLs (3-4x tokens)

## Full Reference

See `docs/02-tools-reference.md` for complete API documentation.
