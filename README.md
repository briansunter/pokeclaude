# PokeClaude

<div align="center">
  <img src="clawd.png" alt="Clawd Pokemon Card" width="300"/>

**Pokemon TCG Pocket MCP Server & CLI**

Query 2000+ Pokemon cards through Claude with AI-powered deck building, synergy finding, and strategic analysis.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://img.shields.io/npm/v/pokeclaude.svg)](https://www.npmjs.com/package/pokeclaude)

</div>

---

## Quick Start

### Claude Code Plugin

Add to your `.mcp.json`:

```json
{
  "mcpServers": {
    "pokeclaude": {
      "command": "bunx",
      "args": ["pokeclaude", "mcp"],
      "type": "stdio"
    }
  }
}
```

### NPM Package

```bash
# Run MCP server
bunx pokeclaude mcp

# Or install globally
npm install -g pokeclaude
pokeclaude mcp
```

## Features

- **2,077 Cards** - Complete Pokemon Pocket TCG database
- **8 MCP Tools** - Search, analyze, find synergies, counters
- **DuckDB-Powered** - Lightning-fast SQL queries
- **CLI + MCP** - Unified interface for all uses
- **4 Skills** - Auto-activating Claude Code skills
- **5 Commands** - Slash commands for common tasks

## CLI Usage

```bash
# Search for cards
pokeclaude search --type Fire --limit 10

# Get card details
pokeclaude get --name "Pikachu ex"

# Find synergies
pokeclaude synergies --card-name "Charizard ex"

# Find counters
pokeclaude counters --target-type Fire

# Analyze deck
pokeclaude analyze --card-names "Pikachu ex" "Raichu"

# Show type stats
pokeclaude stats

# Run custom SQL
pokeclaude query --sql "SELECT * FROM cards WHERE hp > 200"

# List trainers
pokeclaude trainers --limit 20

# Start MCP server
pokeclaude mcp
```

## MCP Tools

| Tool | Description |
|------|-------------|
| `search_cards` | Search cards with filters (name, type, HP, set, etc.) |
| `get_card` | Get specific card details by exact name |
| `find_synergies` | Find cards that synergize with a given Pokemon |
| `find_counters` | Find counters for a specific type |
| `get_type_stats` | Get type distribution statistics |
| `query_cards` | Run custom SQL queries (SELECT only) |
| `list_trainers` | List all trainer and item cards |
| `analyze_deck` | Analyze deck composition and rules compliance |

## Commands

- `/pokeclaude:build-deck` - Build competitive 20-card decks
- `/pokeclaude:analyze` - Analyze cards or decks
- `/pokeclaude:find-counters` - Find counter strategies
- `/pokeclaude:meta` - Current meta analysis
- `/pokeclaude:cli` - CLI reference

## Skills

The plugin includes 4 auto-activating skills:

- **Pokemon Deck Builder** - Activates for deck building tasks
- **Pokemon Card Analyst** - Activates for card analysis
- **Pokemon Meta Analyst** - Activates for meta discussions
- **Pokemon Skill Builder** - For building Claude Code skills

## Pokemon TCG Pocket Rules

- **Deck Size:** 20 cards
- **Energy Zone:** 1 energy/turn auto-generated (NOT from deck)
- **Win Condition:** 3 points (ex Pokemon = 2 pts, regular = 1 pt)
- **Bench Limit:** 3 Pokemon
- **Max Copies:** 2 per card

## Project Structure

```
pokeclaude/
├── .claude-plugin/
│   └── plugin.json      # Plugin metadata
├── .mcp.json            # MCP server config
├── cli.ts               # CLI entry point with mcp subcommand
├── index.ts             # MCP server exports
├── src/                 # Source files
│   ├── cli.ts           # CLI commands
│   ├── db.ts            # DuckDB client
│   ├── types.ts         # Type definitions
│   └── ...
├── skills/              # Claude Code skills
│   ├── pokemon-card-analysis/
│   ├── pokemon-deck-building/
│   ├── pokemon-meta-analysis/
│   └── pokemon-skill-builder/
├── commands/            # Slash commands
├── references/          # Research and documentation
├── data/                # Card database CSV
└── package.json
```

## Development

```bash
# Install dependencies
bun install

# Run in development mode
bun dev

# Run MCP server
bun mcp

# Build for production
bun run build

# Run tests
bun test

# Update card data
bun run scrape
```

## Database

- **Source:** limitlesstcg.com
- **Total Cards:** 2,077 across 12 sets
- **Unique Cards:** 1,068 (art variants auto-deduplicated)
- **Update:** Automatic via scraper

## License

MIT

## Author

Brian Sunter - [@briansunter](https://github.com/briansunter)

---

**Note:** This plugin is not affiliated with Nintendo, Game Freak, The Pokemon Company, or any of their subsidiaries.
