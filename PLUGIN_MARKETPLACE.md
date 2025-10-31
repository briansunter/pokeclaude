# Claude Code Plugin Marketplace

This repository includes a comprehensive Claude Code plugin for Pokemon TCG Pocket, extending Claude's capabilities with deck building, card analysis, and AI-powered competitive strategy tools.

## 🎮 Pokemon TCG Pocket Plugin

### Overview

The Pokemon TCG Pocket Claude Plugin transforms Claude into a Pokemon TCG Pocket expert, providing access to 2,000+ cards and AI-powered deck building capabilities.

### Features

✨ **4 Powerful Commands**

- `/pokemon:build-deck` - Build competitive 20-card decks
- `/pokemon:analyze` - Analyze cards and decks with detailed stats
- `/pokemon:find-counters` - Find counter-strategies and Pokemon counters
- `/pokemon:meta` - Get current meta analysis and tier lists

🎯 **4 Auto-Activating Skills**

- Pokemon Deck Builder Skill - Activates for deck building tasks
- Pokemon Card Analyst Skill - Activates for card analysis
- Pokemon Meta Analyst Skill - Activates for competitive discussions
- Pokemon Skill Builder Skill - For building Claude Code skills for Pokemon

🔗 **MCP Server Integration**

- 7 tools for card search and analysis
- 3 resources (2,077 cards, unique cards, type stats)
- 3 prompts (build, counter, optimize decks)
- Real-time access to Pokemon TCG Pocket database

### Database Coverage

- **2,077 total cards** across 12 sets (A1-A4b, P-A)
- **1,068 unique cards** (auto-deduplicated art variants)
- **All rarities** from Common to Secret Rare
- **Complete type system** with weakness/resistance

### Pokemon TCG Pocket Format Integration

✅ **20-card decks** (not 60 like standard TCG)
✅ **Energy Zone** (1 energy/turn auto-generated, NOT from deck)
✅ **3-point win condition** (ex Pokemon = 2 pts, regular = 1 pt)
✅ **3-card bench limit** (not 5 like standard TCG)
✅ **Turn 1 restrictions** (no draw, no energy, no attack)
✅ **Max 2 copies per card**

## 📁 Plugin Structure

```
claude-plugins/
├── marketplace.json           # Plugin marketplace configuration
└── pokemon-tcg-pocket/        # Main plugin
    ├── .claude-plugin/
    │   └── plugin.json       # Plugin configuration
    ├── commands/             # Slash commands
    │   ├── build-deck.md
    │   ├── analyze.md
    │   ├── find-counters.md
    │   └── meta.md
    ├── skills/               # Auto-activating skills
    │   ├── pokemon-deck-building/
    │   ├── pokemon-card-analysis/
    │   ├── pokemon-meta-analysis/
    │   └── pokemon-skill-builder/
    ├── hooks/                # Event-driven hooks (reserved)
    ├── .mcp.json            # MCP server configuration
    ├── README.md            # Plugin documentation
    └── PLUGIN_SUMMARY.md    # Creation summary
```

## 🚀 Installation

### Option 1: Claude Code Plugin Marketplace (Recommended)

**For Claude Code users**, install via the plugin marketplace.

In Claude Code:

```
/plugin marketplace add /path/to/pokeclaude
/plugin install pokemon-tcg-pocket@pokemon-tcg-pocket-marketplace
```

**Benefits:**

- Full plugin with commands and skills
- Auto-activating skills based on context
- Integrated MCP server configuration
- Slash commands for common tasks

**Note:** Only clone the repository if you need to contribute or customize. For normal use, point to an existing local copy of the repo.

### Option 2: Install MCP Server Only (Claude Desktop)

**For Claude Desktop users**, add to your config (`~/Library/Application Support/Claude/claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "pokemon-pocket-mcp": {
      "command": "npx",
      "args": ["pokemon-pocket-mcp-server"],
      "env": {}
    }
  }
}
```

**Benefits:**

- Simple setup
- Always latest version
- Works with any Node.js version
- No manual building required

### Option 3: Local Development (Advanced)

**For contributors and developers only.**

This is the only option where you need to clone the repository:

```bash
git clone https://github.com/briansunter/pokeclaude.git
cd pokeclaude
npm install
npm run build
```

Then in Claude Desktop/Code config:

```json
{
  "mcpServers": {
    "pokemon-pocket-mcp": {
      "command": "node",
      "args": ["/absolute/path/to/pokeclaude/mcp-server/dist/index.js"],
      "env": {}
    }
  }
}
```

**Benefits:**

- Full control over code
- Local customization
- Development setup for contributors

## 💬 Usage Examples

### Deck Building

```
User: /pokemon:build-deck Build a Pikachu ex deck

Claude will:
1. Search for Pikachu ex and variants
2. Find Lightning-type synergies
3. Calculate optimal energy curve
4. Build 20-card deck with max 2 copies
5. Verify Pocket format rules
6. Provide competitive recommendations
7. Suggest counter-strategies

Output:
✓ 20-card Lightning Aggro Deck
✓ Energy Curve: 1.9 average (optimal)
✓ Synergies: Zapdos, Raichu, Electabuzz
✓ Win Rate: 75% vs average deck
✓ Counter-strategies: Fighting-types, Sabrina control
```

### Card Analysis

```
User: /pokemon:analyze Analyze Charizard ex

Claude will:
1. Retrieve Charizard ex card data
2. Analyze stats (150 HP, 120 damage attack)
3. Calculate competitive viability (S-tier, 95/100)
4. Identify synergies (Fire support, energy acceleration)
5. Find counters (Water-types, high-HP Pokemon)
6. Provide strategic recommendations

Output:
=== CHARIZARD EX (CHAOS HURRICANE) ===
Set: Space-Time Smackdown (SVE)
Rarity: Rare Rainbow
Type: Fire | HP: 150
Tier: S | Competitive Viability: 95/100
Weakness: Water (+20 damage)
Recommended Decks: Fire Tempo, Aggro
Win Rate: 65% vs field
```

### Finding Counters

```
User: /pokemon:find-counters What counters Lightning?

Claude will:
1. Identify Lightning weakness (Fighting)
2. Find Fighting-type Pokemon
3. Calculate win rates (70% vs Lightning)
4. Provide complete counter-deck
5. Explain strategic rationale

Output:
COUNTER STRATEGY: Fighting Control

Core Counters:
- Lucario (Community Day) - Primary counter
- Machamp (Genetic Apex) - Heavy hitter
- Primeape (Genetic Apex) - Energy efficient

Expected Win Rate: 75% vs Lightning aggro

Complete Deck List:
- 2x Lucario (Community Day)
- 2x Machamp (Genetic Apex)
- 2x Primeape (Genetic Apex)
- 6x Trainers (support cards)
- Total: 20 cards ✓
```

### Meta Analysis

```
User: /pokemon:meta Current S-tier list

Claude will:
1. Display current tier rankings
2. Show usage statistics
3. Explain strategic positions
4. Provide matchup data

Output:
S-TIER (Dominant):
1. Lightning Aggro (35% meta share)
   - Win Rate: 75%
   - Best Matchups: Water (85%), Grass (80%)
   - Worst Matchups: Fighting (45%)

2. Psychic Control (25% meta share)
   - Win Rate: 70%
   - Best Matchups: Fighting (85%), Grass (75%)
   - Worst Matchups: Darkness (35%)

A-TIER (Competitive):
3. Fire Tempo (20% meta share)
4. Water Stall (15% meta share)
```

## 🛠️ Available MCP Tools

### Core Tools (7 available)

1. **search_cards** - Search with filters (name, type, HP, set, rarity)
2. **get_card** - Get specific card details
3. **find_synergies** - Find cards that work well together
4. **find_counters** - Find counter-strategies
5. **get_type_stats** - Type distribution and averages
6. **analyze_deck** - Comprehensive deck analysis
7. **query_cards** - Custom SQL queries for advanced users

### Resources (3 available)

- `pokemon://cards/all` - Full database (2,077 cards)
- `pokemon://cards/unique` - Unique cards only (1,068 cards)
- `pokemon://stats/types` - Type breakdowns

### Prompts (3 available)

- `build-deck` - Deck building prompt
- `counter-deck` - Counter-strategy prompt
- `optimize-deck` - Deck optimization prompt

## 🎯 Skill Activation

The plugin includes 4 auto-activating skills that respond to context:

### Pokemon Deck Builder Skill

**Activates when:** Building or optimizing decks
**Keywords:** deck, build, optimize, synergy, energy curve
**Provides:** Synergy analysis, energy optimization, competitive validation

### Pokemon Card Analyst Skill

**Activates when:** Analyzing individual cards
**Keywords:** analyze, card, stats, rarity, compare, tier
**Provides:** Stats breakdown, competitive ratings, strategic value

### Pokemon Meta Analyst Skill

**Activates when:** Discussing meta or competitive play
**Keywords:** meta, tier, competitive, strategy, usage, win rate
**Provides:** Tier lists, deck archetypes, usage statistics

### Pokemon Skill Builder Skill

**Activates when:** Building Claude Code skills for Pokemon
**Keywords:** skill, plugin, build, template, MCP
**Provides:** Templates, best practices, integration patterns

## 📊 Database Details

### Card Collection

- **Source:** limitlesstcg.com
- **Total Cards:** 2,077
- **Unique Cards:** 1,068 (art variants auto-deduplicated)
- **Sets:** 12 complete sets (A1 through P-A)
- **Update Frequency:** Automatic via scraper

### Type System

- **18 Types:** Fire, Water, Grass, Lightning, Psychic, Fighting, etc.
- **Weakness/Resistance:** Complete type effectiveness chart
- **Energy Costs:** 0-4 energy per attack
- **Retreat Costs:** 0-4 energy to retreat Pokemon

### Competitive Data

- **Tier Rankings:** S-D based on competitive viability
- **Usage Statistics:** Tournament and ladder data
- **Win Rates:** Matchup-specific calculations
- **Meta Trends:** 30-day rolling analysis

## 🏗️ Development

### Building from Source

```bash
# Clone repository
git clone https://github.com/briansunter/pokeclaude.git
cd pokeclaude

# Install dependencies
npm install

# Build MCP server
npm run build

# Copy card data
cp data/pokemon_pocket_cards.csv mcp-server/data/

# Test locally
cd mcp-server
npm run dev
```

### Testing Commands

```bash
# Type check
npm run typecheck

# Run tests
npm run test

# Build for production
npm run build

# Update card data (incremental)
npm run scrape
npm run scrape:full
```

### Plugin Development

The plugin follows Claude Code standards:

```bash
claude-plugins/
├── marketplace.json           # Marketplace configuration
└── pokemon-tcg-pocket/        # Individual plugin
    ├── .claude-plugin/
    │   └── plugin.json       # Plugin manifest
    ├── commands/             # Slash commands
    ├── skills/               # Auto-activating skills
    └── .mcp.json            # MCP server config
```

## 🔧 Troubleshooting

### MCP Server Not Starting

**Check:**

- Node.js 18+ installed: `node --version`
- Internet connection for npx: `npm ping`
- Valid JSON in config: `jq . claude_desktop_config.json`

**Solution:**

```bash
# Update npm
npm install -g npm@latest

# Clear npm cache
npm cache clean --force

# Restart Claude Desktop
```

### No Cards Found

**Check:**

- CSV file exists: `ls -la mcp-server/data/`
- MCP server logs: Check Claude Desktop logs
- Database load time: ~5 seconds for full database

**Solution:**

```bash
# Rebuild MCP server
cd mcp-server
npm run build

# Verify data
head -5 data/pokemon_pocket_cards.csv
```

### Commands Not Working

**Check:**

- Plugin installed correctly
- Configuration file valid JSON
- Claude Desktop restarted

**Solution:**

1. Restart Claude Desktop completely
2. Check logs: `~/Library/Logs/Claude/`
3. Verify command syntax: `/pokemon:build-deck`

## 📚 Additional Resources

### Documentation

- **Main README.md** - Project overview
- **CLAUDE.md** - Claude Code instructions
- **Plugin README.md** - Plugin-specific docs (in plugin directory)
- **PLUGIN_SUMMARY.md** - Creation summary

### Links

- **Repository:** https://github.com/briansunter/pokeclaude
- **Issues:** https://github.com/briansunter/pokeclaude/issues
- **NPM Package:** https://www.npmjs.com/package/pokemon-pocket-mcp-server

### Community

- **Pokemon TCG Pocket Reddit:** r/PokemonTCGP
- **Discord:** Pokemon TCG Pocket servers
- **Limitless TCG:** https://limitlesstcg.com/

## 🤝 Contributing

Contributions welcome! Areas for contribution:

1. **New Commands** - Add more slash commands
2. **Skill Improvements** - Enhance auto-activating skills
3. **Documentation** - Improve guides and examples
4. **Bug Fixes** - Report and fix issues
5. **Features** - Add new capabilities

### Contribution Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make changes and test: `npm run test`
4. Update documentation
5. Commit with conventional commits
6. Push and create pull request

## 📄 License

MIT License - see LICENSE file for details

## 👨‍💻 Author

**Brian Sunter**

- GitHub: [@briansunter](https://github.com/briansunter)
- Project: [pokeclaude](https://github.com/briansunter/pokeclaude)

## 🙏 Acknowledgments

- Pokemon TCG Pocket community
- Limitless TCG for card data
- Claude Code team for MCP framework
- Pokemon Company International for the game

---

**Note:** This plugin is not affiliated with, endorsed by, or connected to Nintendo, Game Freak, The Pokemon Company, The Pokemon Company International, or any of their subsidiaries. Pokemon and Pokemon character names are trademarks of Nintendo.
