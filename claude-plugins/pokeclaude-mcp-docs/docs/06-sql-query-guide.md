# SQL Query Guide

Advanced SQL querying for the Pokemon Pocket MCP server.

## Basic SQL Syntax

### SELECT Basics

```sql
SELECT * FROM cards
SELECT name, type, hp FROM cards
SELECT DISTINCT type FROM cards
```

### WHERE Clauses

```sql
SELECT * FROM cards WHERE type = 'Fire'
SELECT * FROM cards WHERE CAST(hp AS INTEGER) >= 120
SELECT * FROM cards WHERE name LIKE '%Pikachu%'
```

### ORDER BY

```sql
SELECT * FROM cards ORDER BY hp DESC
SELECT name, type FROM cards ORDER BY type, name
```

### LIMIT

```sql
SELECT * FROM cards LIMIT 10
SELECT * FROM cards ORDER BY hp DESC LIMIT 5
```

---

## Common Query Patterns

### High HP Pokemon

```sql
SELECT name, type, hp
FROM cards
WHERE CAST(hp AS INTEGER) >= 130
ORDER BY CAST(hp AS INTEGER) DESC
```

### Type Statistics

```sql
SELECT type,
       COUNT(*) as count,
       AVG(CAST(hp AS INTEGER)) as avg_hp,
       AVG(CAST(retreat_cost AS INTEGER)) as avg_retreat
FROM cards
WHERE type IS NOT NULL
GROUP BY type
ORDER BY count DESC
```

### Find Trainers

```sql
SELECT name, attacks
FROM cards
WHERE type IS NULL
  AND name NOT LIKE '%Energy%'
ORDER BY name
```

### Search by Attack Damage

```sql
SELECT name, type, attacks
FROM cards
WHERE attacks LIKE '%90%'
   OR attacks LIKE '%100%'
ORDER BY name
```

### Cards by Set

```sql
SELECT set_name, COUNT(*) as card_count
FROM cards
GROUP BY set_name
ORDER BY card_count DESC
```

### Unique Cards (No Art Variants)

```sql
SELECT DISTINCT ON (name, type, hp, attacks, weakness, retreat_cost)
       name, type, hp, attacks, weakness
FROM cards
WHERE type = 'Lightning'
ORDER BY name, hp DESC
```

---

## Advanced Queries

### Rarity Distribution

```sql
SELECT rarity,
       COUNT(*) as count,
       ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 1) as percentage
FROM cards
WHERE rarity IS NOT NULL
GROUP BY rarity
ORDER BY count DESC
```

### Weakness Analysis

```sql
SELECT weakness,
       COUNT(*) as affected_cards
FROM cards
WHERE weakness IS NOT NULL
GROUP BY weakness
ORDER BY affected_cards DESC
```

### Retreat Cost Distribution

```sql
SELECT retreat_cost,
       COUNT(*) as count,
       type
FROM cards
WHERE retreat_cost IS NOT NULL
GROUP BY retreat_cost, type
ORDER BY type, retreat_cost
```

### EX Pokemon Only

```sql
SELECT name, type, hp, attacks
FROM cards
WHERE name LIKE '% ex%'
ORDER BY type, name
```

### High Damage/Energy Ratio

```sql
SELECT name, type, hp, attacks
FROM cards
WHERE attacks NOT NULL
  AND (attacks LIKE '%90%' OR attacks LIKE '%100%')
  AND (attacks LIKE '%1 Energy%' OR attacks LIKE '%2 Energy%')
ORDER BY type, name
```

---

## Performance Tips

### Use LIMIT for Large Results

```sql
-- Good - limited
SELECT * FROM cards LIMIT 100

-- Potentially slow - all cards
SELECT * FROM cards
```

### Index Usage

The database has implicit indexes on:

- type
- name
- set_code
- hp

Filter on these when possible:

```sql
-- Faster - uses index
SELECT * FROM cards WHERE type = 'Fire'

-- Slower - full scan
WHERE LOWER(attacks) LIKE '%pikachu%'
```

### Avoid Complex LIKE

```sql
-- Slow
SELECT * FROM cards WHERE LOWER(attacks) LIKE '%pikachu%'

-- Better - name search
SELECT * FROM cards WHERE LOWER(name) LIKE '%pikachu%'
```

---

## Data Type Handling

### CAST for Numeric Operations

```sql
-- Required for math on HP
SELECT name, CAST(hp AS INTEGER) * 2 as double_hp
FROM cards
WHERE CAST(hp AS INTEGER) > 100
```

### NULL Handling

```sql
-- Trainers have NULL type
SELECT name FROM cards WHERE type IS NULL

-- Pokemon have non-NULL type
SELECT name FROM cards WHERE type IS NOT NULL
```

### String Functions

```sql
-- Case-insensitive search
SELECT * FROM cards WHERE LOWER(name) = 'pikachu ex'

-- Partial match
SELECT * FROM cards WHERE name LIKE '%Pikachu%'

-- Concatenation
SELECT set_code || ' ' || card_number as full_id
FROM cards
```

---

## Query Restrictions

### Only SELECT Allowed

```sql
-- ✓ Allowed
SELECT * FROM cards

-- ✗ Not allowed
DELETE FROM cards
DROP TABLE cards
INSERT INTO cards ...
UPDATE cards ...
```

### No Modifications

All queries are read-only. The database cannot be modified through SQL.

---

## Common Queries Library

### By Type

```sql
-- All Fire Pokemon
SELECT name, hp, attacks FROM cards WHERE type = 'Fire'

-- All Psychic Pokemon sorted by HP
SELECT * FROM cards WHERE type = 'Psychic' ORDER BY hp DESC
```

### By Set

```sql
-- All cards from set A1
SELECT * FROM cards WHERE set_code = 'A1'

-- Cards from Genetic Apex (A1) set
SELECT name, card_number FROM cards WHERE set_name = 'Genetic Apex'
```

### By Rarity

```sql
-- All Rare Rainbow cards
SELECT * FROM cards WHERE rarity = 'Rare Rainbow'

-- Count by rarity
SELECT rarity, COUNT(*) FROM cards GROUP BY rarity
```

### By HP Range

```sql
-- Low HP (basics)
SELECT name, hp FROM cards WHERE CAST(hp AS INTEGER) < 70

-- Mid HP
SELECT name, hp FROM cards WHERE CAST(hp AS INTEGER) BETWEEN 70 AND 119

-- High HP (ex, stage 2)
SELECT name, hp FROM cards WHERE CAST(hp AS INTEGER) >= 120
```

---

## Debugging Queries

### Check Your Query

1. **Start simple:**

   ```sql
   SELECT * FROM cards LIMIT 5
   ```

2. **Add filters incrementally:**

   ```sql
   SELECT * FROM cards WHERE type = 'Fire' LIMIT 5
   SELECT * FROM cards WHERE type = 'Fire' AND CAST(hp AS INTEGER) > 100 LIMIT 5
   ```

3. **Verify column names:**
   ```sql
   SELECT * FROM cards LIMIT 1
   ```
   Returns all columns to check names.

### Common Errors

| Error                 | Cause             | Fix             |
| --------------------- | ----------------- | --------------- |
| "no such column"      | Wrong column name | Check schema    |
| "invalid syntax"      | SQL error         | Validate syntax |
| "Only SELECT allowed" | Tried to modify   | Use SELECT only |

---

## See Also

- `docs/02-tools-reference.md` - Tool reference
- `docs/09-database-schema.md` - Complete schema
- `/mcp:sql` - Quick SQL guide
