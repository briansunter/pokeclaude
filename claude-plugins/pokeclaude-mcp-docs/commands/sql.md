---
name: mcp:sql
description: Guide to SQL querying with PokeClaude MCP
---

# SQL Query Guide

Use custom SQL queries with the query_cards tool.

## Basic Queries

### Select Specific Columns

```sql
SELECT name, type, hp
FROM cards
LIMIT 10
```

### Filter by Type

```sql
SELECT name, hp, attacks
FROM cards
WHERE type = 'Fire'
```

### High HP Cards

```sql
SELECT name, hp, type
FROM cards
WHERE CAST(hp AS INTEGER) >= 120
ORDER BY hp DESC
```

### Search by Name

```sql
SELECT name, type, hp, attacks
FROM cards
WHERE LOWER(name) LIKE LOWER('%pikachu%')
```

## Advanced Queries

### Count by Type

```sql
SELECT type, COUNT(*) as count
FROM cards
WHERE type IS NOT NULL
GROUP BY type
ORDER BY count DESC
```

### Average HP by Type

```sql
SELECT type,
       ROUND(AVG(TRY_CAST(hp AS INTEGER)), 1) as avg_hp
FROM cards
WHERE type IS NOT NULL
GROUP BY type
ORDER BY avg_hp DESC
```

### Unique Cards Only

```sql
SELECT DISTINCT ON (name, type, hp, attacks, weakness, retreat_cost)
       name, type, hp, attacks
FROM cards
WHERE type = 'Lightning'
ORDER BY name
```

### Find Trainers

```sql
SELECT name, attacks
FROM cards
WHERE type IS NULL
  AND name NOT LIKE '%Energy%'
ORDER BY name
```

### High Damage Attackers

```sql
SELECT name, type, attacks
FROM cards
WHERE attacks LIKE '%90%'
   OR attacks LIKE '%100%'
ORDER BY hp DESC
```

## Query Tips

### Only SELECT is Allowed

```sql
-- ✓ Allowed
SELECT * FROM cards

-- ✗ Not allowed
DELETE FROM cards
DROP TABLE cards
```

### Use CAST for Numeric Comparisons

```sql
-- ✓ Correct
WHERE CAST(hp AS INTEGER) >= 120

-- ✗ Wrong (string comparison)
WHERE hp >= '120'
```

### Handle NULL Values

```sql
-- Trainers have NULL type
WHERE type IS NULL

-- Pokemon have non-NULL type
WHERE type IS NOT NULL
```

## Full Reference

See `docs/06-sql-query-guide.md` for complete SQL reference and more examples.
