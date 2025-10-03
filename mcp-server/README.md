# Pokemon Pocket MCP Server

MCP server that enables AI agents (like Claude Code) to query and analyze Pokemon Pocket TCG cards using DuckDB for high-performance SQL queries.

## Features

### 🔧 Tools (7 total)

1. **search_cards** - Search with flexible filters (name, type, HP, set, retreat cost, etc.)
2. **get_card** - Get detailed info for a specific card
3. **find_synergies** - Find cards that work well together (same type + trainers)
4. **find_counters** - Find cards that counter a specific type (exploit weakness)
5. **get_type_stats** - Get statistics by type (count, avg HP, avg retreat cost)
6. **query_cards** - Run custom SQL queries against the card database
7. **analyze_deck** - Analyze deck composition (energy needs, type distribution)

### 📚 Resources (3 total)

1. **pokemon://cards/all** - Full card database (2,077 cards)
2. **pokemon://cards/unique** - Unique cards only (excludes art variants)
3. **pokemon://stats/types** - Type statistics and breakdowns

### 💡 Prompts (3 total)

1. **build-deck** - Build a deck around a specific card
2. **counter-deck** - Build a deck to counter a type/strategy
3. **optimize-deck** - Analyze and improve an existing deck

## Installation

```bash
cd mcp-server
npm install
npm run build
```

## Setup with Claude Desktop

Add this to your Claude Desktop config (`~/Library/Application Support/Claude/claude_desktop_config.json` on macOS):

```json
{
  "mcpServers": {
    "pokemon-pocket": {
      "command": "node",
      "args": [
        "/Users/bsunter/code/pokeclaude/mcp-server/dist/index.js"
      ]
    }
  }
}
```

Restart Claude Desktop after adding the configuration.

## Usage Examples

### Example 1: Search for Lightning Pokemon

```
User: Find all Lightning type Pokemon with at least 100 HP
Claude: [Uses search_cards tool]
{
  "type": "Lightning",
  "minHp": 100
}
```

### Example 2: Build a Pikachu ex Deck

```
User: Build me a competitive deck around Pikachu ex
Claude: [Uses build-deck prompt]
- Finds Pikachu ex stats
- Uses find_synergies to get Lightning Pokemon
- Suggests Zapdos ex, Electrode, Magneton
- Recommends 15-18 energy cards
- Explains combo: Circle Circuit scales with bench
```

### Example 3: Counter Mewtwo ex Decks

```
User: What beats Mewtwo ex?
Claude: [Uses find_counters tool]
{
  "targetType": "Psychic"
}
→ Returns Darkness and Metal types (Mewtwo's weakness)
→ Suggests Weavile ex, Melmetal, Gengar
```

### Example 4: Analyze Existing Deck

```
User: Analyze this deck: Charizard ex, Moltres ex, Arcanine ex, Professor Oak
Claude: [Uses analyze_deck tool]
{
  "cardNames": ["Charizard ex", "Moltres ex", "Arcanine ex", "Professor Oak"]
}
→ Type distribution: 100% Fire
→ Energy needs: Heavy Fire requirement
→ Suggests adding evolution basics (Charmander, Growlithe)
```

### Example 5: Custom SQL Query

```
User: Show me all Pokemon with 0 retreat cost and at least 100 HP
Claude: [Uses query_cards tool]
SELECT name, type, hp, attacks
FROM cards
WHERE retreat_cost = '0'
  AND CAST(hp AS INTEGER) >= 100
  AND attacks != ''
ORDER BY CAST(hp AS INTEGER) DESC
```

## Advanced Usage

### Find Synergies

```javascript
// Finds cards that work well with Charizard ex
{
  "cardName": "Charizard ex"
}
// Returns:
// - Other Fire types (Moltres ex, Arcanine ex)
// - Trainer cards
// - Cards with complementary energy costs
```

### Type Statistics

```javascript
// Get breakdown of all types
{} // No parameters needed
// Returns:
// {
//   "type": "Fire",
//   "count": 150,
//   "avg_hp": 95.5,
//   "avg_retreat_cost": 1.8
// }
```

## Data Quality

- ✅ **2,077 total cards** from 12 sets (A1-A4b, P-A)
- ✅ **100% verified** via spot checks (47+ cards manually validated)
- ✅ **Zero parsing errors** on names, types, HP values
- ✅ **Complete attack data** including:
  - Normal damage attacks (e.g., "Slash: 60")
  - Effect-only attacks (e.g., "Stoke:")
  - Variable damage (e.g., "Hydro Pump 40+:")
  - Multipliers (e.g., "Circle Circuit: 30x")

## Database Schema

```sql
CREATE TABLE cards (
  id VARCHAR,              -- UUID primary key
  set_code VARCHAR,        -- A1, A2, A3, etc.
  set_name VARCHAR,        -- "Genetic Apex", etc.
  card_number VARCHAR,     -- Card number in set
  name VARCHAR,            -- Card name
  type VARCHAR,            -- Fire, Water, Grass, etc. (empty for trainers)
  hp VARCHAR,              -- Hit points
  rarity VARCHAR,          -- Rarity level
  abilities VARCHAR,       -- Pokemon abilities
  attacks VARCHAR,         -- Attack details
  weakness VARCHAR,        -- Weakness type
  resistance VARCHAR,      -- Resistance type
  retreat_cost VARCHAR,    -- Retreat cost (0-4)
  image_url VARCHAR,       -- Card image URL
  card_url VARCHAR         -- limitlesstcg.com URL
);
```

## Example Deck Building Workflow

1. **Choose main attacker**: `get_card("Pikachu ex")`
2. **Find synergies**: `find_synergies("Pikachu ex")` → Get Lightning Pokemon
3. **Check counters**: `find_counters("Lightning")` → See what beats you
4. **Search support**: `search_cards({ type: "Lightning", maxHp: 80 })` → Find bench sitters
5. **Analyze composition**: `analyze_deck([...cardNames])` → Check energy needs
6. **Optimize**: Use prompt "optimize-deck" for AI suggestions

## SQL Query Examples

```sql
-- Highest HP Pokemon by type
SELECT type, name, hp
FROM cards
WHERE type != ''
GROUP BY type
ORDER BY CAST(hp AS INTEGER) DESC;

-- Cards with 0 retreat cost
SELECT name, type, hp, attacks
FROM cards
WHERE retreat_cost = '0' AND attacks != '';

-- Most common weaknesses
SELECT weakness, COUNT(*) as count
FROM cards
WHERE weakness != ''
GROUP BY weakness
ORDER BY count DESC;

-- Cards from latest set
SELECT name, type, hp
FROM cards
WHERE set_code = 'A4b'
ORDER BY CAST(card_number AS INTEGER);
```

## Development

```bash
# Run in dev mode
npm run dev

# Type check
npm run typecheck

# Build
npm run build

# Run built version
npm start
```

## Architecture

- **MCP SDK**: `@modelcontextprotocol/sdk` v1.0.4 for protocol implementation
- **DuckDB**: `@duckdb/node-api` v1.4.0 - High-performance in-memory SQL database with TypeScript support
- **CSV Import**: Loads `pokemon_pocket_cards.csv` on startup into memory
- **Transport**: stdio (standard input/output) for Claude Desktop integration
- **Type Safety**: Full TypeScript types for DuckDB operations
- **BigInt Handling**: Automatic JSON serialization via `getRowObjectsJson()`

## Troubleshooting

### Server not appearing in Claude Desktop

1. Check config file location: `~/Library/Application Support/Claude/claude_desktop_config.json`
2. Verify path to `dist/index.js` is absolute
3. Restart Claude Desktop completely
4. Check logs: `~/Library/Logs/Claude/`

### DuckDB errors

- Ensure CSV file exists at `../pokemon_pocket_cards.csv` relative to `dist/index.js`
- Check CSV formatting (should be UTF-8 encoded)

### Permission errors

```bash
chmod +x dist/index.js
```

## Data Source

Cards scraped from [limitlesstcg.com/pocket](https://pocket.limitlesstcg.com) using the scraper in `../scraper.ts`.

Quality reports:
- `../SPOT_CHECK_REPORT.md` - Manual verification results
- `../COMPREHENSIVE_QA_REPORT.md` - DuckDB analysis results

## License

MIT
