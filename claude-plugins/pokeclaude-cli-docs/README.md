# PokeClaude CLI Documentation

Complete user documentation for using PokeClaude commands and skills in Claude Code CLI mode.

## Overview

This plugin contains the main Pokemon TCG Pocket commands, auto-activating skills, and comprehensive research documentation.

## Main Commands

| Command                  | Description                      |
| ------------------------ | -------------------------------- |
| `/pokemon:build-deck`    | Build competitive 20-card decks  |
| `/pokemon:analyze`       | Analyze cards and decks          |
| `/pokemon:find-counters` | Find counter strategies          |
| `/pokemon:meta`          | Get meta analysis and tier lists |

## Auto-Activating Skills

| Skill                 | Triggers                    | Provides                              |
| --------------------- | --------------------------- | ------------------------------------- |
| Pokemon Deck Builder  | deck, build, synergy        | Deck construction and optimization    |
| Pokemon Card Analyst  | analyze, stats, tier        | Card analysis and competitive ratings |
| Pokemon Meta Analyst  | meta, competitive, strategy | Meta analysis and tier lists          |
| Pokemon Skill Builder | skill, plugin, template     | Skill creation help                   |

## Research Documentation

Comprehensive research guides in `docs/pokemon-tcg-pocket-research/`:

### Rules & Fundamentals

- `rules/01-core-rules-guide.md` - Complete game rules

### Deck Building (3 guides)

- `deckbuilding/01-deckbuilding-guide.md` - Deck building fundamentals
- `deckbuilding/02-deck-archetypes.md` - All major archetypes
- `deckbuilding/03-budget-decks.md` - Budget competitive builds

### Strategies (9 guides)

- `strategies/01-type-matchups.md` - Type effectiveness chart
- `strategies/02-tournament-strategies.md` - Tournament preparation
- `strategies/03-competitive-play.md` - Mental game and psychology
- `strategies/04-energy-zone-mastery.md` - Energy zone mechanics (critical!)
- `strategies/05-skill-expressions.md` - Skill system explained
- `strategies/06-ultra-competitive-mastery.md` - Advanced decision trees
- `strategies/07-pro-pathway.md` - Becoming a pro player
- `strategies/08-social-guide.md` - Community engagement
- `strategies/09-tech-cards-situational-plays.md` - Tech card guide

### Meta Analysis (3 guides)

- `meta/01-meta-analysis.md` - Understanding the meta
- `meta/02-top-tier-decks.md` - S-tier deck breakdowns
- `meta/03-archetype-matchups.md` - Deck archetype matchups

### Card Guides (3 guides)

- `card-guides/01-best-cards-list.md` - 200+ cards evaluated S-F tier
- `card-guides/02-ex-tier-list.md` - Complete EX Pokemon rankings
- `card-guides/03-type-mascots.md` - Best Pokemon for each type

### Complete Guides (3 guides)

- `complete-guides/01-beginner-to-advanced.md` - Player progression
- `complete-guides/02-resource-management.md` - In-game economy
- `complete-guides/03-competitive-roadmap.md` - Path to tournaments

### Project Documentation

- `MASTER-INDEX.md` - Complete documentation navigation
- `CONVERSATION-SUMMARY.md` - Research summary
- `RESEARCH-PLAN.md` - Original research plan

## Usage

The commands and skills work together:

```
/pokemon:build-deck Build a Pikachu ex deck
/pokemon:analyze Analyze Charizard ex
/pokemon:find-counters What beats Lightning?
/pokemon:meta Current S-tier list
```

Or use natural language - skills activate automatically!

```
Help me build a Lightning deck
Is Mewtwo ex good right now?
What counters Psychic types?
```

## Main Plugin

This is the main Pokemon TCG Pocket plugin. It includes:

- 4 slash commands
- 4 auto-activating skills
- 23 comprehensive research documents (15,000+ lines)
- Integration with the MCP server (2,077 cards)

## Terminal CLI

The `pokemon-pocket-mcp-server` package also includes a terminal CLI for direct database access from your command line.

**Available commands:** search, get, synergies, counters, stats, query, trainers, analyze

```bash
# Install globally or use npx
npm install -g pokemon-pocket-mcp-server
npx pokemon-pocket-mcp-server search --name Pikachu --output table

# Quick examples
pokemon-pocket-mcp-server get --name "Charizard ex"
pokemon-pocket-mcp-server stats --output table
pokemon-pocket-mcp-server counters --target-type Psychic
```

See `/cli` or `docs/00-cli-reference.md` for complete CLI documentation.

## Installation

```
/plugin marketplace add briansunter/pokeclaude
/plugin install pokemon-tcg-pocket
```

## Quick Start by Skill Level

**New Players (Games 1-50):**

1. `docs/pokemon-tcg-pocket-research/rules/01-core-rules-guide.md`
2. `docs/pokemon-tcg-pocket-research/deckbuilding/03-budget-decks.md`
3. `docs/pokemon-tcg-pocket-research/complete-guides/01-beginner-to-advanced.md`

**Intermediate Players (Games 50-500):**

1. `docs/pokemon-tcg-pocket-research/deckbuilding/01-deckbuilding-guide.md`
2. `docs/pokemon-tcg-pocket-research/strategies/04-energy-zone-mastery.md`
3. `docs/pokemon-tcg-pocket-research/meta/02-top-tier-decks.md`

**Advanced Players (Games 500+):**

1. `docs/pokemon-tcg-pocket-research/strategies/06-ultra-competitive-mastery.md`
2. `docs/pokemon-tcg-pocket-research/strategies/09-tech-cards-situational-plays.md`
3. `docs/pokemon-tcg-pocket-research/complete-guides/03-competitive-roadmap.md`
