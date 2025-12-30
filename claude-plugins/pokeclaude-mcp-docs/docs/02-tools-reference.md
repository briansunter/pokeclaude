# Tools Reference

Complete reference for all 8 Pokemon Pocket MCP tools.

## Tool List

| Tool           | Purpose                 | Parameters                                                                |
| -------------- | ----------------------- | ------------------------------------------------------------------------- |
| search_cards   | Search with filters     | name, type, hp, set, hasAttacks, retreatCost, weakness, limit, uniqueOnly |
| get_card       | Get specific card       | name (exact match)                                                        |
| find_synergies | Find compatible cards   | cardName                                                                  |
| find_counters  | Find counter strategies | targetType                                                                |
| get_type_stats | Type statistics         | none                                                                      |
| query_cards    | Custom SQL              | sql (SELECT only)                                                         |
| list_trainers  | List trainer cards      | limit                                                                     |
| analyze_deck   | Deck analysis           | cardNames array                                                           |

---

## Tool 1: search_cards

Search for Pokemon cards with flexible filters.

### Parameters

| Parameter   | Type    | Description                       |
| ----------- | ------- | --------------------------------- |
| name        | string  | Card name (partial match)         |
| type        | string  | Pokemon type (Fire, Water, etc.)  |
| minHp       | number  | Minimum HP                        |
| maxHp       | number  | Maximum HP                        |
| set         | string  | Set code (A1, A2, A3, etc.)       |
| hasAttacks  | boolean | Filter by attacks presence        |
| retreatCost | number  | Retreat cost (0-4)                |
| weakness    | string  | Weakness type                     |
| limit       | number  | Max results (default 50)          |
| uniqueOnly  | boolean | Filter duplicates (default true)  |
| fields      | string  | Field preset (minimal/basic/full) |

### Examples

```
Search for Lightning Pokemon with HP >= 100
Find all Fire type cards from set A1
List cards with retreat cost 0
Search for cards weak to Fighting
```

### Return Format

```json
[
  {
    "id": "uuid",
    "name": "Pikachu ex",
    "type": "Lightning",
    "hp": "120",
    "attacks": "...",
    "weakness": "Fighting",
    "retreat_cost": "2",
    "rarity": "Rare Rainbow"
  }
]
```

---

## Tool 2: get_card

Get detailed information about a specific card.

### Parameters

| Parameter | Type              | Description                       |
| --------- | ----------------- | --------------------------------- |
| name      | string (required) | Exact card name                   |
| fields    | string            | Field preset (minimal/basic/full) |

### Examples

```
Get card details for Pikachu ex
Show me Mewtwo ex
```

### Return Format

Complete card object with all fields.

---

## Tool 3: find_synergies

Find cards that work well together.

### Parameters

| Parameter | Type              | Description                     |
| --------- | ----------------- | ------------------------------- |
| cardName  | string (required) | Main card to find synergies for |
| fields    | string            | Field preset                    |

### Returns

1. **Card details** for the main card
2. **Same-type Pokemon** (10 cards) with complementary roles
3. **Trainer cards** (10 cards) that support the strategy

### Examples

```
What works with Pikachu ex?
Find synergies for Charizard ex
```

---

## Tool 4: find_counters

Find cards that counter a specific type or strategy.

### Parameters

| Parameter  | Type              | Description     |
| ---------- | ----------------- | --------------- |
| targetType | string (required) | Type to counter |
| fields     | string            | Field preset    |

### Returns

Pokemon that exploit the target's weakness, with:

- Type advantage explanation
- Win probability estimates
- Strategic recommendations

### Examples

```
What counters Psychic types?
Beat Lightning decks
Counter to Fighting
```

---

## Tool 5: get_type_stats

Statistical breakdown by Pokemon type.

### Parameters

None

### Returns

For each Pokemon type:

- Card count
- Average HP
- Average retreat cost

### Examples

```
Show type statistics
Which type has the most cards?
What's the average HP for Fire types?
```

---

## Tool 6: query_cards

Run custom SQL queries against the card database.

### Parameters

| Parameter | Type              | Description       |
| --------- | ----------------- | ----------------- |
| sql       | string (required) | SELECT query only |
| fields    | string            | Field preset      |

### Restrictions

- Only SELECT queries allowed
- No modifications to database
- Queries must be valid SQL

### Examples

```
SELECT name, hp FROM cards WHERE type = 'Fire' ORDER BY hp DESC
SELECT type, COUNT(*) FROM cards GROUP BY type
```

See `/mcp:sql` or `docs/06-sql-query-guide.md` for SQL guide.

---

## Tool 7: list_trainers

List all Trainer and Item cards.

### Parameters

| Parameter | Type   | Description              |
| --------- | ------ | ------------------------ |
| limit     | number | Max results (default 50) |
| fields    | string | Field preset             |

### Returns

187 trainer/item cards including:

- Supporters (Professor's Research, Giovanni, etc.)
- Items (Poké Ball, Potion, etc.)
- Stadiums

### Examples

```
List all trainer cards
Show me supporter cards
What items are available?
```

---

## Tool 8: analyze_deck

Analyze deck composition and validate rules.

### Parameters

| Parameter | Type                    | Description                |
| --------- | ----------------------- | -------------------------- |
| cardNames | string array (required) | List of card names in deck |

### Returns

- Deck size check (must be 20)
- Energy type count (1-2 recommended)
- Basic Pokemon count (5-6 recommended)
- Pokemon vs Trainer ratio
- Weaknesses and warnings
- Rules compliance

### Examples

```
Analyze deck: Pikachu ex, Zapdos ex, Raichu, ...
Check if my deck is valid
```

---

## Field Presets

All tools support field selection:

| Preset  | Fields                                                 | Token Usage |
| ------- | ------------------------------------------------------ | ----------- |
| minimal | id, name                                               | Lowest      |
| basic   | id, name, type, hp, attacks, weakness, retreat, rarity | Default     |
| full    | All 22 fields including images, URLs                   | 3-4x higher |

Use `basic` for most queries to save tokens!

## See Also

- `docs/03-resources-reference.md` - MCP resources
- `docs/04-prompts-reference.md` - MCP prompts
- `docs/06-sql-query-guide.md` - SQL queries
