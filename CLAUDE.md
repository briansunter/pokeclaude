# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is **PokeClaude**, a Pokemon Pocket TCG MCP Server with an auto-updating data scraper. It provides 7 powerful tools for querying 2000+ Pokemon cards through Claude Desktop with AI-powered deck building, synergy finding, and strategic analysis.

### Key Components

1. **MCP Server** (`mcp-server/`) - Claude Desktop integration using Model Context Protocol
2. **Data Scraper** (`scraper/`) - Auto-updates card database from limitlesstcg.com
3. **Card Database** (`data/pokemon_pocket_cards.csv`) - 2077 cards across 12 sets

## Project Structure

```
pokeclaude/
├── mcp-server/                    # MCP Server (Claude Desktop integration)
│   ├── src/
│   │   ├── index.ts              # Main server (MCP SDK + DuckDB)
│   │   ├── gameRules.ts          # Pokemon TCG Pocket rules & constants
│   │   ├── index.test.ts         # Test suite
│   │   └── index.js              # Built output
│   ├── data/                     # Card database (copied during build)
│   └── dist/                     # TypeScript build output
├── scraper/
│   └── src/scraper.ts            # Web scraper with auto-discovery
├── data/
│   └── pokemon_pocket_cards.csv  # Card database (2,077 cards)
└── .github/workflows/            # CI/CD (semantic-release, publish)
```

## Architecture

### MCP Server Architecture

- **MCP SDK** (`@modelcontextprotocol/sdk`) - Protocol implementation over stdio
- **DuckDB** (`@duckdb/node-api`) - In-memory SQL database for fast queries
- **Transport** - stdio (standard input/output) for Claude Desktop
- **Field Presets** - minimal/basic/full to control response size

**Core Flow** (mcp-server/src/index.ts:1):
1. Server starts → Loads CSV into DuckDB in-memory database
2. 7 Tools registered (search, filter, analyze, query)
3. 3 Resources exposed (full cards, unique cards, type stats)
4. 3 Prompts available (build-deck, counter-deck, optimize-deck)
5. Claude Desktop connects via stdio and calls tools

### Scraper Architecture

- **Auto-discovery** - Scrapes limitlesstcg.com to find new sets
- **Incremental updates** - Only fetches new cards (6-7 min full scrape)
- **UUID Primary Keys** - Production-ready database schema
- **Data validation** - Attacks, abilities, stats, weaknesses, images

### DuckDB Database Schema

```sql
cards (
  id: VARCHAR,              -- UUID primary key
  set_code: VARCHAR,        -- A1, A2, A3, etc.
  set_name: VARCHAR,        -- "Genetic Apex"
  card_number: VARCHAR,     -- Card position
  name: VARCHAR,            -- Card name
  type: VARCHAR,            -- Fire, Water, Grass (empty for trainers)
  hp: VARCHAR,              -- Hit points
  rarity: VARCHAR,          -- Rarity level
  abilities: VARCHAR,       -- Pokemon abilities
  attacks: VARCHAR,         -- Attack details
  weakness: VARCHAR,        -- Weakness type
  resistance: VARCHAR,      -- Resistance type
  retreat_cost: VARCHAR,    -- 0-4
  image_url: VARCHAR,       -- Card image
  card_url: VARCHAR         -- limitlesstcg.com link
)
```

## Common Development Commands

### Using npm (recommended for beginners)
```bash
# Type check all workspaces
npm run typecheck

# Build MCP server
npm run build

# Update card data (incremental)
npm run scrape

# Full refresh (all cards from scratch)
npm run scrape:full

# Run MCP server in dev mode
cd mcp-server && npm run dev
```

### Using bun (faster, recommended for contributors)
```bash
# Type check all workspaces
bun run typecheck

# Build MCP server
bun run build

# Update card data (incremental)
bun run scrape

# Full refresh (all cards from scratch)
bun run scrape:full

# Run MCP server in dev mode
cd mcp-server && bun run dev
```

### Scraper-only commands
```bash
# Incremental scrape (only new cards)
npm run scrape

# Full scrape (from scratch)
npm run scrape:full
```

### Workspace-specific commands
```bash
cd mcp-server && npm run build      # Build MCP server
cd scraper && npm run scrape        # Run scraper only
```

## Testing

```bash
# Run tests (uses bun test)
cd mcp-server && npm run test

# Manual server test
cd mcp-server && npm run test:manual
```

**CI Pipeline** (`.github/workflows/release.yml:1`):
- Uses **bun** for performance
- Type checking → Build → Semantic release
- Automatic npm publishing on master/main branch

## MCP Server Tools & Usage

### Core Tools (7 total)

1. **search_cards** - Search with filters (name, type, HP, set, retreat cost)
   - `uniqueOnly` parameter filters art variants (1,068 unique vs 2,077 total)

2. **get_card** - Get specific card details

3. **find_synergies** - Find cards that work well together
   - Returns same type + trainer cards

4. **find_counters** - Find cards that counter a type/strategy
   - Exploits weaknesses (e.g., Darkness/Metal vs Psychic)

5. **get_type_stats** - Statistics by type
   - Count, avg HP, avg retreat cost

6. **query_cards** - Custom SQL queries
   - Direct DuckDB access for advanced users

7. **analyze_deck** - Analyze deck composition
   - Type distribution, energy needs, missing basics

### Resources (3 total)

- **pokemon://cards/all** - Full database (2,077 cards)
- **pokemon://cards/unique** - Unique cards only (1,068 cards)
- **pokemon://stats/types** - Type breakdowns

### Prompts (3 total)

- **build-deck** - Build deck around specific card
- **counter-deck** - Counter a type/strategy
- **optimize-deck** - Improve existing deck

## Data Quality & Updates

### Current Data
- ✅ **2,077 total cards** across 12 sets (A1-A4b, P-A)
- ✅ **1,068 unique cards** (auto-deduplicates 43.5% art variants)
- ✅ **1068 unique cards** with attacks (filters trainers, non-combat)
- ✅ **100% verified** via spot checks
- ✅ **Zero parsing errors** on production data

### Auto-Discovery Process
1. Scrapes limitlesstcg.com main page
2. Discovers all set links (A1, A2, A3, A4b, P-A, etc.)
3. Compares with existing CSV data
4. Only fetches missing cards
5. Merges and exports updated database

**No manual configuration needed** - new sets appear automatically!

## Package Publishing

### Published Package
The `mcp-server` is published to npm as `pokemon-pocket-mcp-server`:
- **Usage**: `npx pokemon-pocket-mcp-server` or `bunx pokemon-pocket-mcp-server`
- **Auto-updates**: Always uses latest published version
- **Files bundled**: `dist`, `data/pokemon_pocket_cards.csv`, `README.md`

### Claude Desktop Setup

**Using npx (works with any Node):**
```json
{
  "mcpServers": {
    "pokemon-pocket": {
      "command": "npx",
      "args": ["pokemon-pocket-mcp-server"]
    }
  }
}
```

**Using bunx (faster, requires bun):**
```json
{
  "mcpServers": {
    "pokemon-pocket": {
      "command": "bunx",
      "args": ["pokemon-pocket-mcp-server"]
    }
  }
}
```

### Local Development Setup

After building, use absolute path in config:
```json
{
  "mcpServers": {
    "pokemon-pocket": {
      "command": "node",
      "args": ["/absolute/path/to/pokeclaude/mcp-server/dist/index.js"]
    }
  }
}
```

## Game Rules Integration

**Pokemon TCG Pocket Format** (mcp-server/src/gameRules.ts:8):

- **Deck Size**: 20 cards
- **Win Condition**: 3 points (ex Pokemon = 2 pts, regular = 1 pt)
- **Bench Slots**: Max 3 (not 5 like standard TCG)
- **Energy Zone**: Auto-generates 1 Energy/turn (NOT from deck)
- **Turn 1**: No draw, no energy, no attack
- **Energy Types**: 1-2 recommended (3+ = inconsistent)
- **Max Copies**: 2 copies per card

These rules are integrated into deck analysis and optimization prompts.

## Key Implementation Details

### Duplicate Filtering
Cards are considered unique by: `name`, `type`, `hp`, `attacks`, `weakness`, `retreat_cost`

**Example**:
- Pikachu ex (Circle Circuit) appears 7 times across sets = **1 unique card**
- Pikachu has 7 different attack versions = **7 unique cards**

### Field Selection (mcp-server/src/index.ts:16)

Three presets to control response size:
- **minimal**: `['id', 'name']` - Smallest response
- **basic**: Common fields without images (default)
- **full**: All 15 fields including set info, images, URLs

### Build Process
1. `prebuild` script copies CSV from `../data/` to `mcp-server/data/`
2. TypeScript compilation outputs to `mcp-server/dist/`
3. Published package includes: `dist/`, `data/`, `README.md`

## Semantic Release

**Automatic versioning & publishing**:
- **Triggers**: Push to master/main or merged PR
- **Workflow**: Checkout → Setup Bun → Install → Typecheck → Build → Release
- **Token**: Requires `NPM_TOKEN` secret for npm publishing

## Troubleshooting

### Server not in Claude Desktop
- Check config path: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Verify absolute path to `dist/index.js`
- Restart Claude Desktop completely
- Check logs: `~/Library/Logs/Claude/`

### DuckDB errors
- Ensure CSV exists at `mcp-server/data/pokemon_pocket_cards.csv`
- Run `npm run build` to copy CSV
- Check CSV encoding (should be UTF-8)

### Scraper issues
- Timeout: Scraper has 30s timeout per request
- User-Agent: Configured to avoid blocking
- Network errors: Incremental mode skips failed sets

## Important Files

- **README.md** - Project overview and quick start
- **mcp-server/README.md** - Detailed MCP API documentation
- **mcp-server/src/index.ts** - Main server implementation
- **mcp-server/src/gameRules.ts** - Pokemon TCG Pocket rules
- **scraper/src/scraper.ts** - Web scraper with auto-discovery
- **data/pokemon_pocket_cards.csv** - Card database (2,077 cards)
- **.github/workflows/release.yml** - CI/CD pipeline
- **package.json** - Root workspace configuration
- **mcp-server/package.json** - Published package config

## Example Workflows

### 1. Add New Card Data
```bash
npm run scrape        # Incremental update (6-7 min)
npm run build         # Build MCP server with new data
# Test locally or publish to npm
```

### 2. Modify MCP Tools
```bash
cd mcp-server
npm run dev           # Run in dev mode (auto-reload)
# Edit src/index.ts
npm run typecheck     # Check types
npm run test          # Run tests
npm run build         # Build for production
```

### 3. Update Game Rules
```bash
# Edit mcp-server/src/gameRules.ts
# Add new constants, update GAME_CONTEXT
npm run typecheck     # Verify changes
npm run test          # Ensure tests pass
```

## Package Managers

**Both npm and bun fully supported:**
- **npm**: Broader compatibility, easier for beginners
- **bun**: Faster installation and script execution
- **CI/CD**: Uses bun for performance

Choose based on preference - all commands work with both!
