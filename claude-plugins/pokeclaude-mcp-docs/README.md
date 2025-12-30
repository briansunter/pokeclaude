# PokeClaude MCP Documentation

Complete documentation for using PokeClaude with MCP (Model Context Protocol) - primarily for Claude Desktop integration.

## Commands

| Command          | Description                       |
| ---------------- | --------------------------------- |
| `/mcp:install`   | Install Pokemon Pocket MCP server |
| `/mcp:setup`     | Configure Claude Desktop          |
| `/mcp:tools`     | Reference for all MCP tools       |
| `/mcp:resources` | Reference for MCP resources       |
| `/mcp:prompts`   | Reference for MCP prompts         |
| `/mcp:sql`       | SQL query guide                   |
| `/mcp:dev`       | Local development setup           |

## Documentation

See the `docs/` directory for comprehensive guides:

- `00-installation.md` - MCP server installation
- `01-claude-desktop-setup.md` - Claude Desktop configuration
- `02-tools-reference.md` - All 8 MCP tools
- `03-resources-reference.md` - All 3 MCP resources
- `04-prompts-reference.md` - All 3 MCP prompts
- `05-api-examples.md` - Practical API usage
- `06-sql-query-guide.md` - Advanced SQL
- `07-local-development.md` - Running from source
- `08-troubleshooting.md` - MCP-specific issues
- `09-database-schema.md` - Complete schema

## What is MCP?

MCP (Model Context Protocol) is a standard for connecting AI assistants to external tools and data sources.

PokeClaude's MCP server provides:

- **8 tools** for querying Pokemon cards
- **3 resources** for accessing card databases
- **3 prompts** for AI-guided deck building

## Quick Start

1. **Install the MCP server** - See `/mcp:install`
2. **Configure Claude Desktop** - See `/mcp:setup`
3. **Start querying cards!** - See `/mcp:tools`
