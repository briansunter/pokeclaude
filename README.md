# PokeClaude

Pokemon Pocket TCG MCP Server and Data Scraper - Query Pokemon cards through Claude Desktop with up-to-date scraped data.

## Features

### MCP Server
- **Full card database** with 2000+ Pokemon Pocket TCG cards
- **DuckDB-powered** for fast SQL queries
- **MCP integration** for use with Claude Desktop
- Rich card data: stats, types, attacks, weaknesses, images
- Field filtering to optimize context usage

### Data Scraper
- **Auto-discovers new sets** - No manual updates needed!
- Scrapes all available sets from limitlesstcg.com
- Incremental updates (only fetch new cards)
- Full card details with abilities, attacks, and stats
- Exports to CSV with UUID primary keys

## Project Structure

```
pokeclaude/
├── mcp-server/          # MCP server for Claude Desktop
│   ├── src/             # Server source code
│   ├── tests/           # Test files
│   ├── docs/            # Documentation
│   └── dist/            # Built output
├── scraper/             # Data scraper
│   └── src/             # Scraper source code
├── data/                # Card data (CSV)
├── docs/                # Project documentation
├── logs/                # Archived logs
└── archive/             # Old/deprecated files
```

## Installation

```bash
npm install
```

## Usage

### Incremental Update (Default - Recommended)

Only scrapes new cards that haven't been added yet:

```bash
npm run scrape
```

This will:
1. Load existing cards from `data/pokemon_pocket_cards.csv`
2. Auto-discover all available sets
3. Only scrape cards that don't exist in the CSV
4. Merge new cards with existing data
5. Export combined result
6. **Much faster** - skips already-scraped cards!

### Full Scrape

Scrape all cards from scratch (ignores existing data):

```bash
npm run scrape:full
```

This will:
1. Ignore existing CSV data
2. Scrape all cards from all sets (~2000+ cards)
3. Extract detailed information for each card
4. Overwrite `data/pokemon_pocket_cards.csv`
5. Takes approximately 6-7 minutes to complete

### Build MCP Server

```bash
npm run build
```

### Type Check

```bash
npm run typecheck
```

## Output Format

The CSV includes these columns:
- `id` - UUID primary key
- `set_code` - Set code (e.g., "A1", "A2")
- `set_name` - Full set name
- `card_number` - Card number within set
- `name` - Card name
- `type` - Pokemon type
- `hp` - Hit points
- `rarity` - Rarity level
- `abilities` - Special abilities
- `attacks` - Attack names and damage
- `weakness` - Type weakness
- `resistance` - Type resistance
- `retreat_cost` - Retreat cost number
- `image_url` - CDN URL for card image
- `card_url` - Link to card detail page

## Auto-Discovery

The scraper **automatically discovers new sets** from limitlesstcg.com:

1. Scrapes the main cards page
2. Finds all set links (e.g., `/cards/A5`, `/cards/A6`)
3. Automatically scrapes newly discovered sets
4. Falls back to known sets if discovery fails

See [docs/AUTO_DISCOVERY.md](./docs/AUTO_DISCOVERY.md) for details.

## MCP Server Usage

The MCP server provides tools for querying Pokemon cards:
- `search_cards` - Search by name
- `get_card_by_id` - Get specific card
- `get_cards_by_type` - Filter by Pokemon type
- `get_cards_by_set` - Get all cards from a set
- `filter_cards` - Advanced multi-criteria filtering
- `get_stats` - Database statistics

See [mcp-server/README.md](./mcp-server/README.md) for full documentation.

## Documentation

- [MCP Server README](./mcp-server/README.md) - Server usage and API
- [Auto Discovery](./docs/AUTO_DISCOVERY.md) - How auto-discovery works
- [CSV Structure](./docs/CSV_STRUCTURE_REPORT.md) - Data format details
- [Test Files](./mcp-server/tests/) - Integration tests

## Notes

- The scraper includes rate limiting to be respectful to the server
- New sets are automatically discovered when they appear on limitlesstcg.com
- The scraper will continue even if individual cards fail to load
- If auto-discovery fails, uses fallback list of known sets
