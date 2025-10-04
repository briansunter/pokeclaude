# PokeClaude

<div align="center">
  <img src="clawd.png" alt="Clawd Pokemon Card" width="300"/>

  **Pokemon Pocket TCG MCP Server & Data Scraper**

  Query 2000+ Pokemon cards through Claude Desktop with AI-powered deck building, synergy finding, and strategic analysis.

  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
</div>

---

## ✨ Features

### 🤖 MCP Server
Build decks, find synergies, and counter strategies with AI assistance:
- **7 Powerful Tools** - Search, filter, analyze, and find card synergies
- **2077+ Cards** - Complete Pokemon Pocket TCG database
- **DuckDB-Powered** - Lightning-fast SQL queries
- **Smart Filtering** - Auto-deduplicates art variants (1068 unique cards)
- **Deck Building** - AI prompts for deck construction and optimization
- **Type Analysis** - Strategic counters and weakness exploitation

### 🔄 Auto-Updating Scraper
- **Zero Manual Updates** - Auto-discovers new sets from limitlesstcg.com
- **Incremental Sync** - Only fetches new cards (6-7 min full scrape)
- **Complete Data** - Abilities, attacks, stats, weaknesses, images
- **UUID Primary Keys** - Production-ready database schema

## 🚀 Quick Start

> **Package Manager:** This project works with both **npm** and **bun**. Use whichever you prefer!

### Installation

**With npm:**
```bash
npm install
```

**With bun:**
```bash
bun install
```

### Update Card Data

**With npm:**
```bash
# Incremental update (recommended - only new cards)
npm run scrape

# Full refresh (all cards from scratch)
npm run scrape:full
```

**With bun:**
```bash
# Incremental update (recommended - only new cards)
bun run scrape

# Full refresh (all cards from scratch)
bun run scrape:full
```

### Build MCP Server

**With npm:**
```bash
npm run build
```

**With bun:**
```bash
bun run build
```

### Setup with Claude Desktop

1. Build the server (use npm or bun):
   ```bash
   npm run build
   # or
   bun run build
   ```

2. Add to your Claude Desktop config:

   **macOS/Linux:** `~/Library/Application Support/Claude/claude_desktop_config.json`
   **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

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

3. Restart Claude Desktop

4. Start querying Pokemon cards through Claude!

## 💡 Usage Examples

### Search & Filter Cards
```
🧑 Find all Lightning Pokemon with over 100 HP
🤖 [Searches 1068 unique cards, returns Pikachu ex, Zapdos ex, Raichu, etc.]
```

### AI-Powered Deck Building
```
🧑 Build me a competitive Pikachu ex deck
🤖 [Analyzes synergies, suggests 15-18 energy cards, recommends bench sitters]
```

### Counter Strategy
```
🧑 How do I beat Mewtwo ex decks?
🤖 [Finds Darkness/Metal types that exploit Psychic weakness]
```

### Deck Analysis
```
🧑 Analyze: Charizard ex, Moltres ex, Arcanine ex
🤖 [Reports type distribution, energy needs, missing evolution basics]
```

## 🏗️ Project Structure

```
pokeclaude/
├── mcp-server/           # MCP Server (Claude Desktop integration)
│   ├── src/              # Server source code
│   ├── dist/             # Built output
│   └── README.md         # Detailed API documentation
├── scraper/              # Data scraper
│   └── src/              # Scraper source code
├── data/                 # Card database (CSV)
│   └── pokemon_pocket_cards.csv
└── clawd.png            # Project logo
```

## 🗄️ Database Schema

The scraper exports cards to CSV with the following structure:

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `set_code` | VARCHAR | Set code (A1, A2, etc.) |
| `set_name` | VARCHAR | Full set name |
| `card_number` | VARCHAR | Card number in set |
| `name` | VARCHAR | Card name |
| `type` | VARCHAR | Pokemon type (Fire, Water, etc.) |
| `hp` | VARCHAR | Hit points |
| `rarity` | VARCHAR | Rarity level |
| `abilities` | VARCHAR | Special abilities |
| `attacks` | VARCHAR | Attack names and damage |
| `weakness` | VARCHAR | Type weakness |
| `resistance` | VARCHAR | Type resistance |
| `retreat_cost` | VARCHAR | Retreat cost (0-4) |
| `image_url` | VARCHAR | Card image URL |
| `card_url` | VARCHAR | limitlesstcg.com link |

## 🔧 MCP Server Tools

| Tool | Description |
|------|-------------|
| `search_cards` | Search with filters (name, type, HP, set, etc.) |
| `get_card` | Get specific card details |
| `find_synergies` | Find cards that work well together |
| `find_counters` | Find cards that counter a type/strategy |
| `get_type_stats` | Get statistics by type |
| `query_cards` | Run custom SQL queries |
| `analyze_deck` | Analyze deck composition |

**Plus:** 3 AI prompts for deck building, countering, and optimization.

See **[mcp-server/README.md](./mcp-server/README.md)** for complete API documentation.

## 🎯 How Auto-Discovery Works

The scraper automatically finds new Pokemon Pocket sets:

1. Scrapes limitlesstcg.com main page
2. Discovers all set links (A1, A2, A3, A4b, P-A, etc.)
3. Compares with existing CSV data
4. Only fetches missing cards
5. Merges and exports updated database

**No manual configuration needed** - new sets appear automatically!

## 🛠️ Development

**With npm:**
```bash
# Type check all workspaces
npm run typecheck

# Build MCP server
npm run build

# Update card data
npm run scrape
```

**With bun:**
```bash
# Type check all workspaces
bun run typecheck

# Build MCP server
bun run build

# Update card data
bun run scrape
```

> **Note:** Both package managers are fully supported. Bun is faster for installation and running scripts, while npm has broader compatibility. The CI/CD pipeline uses bun for performance.

## 📊 Data Quality

- ✅ **2077 total cards** across 12 sets
- ✅ **1068 unique cards** (auto-deduplicates art variants)
- ✅ **100% validated** stats and attacks
- ✅ **Zero parsing errors** on production data
- ✅ **Complete metadata** including images and URLs

## 📝 License

MIT

---

<div align="center">
  <sub>Built with ❤️ for Pokemon Pocket TCG players</sub>
</div>
