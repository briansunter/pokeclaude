# Resources Reference

Complete reference for all 3 Pokemon Pocket MCP resources.

## Resource Overview

| Resource      | URI                      | Description                  | Cards    |
| ------------- | ------------------------ | ---------------------------- | -------- |
| Full Database | `pokemon://cards/all`    | All cards including variants | 2,077    |
| Unique Cards  | `pokemon://cards/unique` | Unique cards only            | 1,068    |
| Type Stats    | `pokemon://stats/types`  | Type statistics              | 12 types |

---

## Resource: pokemon://cards/all

### Purpose

Access the complete Pokemon Pocket card database including all art variants.

### What It Returns

All 2,077 cards with full details:

- Basic fields (name, type, HP, attacks)
- Set information (set_code, set_name, card_number)
- Images (image_url, card_url)
- Evolution metadata
- Rarity and abilities

### Use When

- You need comprehensive data
- Analyzing art variants
- Complete database export
- Research requiring all versions

### Access Methods

**Direct reference:**

```
Access pokemon://cards/all to get the complete database
```

**Tool access:** Tools use this resource internally when needed.

### Example Output

```json
[
  {
    "id": "uuid",
    "name": "Pikachu ex",
    "set_code": "A1",
    "set_name": "Genetic Apex",
    "card_number": "008",
    "image_url": "https://...",
    "card_url": "https://pocket.limitlesstcg.com/...",
    ...
  },
  ...
]
```

---

## Resource: pokemon://cards/unique

### Purpose

Access unique cards only, with art variants removed.

### What It Returns

1,068 unique cards after deduplication.

### Duplicate Filtering

Cards are considered duplicates if they share:

- name
- type
- hp
- attacks
- weakness
- retreat_cost

**Examples:**

- Pikachu ex (Circle Circuit) × 7 versions = **1 unique card**
- Pikachu with different attacks = **7 unique cards**

### Use When

- Building decks (don't need art variants)
- Searching for cards
- Strategic analysis
- General queries

### Access Methods

```
Query pokemon://cards/unique for deck building
```

### Example Output

```json
[
  {
    "id": "uuid",
    "name": "Pikachu ex",
    "type": "Lightning",
    "hp": "120",
    "attacks": "Circle Circuit: 90 damage",
    "weakness": "Fighting",
    "retreat_cost": "2"
  },
  ...
]
```

---

## Resource: pokemon://stats/types

### Purpose

Statistical breakdown of Pokemon types in the database.

### What It Returns

For each Pokemon type:

- **count**: Number of cards of that type
- **avg_hp**: Average HP for that type
- **avg_retreat_cost**: Average retreat cost

### Use When

- Understanding type balance
- Comparing type stats
- Meta analysis
- Deck type selection

### Example Output

```json
[
  {
    "type": "Lightning",
    "count": 156,
    "avg_hp": 82.3,
    "avg_retreat_cost": 1.2
  },
  {
    "type": "Fire",
    "count": 142,
    "avg_hp": 95.1,
    "avg_retreat_cost": 1.5
  },
  ...
]
```

---

## Resource Access Patterns

### In Conversation

Resources are automatically available. Just ask:

```
Show me pokemon://cards/all
Get pokemon://stats/types
Query pokemon://cards/unique for Fire types
```

### Via Tools

Tools access resources internally:

- `search_cards` uses unique cards by default
- `get_type_stats` returns type statistics
- `get_card` can return any card

### Direct Access

For power users, reference the URI directly in queries.

---

## Performance Notes

| Resource | Load Time  | Token Usage         |
| -------- | ---------- | ------------------- |
| all      | ~2 seconds | High (2000+ cards)  |
| unique   | ~1 second  | Medium (1000 cards) |
| stats    | <1 second  | Low (12 types)      |

**Tip:** Use `unique` for most queries to save tokens!

---

## See Also

- `docs/02-tools-reference.md` - Tools that use these resources
- `docs/09-database-schema.md` - Complete schema
