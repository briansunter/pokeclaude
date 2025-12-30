# API Examples

Practical examples of using the Pokemon Pocket MCP server API.

## Basic Query Patterns

### Search by Type

```
Find all Lightning Pokemon
Search for Fire type cards with HP >= 120
```

**MCP Calls:**

- `search_cards` with type filter

### Search by Name

```
Find cards with Pikachu in the name
Search for Mewtwo
```

**MCP Calls:**

- `search_cards` with name filter (partial match)
- `get_card` with exact name

### Search by Stats

```
Find Pokemon with 150 HP or more
Cards with retreat cost 0
```

**MCP Calls:**

- `search_cards` with hp or retreatCost filters

---

## Combination Queries

### Type + HP Filter

```
Find Water Pokemon with at least 130 HP
```

**MCP Call:**

```json
{
  "tool": "search_cards",
  "params": {
    "type": "Water",
    "minHp": 130
  }
}
```

### Set + Rarity

```
List all rare cards from set A1
```

**MCP Call:**

```json
{
  "tool": "search_cards",
  "params": {
    "set": "A1",
    "rarity": "Rare"
  }
}
```

### Weakness Search

```
Find cards weak to Fighting
```

**MCP Call:**

```json
{
  "tool": "search_cards",
  "params": {
    "weakness": "Fighting"
  }
}
```

---

## Synergy Finding

### Core Pokemon + Support

```
What works with Charizard ex?
```

**MCP Call:**

```json
{
  "tool": "find_synergies",
  "params": {
    "cardName": "Charizard ex"
  }
}
```

**Returns:**

1. Charizard ex details
2. Same-type Fire Pokemon (10 cards)
3. Support Trainers (10 cards)

### Multi-Step Synergy

```
Build a deck around Pikachu ex, then find its counters
```

**MCP Calls:**

1. `find_synergies` for Pikachu ex
2. `find_counters` with type = Lightning

---

## Counter Strategy

### Type-Based Counters

```
What beats Psychic types?
```

**MCP Call:**

```json
{
  "tool": "find_counters",
  "params": {
    "targetType": "Psychic"
  }
}
```

### Pokemon-Specific Counters

```
Counter to Pikachu ex
```

First gets Pikachu ex's type (Lightning), then finds counters.

---

## Deck Analysis

### Complete Deck Check

```
Analyze this deck:
2x Pikachu ex, 2x Zapdos ex, 2x Raichu,
2x Professor's Research, 2x Giovanni, 1x Sabrina,
2x Electabuzz, 2x Magneton, 2x Jolteon, 2x Eevee,
1x Potion, 1x Poké Ball
```

**MCP Call:**

```json
{
  "tool": "analyze_deck",
  "params": {
    "cardNames": ["Pikachu ex", "Pikachu ex", "Zapdos ex", ...]
  }
}
```

**Returns:**

- Deck size: 20 ✓
- Energy types: 1 (Lightning) ✓
- Basics: 6 ✓
- Pokemon: 14, Trainers: 6 ✓
- Warnings: None

---

## Advanced Workflows

### Complete Deck Building Session

**Step 1: Meta Check**

```
What's the current meta?
```

→ Use get_type_stats or knowledge

**Step 2: Build Deck**

```
Use build-deck prompt for a competitive deck
```

**Step 3: Analyze**

```
Analyze the deck for weaknesses
```

→ Use analyze_deck

**Step 4: Counter Check**

```
What counters this deck?
```

→ Use find_counters

### Tournament Prep

```
Show me type statistics
```

→ Understand meta distribution

```
Build a deck for the most common type
```

→ Use build-deck

```
What counters that deck?
```

→ Use find_counters (prepare side options)

---

## SQL Query Examples

### High Damage Attackers

```
Use query_cards with:
SELECT name, type, attacks FROM cards
WHERE attacks LIKE '%90%'
ORDER BY hp DESC
```

### Complete Type Overview

```
Use query_cards with:
SELECT type,
       COUNT(*) as count,
       AVG(CAST(hp AS INTEGER)) as avg_hp
FROM cards
WHERE type IS NOT NULL
GROUP BY type
ORDER BY count DESC
```

### Find Trainers

```
Use query_cards with:
SELECT name, attacks
FROM cards
WHERE type IS NULL
ORDER BY name
```

---

## Error Handling

### Invalid Card Name

```
Get card for XYZ123
```

**Returns:** Error "Card not found"

**Recovery:**

```
Search for cards with XYZ in the name
```

### SQL Errors

```
Use query_cards with: DELETE FROM cards
```

**Returns:** Error "Only SELECT queries allowed"

### Invalid Deck List

```
Analyze deck with 25 cards
```

**Returns:** Warning "Deck must be exactly 20 cards"

---

## Response Format

### Successful Response

```json
{
  "content": [
    {
      "type": "text",
      "text": "[JSON or text data]"
    }
  ]
}
```

### Error Response

```json
{
  "content": [
    {
      "type": "text",
      "text": "Error message"
    }
  ],
  "isError": true
}
```

---

## Token Optimization

### Use Field Presets

**Minimal (for listings):**

```
Find Lightning Pokemon with fields=minimal
```

→ Returns only id, name

**Basic (default, good for most queries):**

```
Find Pikachu ex with fields=basic
```

→ Returns game data without images

**Full (only when needed):**

```
Get Charizard ex with fields=full
```

→ Returns everything including images

### Avoid Unnecessary Data

**Bad:**

```
Get all 2000+ cards
```

**Good:**

```
Search for Lightning cards with limit=20
```

---

## See Also

- `docs/02-tools-reference.md` - Complete tool documentation
- `docs/06-sql-query-guide.md` - SQL query guide
