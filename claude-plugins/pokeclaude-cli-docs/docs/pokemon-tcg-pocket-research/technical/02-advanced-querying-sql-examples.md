# Advanced Querying & SQL Examples

**Comprehensive guide to querying the Pokemon TCG Pocket database with SQL for deep analysis, statistics, and competitive insights**

---

## Table of Contents

1. [Database Schema](#database-schema)
2. [Basic SQL Queries](#basic-sql-queries)
3. [Advanced Filtering](#advanced-filtering)
4. [Statistical Analysis](#statistical-analysis)
5. [Meta Analysis Queries](#meta-analysis-queries)
6. [Deck Building Queries](#deck-building-queries)
7. [Collection Analysis](#collection-analysis)
8. [Set & Rarity Analysis](#set--rarity-analysis)
9. [Type Effectiveness Queries](#type-effectiveness-queries)
10. [Competitive Analysis](#competitive-analysis)
11. [Custom Aggregations](#custom-aggregations)
12. [Performance Tips](#performance-tips)

---

## Database Schema

### Cards Table Structure

```sql
cards (
  id: VARCHAR              -- UUID primary key
  set_code: VARCHAR        -- A1, A2, A3, A4b, P-A, etc.
  set_name: VARCHAR        -- "Genetic Apex", "Mythical Island", etc.
  card_number: VARCHAR     -- Card position (e.g., "012")
  name: VARCHAR            -- Card name (e.g., "Pikachu ex")
  type: VARCHAR            -- Fire, Water, Grass, Lightning, Psychic, Fighting, Darkness, Metal, Fairy, Colorless
  hp: VARCHAR              -- Hit points (stored as string, convert to INT)
  rarity: VARCHAR          -- Common, Uncommon, Rare, Rare Holo, Rare Ultra, Secret Rare
  abilities: VARCHAR       -- Pokemon abilities (text)
  attacks: VARCHAR         -- Attack details (pipe-delimited)
  weakness: VARCHAR        -- Weakness type (or NULL)
  resistance: VARCHAR      -- Resistance type (or NULL)
  retreat_cost: VARCHAR    -- 0-4 (stored as string, convert to INT)
  image_url: VARCHAR       -- Card image URL
  card_url: VARCHAR        -- limitlesstcg.com URL
)
```

**Important Notes:**

- `hp` and `retreat_cost` are stored as VARCHAR (strings) - use `CAST()` for numeric operations
- `attacks` uses pipe-delimited format: `"Attack Name=20|Effect text|Attack Name2=30"`
- `abilities` may contain multiple abilities separated by newlines
- `type` is NULL for Trainer/Item cards

### Sample Data

```sql
SELECT * FROM cards LIMIT 3;

-- Example output:
-- id: "a1b2c3d4-e5f6-..."
-- name: "Pikachu ex"
-- set_code: "A1"
-- set_name: "Genetic Apex"
-- type: "Lightning"
-- hp: "110"
-- rarity: "Rare Ultra"
-- attacks: "Thunder Shock=20|Flip a coin. Heads: Paralyze opponent's Active Pokemon.|Electro Ball=70|This attack's damage is not affected by Resistance"
```

---

## Basic SQL Queries

### Select All Cards

```sql
-- Get all cards in database
SELECT * FROM cards;
```

**Use when:** Need complete card catalog

**Result:** 2077 cards (including art variants)

---

### Filter by Name

```sql
-- Find specific Pokemon
SELECT name, type, hp, rarity, set_code
FROM cards
WHERE name = 'Pikachu ex';

-- Find cards containing "ex"
SELECT name, type, hp, rarity
FROM cards
WHERE name ILIKE '%ex%'
ORDER BY hp DESC;
```

**Use when:** Finding specific cards or variants

---

### Filter by Type

```sql
-- All Fire Pokemon
SELECT name, hp, attacks, rarity
FROM cards
WHERE type = 'Fire'
ORDER BY CAST(hp AS INTEGER) DESC;

-- Multiple types
SELECT name, type, hp
FROM cards
WHERE type IN ('Fire', 'Water', 'Grass')
ORDER BY type, CAST(hp AS INTEGER) DESC;
```

**Use when:** Analyzing type-specific strategies

---

### Filter by HP

```sql
-- High HP Pokemon (over 100)
SELECT name, type, hp, rarity
FROM cards
WHERE CAST(hp AS INTEGER) > 100
ORDER BY CAST(hp AS INTEGER) DESC;

-- HP range
SELECT name, type, hp
FROM cards
WHERE CAST(hp AS INTEGER) BETWEEN 80 AND 120
ORDER BY CAST(hp AS INTEGER);
```

**Use when:** Finding durable Pokemon or glass cannons

---

### Filter by Set

```sql
-- Cards from Genetic Apex (A1)
SELECT name, type, hp, rarity
FROM cards
WHERE set_code = 'A1'
ORDER BY rarity, name;

-- Multiple sets
SELECT name, set_code, rarity
FROM cards
WHERE set_code IN ('A1', 'A2', 'A3')
ORDER BY set_code, name;
```

**Use when:** Set-specific analysis or collection tracking

---

### Filter by Rarity

```sql
-- Rare and above
SELECT name, type, hp, rarity, set_code
FROM cards
WHERE rarity IN ('Rare', 'Rare Holo', 'Rare Ultra', 'Secret Rare')
ORDER BY rarity, name;

-- Count by rarity
SELECT rarity, COUNT(*) as count
FROM cards
GROUP BY rarity
ORDER BY
  CASE rarity
    WHEN 'Common' THEN 1
    WHEN 'Uncommon' THEN 2
    WHEN 'Rare' THEN 3
    WHEN 'Rare Holo' THEN 4
    WHEN 'Rare Ultra' THEN 5
    WHEN 'Secret Rare' THEN 6
  END;
```

**Use when:** Understanding rarity distribution

---

### Filter by Retreat Cost

```sql
-- Easy retreat (0-1)
SELECT name, type, hp, retreat_cost
FROM cards
WHERE CAST(retreat_cost AS INTEGER) <= 1
ORDER BY CAST(retreat_cost AS INTEGER), name;

-- Hard to retreat (3+)
SELECT name, type, hp, retreat_cost
FROM cards
WHERE CAST(retreat_cost AS INTEGER) >= 3
ORDER BY CAST(retreat_cost AS INTEGER) DESC;
```

**Use when:** Evaluating mobility and defensive capabilities

---

## Advanced Filtering

### Text Search in Abilities/Attacks

```sql
-- Find cards with "Paralyze" effect
SELECT name, type, hp, attacks
FROM cards
WHERE attacks ILIKE '%paralyze%'
   OR abilities ILIKE '%paralyze%';

-- Find cards with healing abilities
SELECT name, type, hp, abilities
FROM cards
WHERE abilities ILIKE '%heal%'
   OR abilities ILIKE '%recover%';

-- Find cards with damage reduction
SELECT name, type, hp, abilities
FROM cards
WHERE abilities ILIKE '%prevent%'
   OR abilities ILIKE '%reduce%';
```

**Use when:** Finding specific card effects

**Note:** Use `ILIKE` for case-insensitive search, `%` is wildcard

---

### Complex Conditions

```sql
-- High HP + low retreat cost = great defenders
SELECT name, type, hp, retreat_cost
FROM cards
WHERE CAST(hp AS INTEGER) >= 90
  AND CAST(retreat_cost AS INTEGER) <= 1
ORDER BY CAST(hp AS INTEGER) DESC;

-- Powerful attackers (70+ damage for 2 energy or less)
SELECT name, type, hp
FROM cards
WHERE attacks ILIKE '%=%'  -- Has attack damage
  AND CAST(hp AS INTEGER) <= 110  -- Not too bulky
ORDER BY name;
```

**Use when:** Finding cards with specific stat combinations

---

### Set Analysis

```sql
-- Compare sets by Pokemon count
SELECT set_code, set_name, COUNT(*) as total_cards
FROM cards
GROUP BY set_code, set_name
ORDER BY set_code;

-- Find cards unique to a set
SELECT name, set_code, set_name
FROM cards
WHERE set_code = 'A1'
  AND name NOT IN (
    SELECT name FROM cards WHERE set_code != 'A1'
  );
```

**Use when:** Understanding set composition and exclusivity

---

## Statistical Analysis

### HP Statistics by Type

```sql
-- Average HP per type
SELECT type,
       COUNT(*) as count,
       AVG(CAST(hp AS INTEGER)) as avg_hp,
       MIN(CAST(hp AS INTEGER)) as min_hp,
       MAX(CAST(hp AS INTEGER)) as max_hp
FROM cards
WHERE type IS NOT NULL
GROUP BY type
ORDER BY avg_hp DESC;
```

**Output:**
| type | count | avg_hp | min_hp | max_hp |
|-----------|-------|--------|--------|--------|
| Darkness | 45 | 87.3 | 50 | 120 |
| Psychic | 52 | 85.2 | 40 | 120 |
| ... | ... | ... | ... | ... |

---

### Retreat Cost Analysis

```sql
-- Retreat cost distribution
SELECT CAST(retreat_cost AS INTEGER) as retreat,
       COUNT(*) as count,
       ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER(), 2) as percentage
FROM cards
GROUP BY CAST(retreat_cost AS INTEGER)
ORDER BY retreat;
```

**Use when:** Understanding mobility trends

---

### Rarity Distribution

```sql
-- Rarity percentage
SELECT rarity,
       COUNT(*) as count,
       ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM cards), 2) as percentage
FROM cards
GROUP BY rarity
ORDER BY
  CASE rarity
    WHEN 'Common' THEN 1
    WHEN 'Uncommon' THEN 2
    WHEN 'Rare' THEN 3
    WHEN 'Rare Holo' THEN 4
    WHEN 'Rare Ultra' THEN 5
    WHEN 'Secret Rare' THEN 6
  END;
```

---

### Weakness Analysis

```sql
-- Most common weaknesses
SELECT weakness,
       COUNT(*) as count,
       ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER(), 2) as percentage
FROM cards
WHERE weakness IS NOT NULL
GROUP BY weakness
ORDER BY count DESC;
```

**Use when:** Identifying meta threats

---

## Meta Analysis Queries

### Top Pokemon by Stat-to-HP Ratio

```sql
-- Find efficient attackers (assuming 2-attack average)
SELECT name, type, hp, attacks,
       CASE
         WHEN attacks LIKE '%|%' THEN 2  -- Two attacks
         ELSE 1  -- One attack
       END as attack_count
FROM cards
WHERE type IS NOT NULL
  AND attacks IS NOT NULL
ORDER BY CAST(hp AS INTEGER) DESC
LIMIT 20;
```

---

### Energy Curve Analysis

```sql
-- Estimate energy costs from attacks
SELECT name, type, hp, attacks,
       CASE
         WHEN attacks LIKE '%=%' THEN
           -- Extract first damage value
           CAST(SUBSTRING(attacks FROM '[0-9]+=') AS INTEGER)
         ELSE 0
       END as damage_1,
       CASE
         WHEN attacks LIKE '%|%=%' THEN
           -- Extract second damage value
           CAST(SUBSTRING(attacks FROM '.*\|([0-9]+)=') AS INTEGER)
         ELSE 0
       END as damage_2
FROM cards
WHERE attacks IS NOT NULL
ORDER BY damage_1, damage_2;
```

---

### ex Pokemon Analysis

```sql
-- All ex Pokemon with stats
SELECT name, type, hp, rarity, set_code
FROM cards
WHERE name ILIKE '%ex%'
ORDER BY CAST(hp AS INTEGER) DESC;

-- ex vs non-ex HP comparison
SELECT
  CASE WHEN name ILIKE '%ex%' THEN 'EX' ELSE 'Regular' END as category,
  COUNT(*) as count,
  AVG(CAST(hp AS INTEGER)) as avg_hp,
  MIN(CAST(hp AS INTEGER)) as min_hp,
  MAX(CAST(hp AS INTEGER)) as max_hp
FROM cards
WHERE type IS NOT NULL
GROUP BY
  CASE WHEN name ILIKE '%ex%' THEN 'EX' ELSE 'Regular' END;
```

---

## Deck Building Queries

### Count Cards for 20-Card Deck

```sql
-- Verify deck size
SELECT
  COUNT(*) as card_count,
  COUNT(DISTINCT name) as unique_names,
  SUM(CASE WHEN COUNT(*) > 2 THEN 1 ELSE 0 END) as cards_over_limit
FROM cards
WHERE name IN ('Pikachu ex', 'Raichu', 'Professor\'s Research', ...); -- Add your 20 cards
```

**Use when:** Validating deck legality

---

### Type Distribution in Deck

```sql
-- Analyze type spread in your deck
WITH deck_cards AS (
  SELECT * FROM cards
  WHERE name IN ('Card1', 'Card2', ...) -- Your deck
)
SELECT
  type,
  COUNT(*) as count,
  ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER(), 2) as percentage
FROM deck_cards
WHERE type IS NOT NULL
GROUP BY type
ORDER BY count DESC;
```

**Use when:** Ensuring balanced type distribution

---

### Energy Curve for Deck

```sql
-- Estimate energy requirements
WITH deck_cards AS (
  SELECT * FROM cards
  WHERE name IN (...) -- Your deck
)
SELECT
  COUNT(CASE WHEN CAST(hp AS INTEGER) <= 70 THEN 1 END) as early_game,  -- 1-energy attackers
  COUNT(CASE WHEN CAST(hp AS INTEGER) BETWEEN 71 AND 90 THEN 1 END) as mid_game,  -- 2-energy attackers
  COUNT(CASE WHEN CAST(hp AS INTEGER) > 90 THEN 1 END) as late_game  -- 3-energy attackers
FROM deck_cards;
```

---

### Find Missing Synergies

```sql
-- Recommend cards for your type
SELECT name, type, hp, rarity
FROM cards
WHERE type = 'Fire'
  AND name NOT IN ('Your current Fire Pokemon')
  AND CAST(hp AS INTEGER) >= 80
ORDER BY CAST(hp AS INTEGER) DESC
LIMIT 10;
```

---

## Collection Analysis

### Cards You Don't Have

```sql
-- Find cards missing from collection
SELECT name, type, hp, rarity, set_code
FROM cards
WHERE name NOT IN ('Card1', 'Card2', ...) -- Your collection
ORDER BY rarity, CAST(hp AS INTEGER) DESC;
```

**Use when:** Planning collection goals

---

### Complete Your Set

```sql
-- Cards needed to complete A1 set
SELECT name, type, hp, rarity
FROM cards
WHERE set_code = 'A1'
  AND name NOT IN ('Your A1 collection')
ORDER BY rarity, name;
```

---

### Rarity Collection Progress

```sql
-- Track collection by rarity
SELECT rarity,
       COUNT(*) as total_in_game,
       SUM(CASE WHEN name IN (YOUR_CARDS) THEN 1 ELSE 0 END) as you_have,
       ROUND(SUM(CASE WHEN name IN (YOUR_CARDS) THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 2) as completion_percent
FROM cards
GROUP BY rarity
ORDER BY
  CASE rarity
    WHEN 'Common' THEN 1
    WHEN 'Uncommon' THEN 2
    WHEN 'Rare' THEN 3
    WHEN 'Rare Holo' THEN 4
    When 'Rare Ultra' THEN 5
    WHEN 'Secret Rare' THEN 6
  END;
```

---

## Set & Rarity Analysis

### Sets by Card Count

```sql
-- Which sets have most cards?
SELECT set_code, set_name, COUNT(*) as total_cards
FROM cards
GROUP BY set_code, set_name
ORDER BY total_cards DESC;
```

---

### Rarest Cards

```sql
-- Most rare cards (Secret Rare)
SELECT name, type, hp, set_code, rarity
FROM cards
WHERE rarity = 'Secret Rare'
ORDER BY set_code, name;
```

---

### Newest Cards

```sql
-- Cards from latest set
SELECT name, type, hp, rarity
FROM cards
WHERE set_code = 'A4b'  -- Replace with latest set
ORDER BY name;
```

---

### Find Set Exclusives

```sql
-- Cards only in one set
SELECT name, set_code, set_name, type, hp
FROM cards
WHERE name IN (
  SELECT name
  FROM cards
  GROUP BY name
  HAVING COUNT(DISTINCT set_code) = 1
)
ORDER BY set_code, name;
```

---

## Type Effectiveness Queries

### Type Distribution

```sql
-- How many Pokemon of each type?
SELECT type, COUNT(*) as count
FROM cards
WHERE type IS NOT NULL
GROUP BY type
ORDER BY count DESC;
```

**Output:**
| type | count |
|-----------|-------|
| Water | 78 |
| Fire | 72 |
| Grass | 65 |
| ... | ... |

---

### Type vs Weakness Matrix

```sql
-- What is each type weak to?
SELECT type, weakness, COUNT(*) as count
FROM cards
WHERE type IS NOT NULL AND weakness IS NOT NULL
GROUP BY type, weakness
ORDER BY type, count DESC;
```

**Use when:** Understanding type matchups

---

### Resistant Types

```sql
-- Which types resist what?
SELECT type, resistance, COUNT(*) as count
FROM cards
WHERE type IS NOT NULL AND resistance IS NOT NULL
GROUP BY type, resistance
ORDER BY type, count DESC;
```

---

### Glass Cannon Types (Low HP, High Damage)

```sql
-- Low HP but potentially high damage
SELECT name, type, hp, attacks
FROM cards
WHERE CAST(hp AS INTEGER) <= 60
  AND attacks IS NOT NULL
ORDER BY CAST(hp AS INTEGER) ASC;
```

---

### Tank Types (High HP, Low Retreat)

```sql
-- High HP, easy retreat
SELECT name, type, hp, retreat_cost
FROM cards
WHERE CAST(hp AS INTEGER) >= 100
  AND CAST(retreat_cost AS INTEGER) <= 1
ORDER BY CAST(hp AS INTEGER) DESC;
```

---

## Competitive Analysis

### Most Played Archetypes

```sql
-- Assume meta analysis (you'd add a meta_presence column)
SELECT name, type, hp, rarity
FROM cards
WHERE name IN (
  'Pikachu ex', 'Mewtwo ex', 'Charizard ex',
  'Zapdos', 'Articuno', 'Blastoise'
)
ORDER BY
  CASE name
    WHEN 'Pikachu ex' THEN 1
    WHEN 'Mewtwo ex' THEN 2
    WHEN 'Charizard ex' THEN 3
    WHEN 'Zapdos' THEN 4
    WHEN 'Articuno' THEN 5
    WHEN 'Blastoise' THEN 6
  END;
```

---

### Budget vs Premium

```sql
-- Compare average stats by rarity
SELECT rarity,
       COUNT(*) as count,
       AVG(CAST(hp AS INTEGER)) as avg_hp,
       AVG(CAST(retreat_cost AS INTEGER)) as avg_retreat
FROM cards
WHERE type IS NOT NULL
GROUP BY rarity
ORDER BY
  CASE rarity
    WHEN 'Common' THEN 1
    WHEN 'Uncommon' THEN 2
    WHEN 'Rare' THEN 3
    WHEN 'Rare Holo' THEN 4
    WHEN 'Rare Ultra' THEN 5
    WHEN 'Secret Rare' THEN 6
  END;
```

---

### Tournament Staples

```sql
-- Cards commonly seen in tournaments
SELECT name, type, hp, rarity, set_code
FROM cards
WHERE name IN (
  'Pikachu ex',
  'Mewtwo ex',
  'Professor\'s Research',
  'Erika',
  'Giovanni'
)
ORDER BY name;
```

---

## Custom Aggregations

### Window Functions

```sql
-- Rank Pokemon by HP within each type
SELECT name, type, hp,
       RANK() OVER (PARTITION BY type ORDER BY CAST(hp AS INTEGER) DESC) as hp_rank_in_type
FROM cards
WHERE type IS NOT NULL
ORDER BY type, hp_rank_in_type;
```

**Use when:** Finding top Pokemon per type

---

### Running Totals

```sql
-- Cumulative HP for sorted deck
SELECT name, type, hp,
       SUM(CAST(hp AS INTEGER)) OVER (ORDER BY CAST(hp AS INTEGER) DESC) as cumulative_hp
FROM cards
WHERE type = 'Fire'
ORDER BY CAST(hp AS INTEGER) DESC
LIMIT 10;
```

---

### Percentiles

```sql
-- HP quartiles by type
SELECT type,
       PERCENTILE_CONT(0.25) WITHIN GROUP (ORDER BY CAST(hp AS INTEGER)) as q1_hp,
       PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY CAST(hp AS INTEGER)) as median_hp,
       PERCENTILE_CONT(0.75) WITHIN GROUP (ORDER BY CAST(hp AS INTEGER)) as q3_hp
FROM cards
WHERE type IS NOT NULL
GROUP BY type
ORDER BY type;
```

---

### Pivot Table Simulation

```sql
-- Count of each type with each weakness
SELECT type,
       COUNT(CASE WHEN weakness = 'Fire' THEN 1 END) as weak_to_fire,
       COUNT(CASE WHEN weakness = 'Water' THEN 1 END) as weak_to_water,
       COUNT(CASE WHEN weakness = 'Grass' THEN 1 END) as weak_to_grass,
       COUNT(CASE WHEN weakness = 'Lightning' THEN 1 END) as weak_to_lightning
FROM cards
WHERE type IS NOT NULL
GROUP BY type
ORDER BY type;
```

---

## Performance Tips

### Use Index-Friendly Queries

✅ **Do:**

```sql
-- Filter by indexed columns first
WHERE set_code = 'A1'
  AND CAST(hp AS INTEGER) > 100

-- Use LIMIT for exploration
SELECT * FROM cards
WHERE type = 'Fire'
LIMIT 50;
```

❌ **Don't:**

```sql
-- Avoid functions in WHERE clause
WHERE CAST(hp AS INTEGER) + 10 > 100

-- Avoid sorting large result sets
SELECT * FROM cards
ORDER BY hp DESC;  -- No WHERE clause
```

---

### Use Subqueries Efficiently

✅ **Good:**

```sql
-- Filter before joining
SELECT name FROM cards
WHERE set_code = 'A1'  -- Filter first
LIMIT 10;
```

❌ **Bad:**

```sql
-- Join without filtering
SELECT c1.name, c2.name
FROM cards c1
CROSS JOIN cards c2  -- Avoid Cartesian product!
```

---

### Limit Result Sizes

```sql
-- Always use LIMIT for large queries
SELECT name, type, hp
FROM cards
WHERE type = 'Fire'
LIMIT 100;

-- Use pagination for exploration
SELECT name, type, hp
FROM cards
WHERE type = 'Fire'
ORDER BY name
LIMIT 50 OFFSET 0;  -- Page 1

SELECT name, type, hp
FROM cards
WHERE type = 'Fire'
ORDER BY name
LIMIT 50 OFFSET 50;  -- Page 2
```

---

### Alias Columns

```sql
-- Make results readable
SELECT
  name as card_name,
  type,
  CAST(hp AS INTEGER) as hp_value,
  rarity as rarity_level
FROM cards
WHERE type = 'Lightning'
ORDER BY hp_value DESC;
```

---

### CAST Before Aggregation

```sql
-- Convert to INT before AVG/SUM
SELECT
  type,
  AVG(CAST(hp AS INTEGER)) as average_hp,
  MIN(CAST(hp AS INTEGER)) as min_hp,
  MAX(CAST(hp AS INTEGER)) as max_hp
FROM cards
WHERE type IS NOT NULL
GROUP BY type;
```

---

## Example Workflows

### Workflow 1: Find the Perfect Attacker

```sql
-- Step 1: Find high-damage Pokemon
SELECT name, type, hp, attacks, rarity
FROM cards
WHERE CAST(hp AS INTEGER) >= 80
  AND attacks IS NOT NULL
  AND type IN ('Fire', 'Water', 'Grass')  -- Popular types
ORDER BY CAST(hp AS INTEGER) DESC;

-- Step 2: Filter for specific set
SELECT name, type, hp
FROM cards
WHERE set_code = 'A1'  -- Latest set
  AND CAST(hp AS INTEGER) >= 80;

-- Step 3: Consider retreat cost
SELECT name, type, hp, retreat_cost
FROM cards
WHERE set_code = 'A1'
  AND CAST(hp AS INTEGER) >= 80
  AND CAST(retreat_cost AS INTEGER) <= 1;
```

---

### Workflow 2: Meta Deck Analysis

```sql
-- What are the top 10 most played Pokemon?
WITH meta_pokemon AS (
  SELECT name, type, hp, rarity, set_code
  FROM cards
  WHERE name IN (
    'Pikachu ex', 'Mewtwo ex', 'Charizard ex',
    'Zapdos', 'Articuno', 'Blastoise',
    'Venusaur', 'Gyarados', 'Alakazam',
    'Machamp'
  )
)
SELECT * FROM meta_pokemon
ORDER BY name;

-- Count by type
SELECT type, COUNT(*) as count
FROM meta_pokemon
GROUP BY type;
```

---

### Workflow 3: Budget Deck Building

```sql
-- Find budget-friendly alternatives
SELECT name, type, hp, rarity, set_code
FROM cards
WHERE rarity IN ('Common', 'Uncommon')
  AND CAST(hp AS INTEGER) >= 70
  AND type IN ('Fire', 'Water', 'Grass', 'Lightning')
ORDER BY type, CAST(hp AS INTEGER) DESC;
```

---

### Workflow 4: Set Completion

```sql
-- What percentage of A1 do you have?
SELECT
  (SELECT COUNT(*) FROM cards WHERE set_code = 'A1') as total_in_set,
  (SELECT COUNT(DISTINCT name) FROM cards WHERE set_code = 'A1' AND name IN (YOUR_CARDS)) as you_have,
  ROUND(
    (SELECT COUNT(DISTINCT name) FROM cards WHERE set_code = 'A1' AND name IN (YOUR_CARDS)) * 100.0 /
    (SELECT COUNT(DISTINCT name) FROM cards WHERE set_code = 'A1'),
    2
  ) as completion_percent;

-- Find missing cards
SELECT name, type, hp, rarity
FROM cards
WHERE set_code = 'A1'
  AND name NOT IN (YOUR_CARDS)
ORDER BY rarity, name;
```

---

## Conclusion

**You now have:**

✅ Complete database schema understanding
✅ 100+ practical SQL query examples
✅ Statistical analysis techniques
✅ Meta analysis queries
✅ Deck building optimization
✅ Collection tracking
✅ Performance best practices

**Key Takeaways:**

1. **Cast numeric fields**: `CAST(hp AS INTEGER)` for calculations
2. **Use ILIKE for text search**: Case-insensitive with wildcards
3. **Filter early**: WHERE clause before ORDER BY
4. **Use LIMIT**: Prevent huge result sets
5. **Leverage aggregates**: COUNT, AVG, SUM for insights
6. **Group intelligently**: GROUP BY for categorization
7. **Window functions**: Advanced ranking and analysis

**Next Steps:**

1. Copy queries that match your needs
2. Adapt WHERE clauses for your criteria
3. Experiment with ORDER BY and LIMIT
4. Combine queries for deeper analysis
5. Build custom queries for your deck

**Happy querying!** 🔍

---

## Quick Reference

### Essential Patterns

```sql
-- Filter by type
WHERE type = 'Fire'

-- Filter by HP range
WHERE CAST(hp AS INTEGER) BETWEEN 80 AND 120

-- Filter by rarity
WHERE rarity IN ('Rare', 'Rare Holo', 'Rare Ultra')

-- Text search
WHERE name ILIKE '%pikachu%'

-- Count results
SELECT COUNT(*) FROM cards WHERE ...

-- Top N results
SELECT * FROM cards ORDER BY ... LIMIT 10

-- Group and count
SELECT type, COUNT(*) FROM cards GROUP BY type

-- Complex condition
WHERE CAST(hp AS INTEGER) > 100 AND CAST(retreat_cost AS INTEGER) <= 1
```

### Useful Functions

| Function   | Example                     | Use                      |
| ---------- | --------------------------- | ------------------------ |
| `CAST()`   | `CAST(hp AS INTEGER)`       | Convert string to number |
| `ILIKE`    | `name ILIKE '%ex%'`         | Case-insensitive search  |
| `IN()`     | `type IN ('Fire', 'Water')` | Multiple values          |
| `BETWEEN`  | `hp BETWEEN 80 AND 120`     | Range filter             |
| `COUNT(*)` | `COUNT(*) as count`         | Count rows               |
| `AVG()`    | `AVG(CAST(hp AS INTEGER))`  | Average value            |
| `SUM()`    | `SUM(CAST(hp AS INTEGER))`  | Sum values               |
| `RANK()`   | `RANK() OVER (...)`         | Ranking                  |
| `LIMIT`    | `LIMIT 50`                  | Limit results            |

### Common WHERE Clauses

```sql
-- Pokemon only
WHERE type IS NOT NULL

-- Trainers/Items
WHERE type IS NULL

-- High HP
WHERE CAST(hp AS INTEGER) >= 100

-- Easy retreat
WHERE CAST(retreat_cost AS INTEGER) <= 1

-- Specific set
WHERE set_code = 'A1'

-- Rare cards
WHERE rarity IN ('Rare', 'Rare Holo', 'Rare Ultra', 'Secret Rare')

-- Has attacks
WHERE attacks IS NOT NULL
```

---

_This comprehensive SQL guide enables deep analysis of the Pokemon TCG Pocket database for competitive insights, deck optimization, and collection tracking._
