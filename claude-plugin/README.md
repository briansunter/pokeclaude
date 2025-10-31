# Pokemon TCG Pocket Claude Plugin

A comprehensive Claude Code plugin for Pokemon TCG Pocket featuring deck building, card analysis, meta insights, and AI-powered competitive strategy guidance.

## Overview

This plugin integrates the Pokemon Pocket MCP server to provide access to 2,000+ Pokemon cards across 12 sets, enabling advanced deck building and analysis workflows directly in Claude Code.

## Features

### 🚀 Core Capabilities

- **Deck Building**: AI-powered deck construction with synergy analysis
- **Card Analysis**: Detailed stats, competitive ratings, and strategic value
- **Meta Insights**: Current tier lists, usage statistics, and strategic recommendations
- **Counter Strategies**: Find counters to specific Pokemon, types, and deck archetypes

### 📊 Database Coverage

- **2,077 total cards** across all sets (A1-A4b, P-A)
- **1,068 unique cards** (auto-deduplicated art variants)
- **12 complete sets** from Genetic Apex to Shining Revelry
- **All rarities** from Common to Secret Rare

### 🎮 Pokemon TCG Pocket Integration

This plugin is specifically designed for **Pokemon TCG Pocket** (mobile game format), which differs from standard TCG:

- **20-card decks** (not 60)
- **Energy Zone** (1 energy/turn auto-generated, NOT from deck)
- **3-point win condition** (ex Pokemon = 2 pts, regular = 1 pt)
- **3-card bench limit** (not 5 like standard TCG)
- **Turn 1 restrictions** (no draw, no energy, no attack)

## Installation

### Option 1: Install from GitHub (Recommended)

1. Clone or download the plugin:

```bash
git clone https://github.com/briansunter/pokeclaude.git
```

2. Add to Claude Desktop configuration:

```json
{
  "mcpServers": {
    "pokemon-tcg-pocket": {
      "command": "npx",
      "args": ["pokemon-pocket-mcp-server"],
      "env": {},
      "description": "Pokemon TCG Pocket MCP Server with 2000+ cards"
    }
  }
}
```

3. Restart Claude Desktop

### Option 2: Local Development

After building the Pokemon MCP server:

```json
{
  "mcpServers": {
    "pokemon-tcg-pocket": {
      "command": "node",
      "args": ["/absolute/path/to/pokeclaude/mcp-server/dist/index.js"]
    }
  }
}
```

## Commands

### `/pokemon:build-deck`

Build a competitive 20-card Pokemon TCG Pocket deck.

**Usage:**

```
/pokemon:build-deck Build a deck around Pikachu ex
/pokemon:build-deck Create an aggro Lightning deck
/pokemon:build-deck Build a budget Fire-type deck
```

**What it does:**

1. Researches core Pokemon using 2,000+ card database
2. Finds synergies via integrated AI analysis
3. Calculates optimal energy curve for Pocket format
4. Verifies deck composition (20 cards, max 2 copies)
5. Provides competitive recommendations

### `/pokemon:analyze`

Analyze Pokemon cards or decks with detailed statistics.

**Usage:**

```
/pokemon:analyze Analyze Charizard ex
/pokemon:analyze Review my Lightning deck
/pokemon:analyze Compare Pikachu vs Raichu
```

**What it does:**

- Card analysis: Stats, rarity, competitive tier, strategic value
- Deck analysis: Composition, energy curve, optimization suggestions
- Comparison: Side-by-side card evaluations
- Meta positioning: Win rates and usage statistics

### `/pokemon:find-counters`

Find Pokemon and strategies that counter specific threats.

**Usage:**

```
/pokemon:find-counters What counters Pikachu ex?
/pokemon:find-counters Find counters to Lightning types
/pokemon:find-counters Anti-meta deck recommendations
```

**What it does:**

- Type-based counters using Pokemon effectiveness chart
- Specific Pokemon counters with damage calculations
- Deck archetype counters (aggro, control, tempo)
- Complete counter-deck examples with win rates

### `/pokemon:meta`

Get current Pokemon TCG Pocket meta analysis and tier lists.

**Usage:**

```
/pokemon:meta Current S-tier deck list
/pokemon:meta Lightning vs Fire win rate
/pokemon:meta Best deck for tournaments
```

**What it does:**

- Current tier rankings (S-D)
- Deck archetype analysis
- Usage statistics and win rates
- Matchup matrix and strategic recommendations
- Meta trend analysis

## Skills

The plugin includes 4 specialized skills that auto-activate based on context:

### 1. Pokemon Deck Builder

**Activates:** When building or optimizing decks
**Features:** Synergy analysis, energy optimization, competitive validation

### 2. Pokemon Card Analyst

**Activates:** When analyzing individual cards
**Features:** Stats breakdown, rarity assessment, competitive ratings

### 3. Pokemon Meta Analyst

**Activates:** When discussing meta or competitive play
**Features:** Tier lists, deck archetypes, usage statistics

### 4. Pokemon Skill Builder

**Activates:** When building Claude Code skills for Pokemon
**Features:** Skill templates, MCP integration patterns, best practices

## MCP Server Integration

The Pokemon TCG Pocket plugin uses the `pokemon-pocket-mcp-server` package to provide real-time card data access.

### Available Tools (7 total)

1. **search_cards** - Search with filters (name, type, HP, set, rarity)
2. **get_card** - Get specific card details
3. **find_synergies** - Find cards that work well together
4. **find_counters** - Find counter-strategies
5. **get_type_stats** - Type distribution and averages
6. **analyze_deck** - Comprehensive deck analysis
7. **query_cards** - Custom SQL queries for advanced users

### Available Resources (3 total)

- `pokemon://cards/all` - Full database (2,077 cards)
- `pokemon://cards/unique` - Unique cards only (1,068 cards)
- `pokemon://stats/types` - Type breakdowns

### Available Prompts (3 total)

- `build-deck` - Deck building prompt
- `counter-deck` - Counter-strategy prompt
- `optimize-deck` - Deck optimization prompt

## Example Workflows

### Building a Competitive Deck

```
User: /pokemon:build-deck Build a Mewtwo ex deck

Claude will:
1. Search for Mewtwo ex and variants
2. Find Psychic-type synergies
3. Calculate energy requirements
4. Build 20-card deck with max 2 copies
5. Analyze deck composition
6. Provide optimization suggestions
7. Recommend counter-strategies
```

### Analyzing Cards

```
User: /pokemon:analyze Is Pikachu ex worth using?

Claude will:
1. Retrieve Pikachu ex card data
2. Analyze stats (110 HP, 70-damage attack)
3. Calculate competitive viability (A-tier, 85/100)
4. Identify synergies (Lightning types)
5. Find counters (Fighting-types)
6. Provide strategic recommendations
```

### Finding Counters

```
User: /pokemon:find-counters What beats Lightning aggro?

Claude will:
1. Identify Lightning weakness (Fighting)
2. Find Fighting-type Pokemon
3. Calculate win rates (70% vs Lightning)
4. Provide complete counter-deck
5. Explain strategic rationale
```

### Meta Analysis

```
User: /pokemon:meta What's the current S-tier?

Claude will:
1. Display S-tier deck lists
2. Show usage statistics
3. Explain tier rationale
4. Provide matchup data
5. Give strategic recommendations
```

## Plugin Structure

```
claude-plugin/               # Pokemon TCG Pocket Claude Plugin
├── .claude-plugin          # Plugin marker file
├── plugin.json             # Plugin configuration
├── .mcp.json              # MCP server config
├── README.md              # This file
├── PLUGIN_SUMMARY.md      # Plugin creation summary
├── commands/              # Slash commands (4 total)
│   ├── build-deck.md      # Deck building command
│   ├── analyze.md         # Card/deck analysis
│   ├── find-counters.md   # Counter strategies
│   └── meta.md            # Meta analysis
├── skills/                # Auto-activating skills (4 total)
│   ├── pokemon-deck-building/
│   │   └── SKILL.md
│   ├── pokemon-card-analysis/
│   │   └── SKILL.md
│   ├── pokemon-meta-analysis/
│   │   └── SKILL.md
│   └── pokemon-skill-builder/
│       └── SKILL.md
└── docs/                  # Comprehensive research (24 documents)
    └── pokemon-tcg-pocket-research/
        ├── MASTER-INDEX.md      # Navigation guide
        ├── CONVERSATION-SUMMARY.md
        ├── RESEARCH-PLAN.md
        ├── rules/               # Core rules (1 guide)
        ├── deckbuilding/        # Deck building (3 guides)
        ├── strategies/          # Strategies (9 guides)
        ├── meta/                # Meta analysis (3 guides)
        ├── card-guides/         # Card evals (3 guides)
        └── complete-guides/     # Progression (3 guides)
```

## Requirements

- Claude Desktop with MCP support
- Node.js 18+ (for npx)
- Internet connection (for npx package installation)

## Development

### Building from Source

```bash
cd pokeclaude
npm install
npm run build

# Copy data
cp data/pokemon_pocket_cards.csv mcp-server/data/

# Test locally
cd mcp-server
npm run dev
```

### Testing Commands

```bash
# Validate plugin structure
python ~/.claude/skills/plugin-builder/scripts/validate_plugin.py pokemon-tcg-pocket

# Test commands individually
# - /pokemon:build-deck
# - /pokemon:analyze
# - /pokemon:find-counters
# - /pokemon:meta
```

## API Reference

### Search Cards

```typescript
search_cards({
  name?: string,
  type?: string,
  hp?: string,
  rarity?: string,
  set?: string,
  uniqueOnly?: boolean
})
```

### Find Synergies

```typescript
find_synergies({
  cardId?: string,
  cardName?: string,
  type?: string
})
```

### Find Counters

```typescript
find_counters({
  cardId?: string,
  cardName?: string,
  type?: string,
  strategy?: string
})
```

### Analyze Deck

```typescript
analyze_deck({
  cards: string[]
})
```

## Pokemon TCG Pocket Rules

### Game Format

- **Deck Size:** 20 cards
- **Energy Zone:** 1 energy/turn (NOT from deck)
- **Win Condition:** 3 points
  - Ex Pokemon knocked out = 2 points
  - Regular Pokemon knocked out = 1 point
- **Bench Limit:** 3 Pokemon (not 5)
- **Turn 1:** No draw, no energy, no attack
- **Max Copies:** 2 per card

### Type Effectiveness

```
Fire → Grass, Ice, Bug, Steel (+20 damage)
Water → Fire, Ground, Rock (+20 damage)
Grass → Water, Ground, Rock (+20 damage)
Lightning → Water, Flying (+20 damage)
Psychic → Fighting, Poison (+20 damage)
Fighting → Dark, Steel, Ice (+20 damage)
Dark → Psychic, Ghost (+20 damage)
Metal → Ice, Rock, Fairy (+20 damage)
Fairy → Fighting, Dark, Dragon (+20 damage)
Colorless → All types (no advantage)

Weakness: +20 damage received
Resistance: -20 damage received
```

## Troubleshooting

### MCP Server Not Starting

- Ensure Node.js 18+ is installed
- Check internet connection for npx
- Verify configuration file is valid JSON
- Restart Claude Desktop completely

### No Cards Found

- MCP server needs time to load database
- Check Pokemon Pocket MCP server logs
- Verify CSV file is present
- Run: `npm run build` in mcp-server directory

### Commands Not Working

- Verify plugin is installed correctly
- Check plugin.json syntax
- Ensure commands directory exists
- Restart Claude Desktop

## Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Update documentation
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Author

**Brian Sunter**

- GitHub: [@briansunter](https://github.com/briansunter)
- Project: [pokeclaude](https://github.com/briansunter/pokeclaude)

## Acknowledgments

- Pokemon TCG Pocket community
- Limitless TCG for card data
- Claude Code team for MCP framework
- Pokemon Company International for the game

## Documentation

This plugin includes comprehensive research documentation with 23 guides covering every aspect of Pokemon TCG Pocket competitive play.

### Quick Start by Skill Level

**New Players (Games 1-50):**

1. Read `docs/pokemon-tcg-pocket-research/rules/01-core-rules-guide.md`
2. Build budget deck from `docs/pokemon-tcg-pocket-research/deckbuilding/03-budget-decks.md`
3. Follow `docs/pokemon-tcg-pocket-research/complete-guides/01-beginner-to-advanced.md`

**Intermediate Players (Games 50-500):**

1. Study `docs/pokemon-tcg-pocket-research/deckbuilding/01-deckbuilding-guide.md`
2. Master energy zone: `docs/pokemon-tcg-pocket-research/strategies/04-energy-zone-mastery.md`
3. Choose S-tier deck from `docs/pokemon-tcg-pocket-research/meta/02-top-tier-decks.md`

**Advanced Players (Games 500-1000):**

1. Tournament prep: `docs/pokemon-tcg-pocket-research/strategies/02-tournament-strategies.md`
2. Meta analysis: `docs/pokemon-tcg-pocket-research/meta/01-meta-analysis.md`
3. Mental game: `docs/pokemon-tcg-pocket-research/strategies/05-competitive-play.md`

**Expert Players (Games 1000+):**

1. **Ultra-competitive mastery**: `docs/pokemon-tcg-pocket-research/strategies/06-ultra-competitive-mastery.md`
2. Tech cards: `docs/pokemon-tcg-pocket-research/strategies/09-tech-cards-situational-plays.md`
3. Pro pathway: `docs/pokemon-tcg-pocket-research/complete-guides/03-competitive-roadmap.md`

### Complete Documentation Index

See `docs/pokemon-tcg-pocket-research/MASTER-INDEX.md` for the complete overview of all 24 documents, including:

- 1 Rules guide
- 3 Deck building guides
- 9 Strategy guides (including mental game)
- 3 Meta analysis guides
- 3 Card evaluation guides
- 3 Complete progression guides
- 3 Project management docs (MASTER-INDEX, CONVERSATION-SUMMARY, RESEARCH-PLAN)

**Total Documentation**: 24 documents (15,000+ lines of comprehensive content)

## Support

- Create an issue on GitHub
- Join the Pokemon TCG Pocket community
- Check documentation in `claude-plugin/docs/pokemon-tcg-pocket-research/`

---

**Note:** This plugin is not affiliated with, endorsed by, or connected to Nintendo, Game Freak, The Pokemon Company, The Pokemon Company International, or any of their subsidiaries. Pokemon and Pokemon character names are trademarks of Nintendo.
