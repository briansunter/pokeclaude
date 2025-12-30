# Pokemon Pocket CLI

Reference for using the `pokemon-pocket-mcp-server` package as a terminal CLI tool.

## Installation

```bash
# Install globally
npm install -g pokemon-pocket-mcp-server

# Or use npx without installation
npx pokemon-pocket-mcp-server <command>

# Or use bunx (faster, requires bun)
bunx pokemon-pocket-mcp-server <command>
```

## Commands

| Command     | Description                     |
| ----------- | ------------------------------- |
| `search`    | Search cards with filters       |
| `get`       | Get specific card by name       |
| `synergies` | Find synergies for a card       |
| `counters`  | Find counters for a type        |
| `stats`     | Show type statistics            |
| `query`     | Run custom SQL query            |
| `trainers`  | List all trainer and item cards |
| `analyze`   | Analyze deck composition        |

## Quick Examples

```bash
# Search for Pikachu cards (table output)
pokemon-pocket-mcp-server search --name Pikachu --output table

# Get specific card details
pokemon-pocket-mcp-server get --name "Charizard ex"

# Find synergies for a card
pokemon-pocket-mcp-server synergies --card-name "Blastoise ex"

# Find counters for a type
pokemon-pocket-mcp-server counters --target-type Psychic

# Show type statistics
pokemon-pocket-mcp-server stats --output table

# List trainer cards
pokemon-pocket-mcp-server trainers --limit 20

# Custom SQL query
pokemon-pocket-mcp-server query --sql "SELECT name, hp FROM cards WHERE hp > 150 LIMIT 10"

# Analyze a deck
pokemon-pocket-mcp-server analyze --card-names Pikachu,"Pikachu ex","Zapdos ex"
```

## Output Formats

All commands support three output formats via `--output` (or `-o`):

| Format    | Description                 |
| --------- | --------------------------- |
| `json`    | Structured JSON (default)   |
| `table`   | Human-readable table format |
| `compact` | Single-line per card format |

```bash
pokemon-pocket-mcp-server stats --output table
pokemon-pocket-mcp-server search --type Fire --output compact
```

## Getting Help

```bash
# Show all commands
pokemon-pocket-mcp-server --help

# Show command-specific help
pokemon-pocket-mcp-server search --help
```

## See Also

- `docs/00-cli-reference.md` - Complete CLI documentation with all options
- `/mcp:install` - MCP server setup for Claude Desktop
