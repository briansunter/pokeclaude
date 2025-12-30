# Pokemon Pocket CLI Reference

Complete reference for the `pokemon-pocket-mcp-server` terminal CLI.

## Installation

```bash
# Global installation (recommended for frequent use)
npm install -g pokemon-pocket-mcp-server

# One-time use without installation
npx pokemon-pocket-mcp-server <command>

# Using bun (faster)
bunx pokemon-pocket-mcp-server <command>
```

## Output Formats

All commands support `--output` (or `-o`) with three formats:

| Format    | Description                 | Use Case               |
| --------- | --------------------------- | ---------------------- |
| `json`    | Structured JSON (default)   | Scripts, parsing       |
| `table`   | Human-readable table format | Terminal viewing       |
| `compact` | Single-line per card format | Quick scans, grep-able |

## Command 1: search

Search for Pokemon cards with flexible filters.

### Options

| Option           | Type    | Description                        |
| ---------------- | ------- | ---------------------------------- |
| `--name`         | string  | Card name (partial match)          |
| `--type`         | string  | Pokemon type (Fire, Water, etc.)   |
| `--min-hp`       | number  | Minimum HP                         |
| `--max-hp`       | number  | Maximum HP                         |
| `--set`          | string  | Set code (A1, A2, A3, etc.)        |
| `--retreat-cost` | number  | Retreat cost (0-4)                 |
| `--weakness`     | string  | Weakness type                      |
| `--limit`        | number  | Max results (default 50)           |
| `--unique-only`  | boolean | Filter duplicates (default true)   |
| `--output`       | string  | Output format (json/table/compact) |

### Examples

```bash
# Search by name
pokemon-pocket-mcp-server search --name Pikachu

# Search by type with table output
pokemon-pocket-mcp-server search --type Fire --output table

# High HP Water types
pokemon-pocket-mcp-server search --type Water --min-hp 120

# Cards from a specific set
pokemon-pocket-mcp-server search --set A1 --limit 20

# Zero retreat cost Pokemon
pokemon-pocket-mcp-server search --retreat-cost 0 --output table

# Cards weak to Fighting
pokemon-pocket-mcp-server search --weakness Fighting

# Include all variants (not just unique cards)
pokemon-pocket-mcp-server search --name Pikachu --unique-only false
```

## Command 2: get

Get detailed information about a specific card.

### Options

| Option     | Type   | Description             |
| ---------- | ------ | ----------------------- |
| `--name`   | string | Card name (exact match) |
| `--output` | string | Output format           |

### Examples

```bash
# Get card details
pokemon-pocket-mcp-server get --name "Charizard ex"

# Table format for quick viewing
pokemon-pocket-mcp-server get --name "Pikachu ex" --output table

# Compact format
pokemon-pocket-mcp-server get --name "Mewtwo ex" --output compact
```

## Command 3: synergies

Find cards that work well with a specific card.

### Options

| Option        | Type   | Description                     |
| ------------- | ------ | ------------------------------- |
| `--card-name` | string | Main card to find synergies for |
| `--output`    | string | Output format                   |

### What It Returns

1. **Card details** for the main card
2. **Same-type Pokemon** that complement the strategy
3. **Trainer cards** that support the deck

### Examples

```bash
# Find synergies for Pikachu ex
pokemon-pocket-mcp-server synergies --card-name "Pikachu ex"

# Blastoise ex water deck support
pokemon-pocket-mcp-server synergies --card-name "Blastoise ex"

# Charizard ex fire synergies
pokemon-pocket-mcp-server synergies --card-name "Charizard ex" --output table
```

## Command 4: counters

Find cards that counter a specific Pokemon type (exploits weaknesses).

### Options

| Option          | Type   | Description               |
| --------------- | ------ | ------------------------- |
| `--target-type` | string | Type to find counters for |
| `--limit`       | number | Max results               |
| `--output`      | string | Output format             |

### How It Works

Finds Pokemon whose type matches the target's weakness. For example:

- Fire is weak to Water → returns Water types
- Psychic is weak to Darkness → returns Darkness types
- Lightning is weak to Fighting → returns Fighting types

### Examples

```bash
# What counters Fire types?
pokemon-pocket-mcp-server counters --target-type Fire

# What beats Psychic decks?
pokemon-pocket-mcp-server counters --target-type Psychic --output table

# Top 10 Lightning counters
pokemon-pocket-mcp-server counters --target-type Lightning --limit 10
```

## Command 5: stats

Display statistical breakdown by Pokemon type.

### Options

| Option     | Type   | Description   |
| ---------- | ------ | ------------- |
| `--output` | string | Output format |

### What It Returns

For each Pokemon type:

- Card count
- Average HP
- Average retreat cost

### Examples

```bash
# Show all type statistics
pokemon-pocket-mcp-server stats

# Table format for easy reading
pokemon-pocket-mcp-server stats --output table
```

### Sample Output

```
┌─────────────┬──────────┬─────────┬───────────────┐
│ Type        │ Count    │ Avg HP  │ Avg Retreat   │
├─────────────┼──────────┼─────────┼───────────────┤
│ Fire        │ 150      │ 95.5    │ 1.8           │
│ Water       │ 180      │ 88.2    │ 1.5           │
│ Grass       │ 165      │ 82.0    │ 1.9           │
└─────────────┴──────────┴─────────┴───────────────┘
```

## Command 6: query

Run custom SQL queries against the card database.

### Options

| Option     | Type   | Description             |
| ---------- | ------ | ----------------------- |
| `--sql`    | string | SQL query (SELECT only) |
| `--output` | string | Output format           |

### Restrictions

- Only SELECT queries allowed
- No database modifications
- Must be valid SQL syntax

### Database Schema

```sql
CREATE TABLE cards (
  id VARCHAR,              -- UUID primary key
  set_code VARCHAR,        -- A1, A2, A3, etc.
  set_name VARCHAR,        -- "Genetic Apex", etc.
  card_number VARCHAR,     -- Card number in set
  name VARCHAR,            -- Card name
  type VARCHAR,            -- Fire, Water, Grass (empty for trainers)
  hp VARCHAR,              -- Hit points
  rarity VARCHAR,          -- Rarity level
  abilities VARCHAR,       -- Pokemon abilities
  attacks VARCHAR,         -- Attack details
  weakness VARCHAR,        -- Weakness type
  resistance VARCHAR,      -- Resistance type
  retreat_cost VARCHAR,    -- 0-4
  image_url VARCHAR,       -- Card image URL
  card_url VARCHAR         -- limitlesstcg.com URL
);
```

### Examples

```bash
# Highest HP Pokemon
pokemon-pocket-mcp-server query --sql "SELECT name, type, hp FROM cards WHERE type IS NOT NULL ORDER BY CAST(hp AS INTEGER) DESC LIMIT 10"

# Cards with zero retreat cost
pokemon-pocket-mcp-server query --sql "SELECT name, type, hp FROM cards WHERE retreat_cost = '0' AND type IS NOT NULL"

# Count cards by type
pokemon-pocket-mcp-server query --sql "SELECT type, COUNT(*) as count FROM cards WHERE type IS NOT NULL GROUP BY type ORDER BY count DESC"

# EX Pokemon from set A1
pokemon-pocket-mcp-server query --sql "SELECT name, hp, attacks FROM cards WHERE set_code = 'A1' AND name LIKE '% ex%'"
```

## Command 7: trainers

List all Trainer and Item cards (Supporters, Items, Stadiums).

### Options

| Option     | Type   | Description              |
| ---------- | ------ | ------------------------ |
| `--limit`  | number | Max results (default 50) |
| `--output` | string | Output format            |

### Examples

```bash
# List all trainer cards
pokemon-pocket-mcp-server trainers

# Top 20 most useful trainers
pokemon-pocket-mcp-server trainers --limit 20 --output table

# All available trainers
pokemon-pocket-mcp-server trainers --limit 200
```

## Command 8: analyze

Analyze deck composition and validate rules.

### Options

| Option         | Type   | Description                          |
| -------------- | ------ | ------------------------------------ |
| `--card-names` | array  | Card names in deck (comma-separated) |
| `--output`     | string | Output format                        |

### What It Analyzes

- Deck size (must be 20 cards)
- Pokemon vs Trainer ratio
- Energy type count (1-2 recommended)
- Basic Pokemon count (5-6 recommended)
- EX Pokemon count
- Rules compliance warnings
- Recommendations for improvement

### Examples

```bash
# Analyze a deck
pokemon-pocket-mcp-server analyze --card-names Pikachu,"Pikachu ex","Zapdos ex"

# Full deck analysis (comma-separated)
pokemon-pocket-mcp-server analyze --card-names "Pikachu,Pikachu ex,Zapdos ex,Raichu,Professor's Research,Poke Ball, Potion" --output table

# Check validity before building
pokemon-pocket-mcp-server analyze --card-names "Charizard ex,Charmander,Charmeleon,Energy,Energy"
```

### Sample Output

```
==================================================
  Deck Analysis
==================================================

Summary:
  Total Cards: 20/20
  Pokemon: 14
  Trainers: 6
  Energy Types: Fire
  Basic Pokemon: 4
  Evolution Pokemon: 10
  Pokemon ex: 2

Warnings:
  ⚠️  Only 4 Basic Pokemon detected. Recommend 5-6 minimum

Recommendations:
  💡 Add more Basic Pokemon to ensure consistent starts
```

## Tips & Tricks

### Combining with Other Tools

```bash
# Save search results to a file
pokemon-pocket-mcp-server search --type Fire --output json > fire-cards.json

# Count results
pokemon-pocket-mcp-server search --type Water | jq '. | length'

# Find specific patterns with grep
pokemon-pocket-mcp-server search --output compact | grep "ex"
```

### Best Practices

1. **Use `--output table`** for human-readable terminal viewing
2. **Use `--output json`** for scripts and parsing
3. **Use `--output compact`** for quick scans and piping to grep
4. **Quote card names with spaces** and special characters (`"Charizard ex"`)
5. **Use `--limit`** to reduce output for large searches

### Common Patterns

```bash
# Find all EX Pokemon with HP >= 150
pokemon-pocket-mcp-server search --min-hp 150 --output table | grep " ex"

# Show type distribution
pokemon-pocket-mcp-server stats --output table

# Quick card lookup
pokemon-pocket-mcp-server get --name "Pikachu ex" --output compact
```

## See Also

- `/mcp:tools` - MCP tool reference (same functionality via Claude Desktop)
- `docs/06-sql-query-guide.md` - Advanced SQL examples
