---
name: pokemon-tcg-pocket-skill-builder
description: |
  Use when building Claude Code skills or plugins for Pokemon TCG Pocket.
  Activates when creating Pokemon-specific commands, integrating MCP servers, scaffolding deck-building workflows, or writing Pokemon automation tools.
  Provides templates, MCP tool references, and Pokemon-specific skill patterns.
---

# Pokemon TCG Pocket Skill Builder

Create Claude Code skills and plugins for Pokemon TCG Pocket with proven templates.

## Skill Template

```yaml
---
name: skill-name
description: |
  Use when [trigger condition].
  Activates when user mentions [keywords].
  Provides [capability summary].
---

# Skill Title

## Overview
[100-200 word capability description]

## Workflow
[Step-by-step process with MCP tool calls]

## MCP Integration
[Which tools this skill uses]

## Examples
[2-3 real usage scenarios]
```

## Pokemon-Specific Patterns

### Deck Building Pattern

```
1. Get user requirements (core Pokemon, playstyle)
2. search_cards → find core + evolution line
3. find_synergies → discover partner cards
4. Plan point map (1-1-3 for Mega decks)
5. Validate: 20 cards, max 2 copies, 1-2 energy types
6. analyze_deck → composition check
7. find_counters → counter-strategy advice
```

### Card Analysis Pattern

```
1. get_card or search_cards → retrieve data
2. Evaluate: HP, attacks, abilities, energy costs
3. find_synergies → partner discovery
4. find_counters → threat identification
5. Rate competitive tier
```

### Meta Query Pattern

```
1. get_type_stats → type distribution
2. query_cards → SQL analysis (usage rates, damage benchmarks)
3. find_counters → matchup analysis
4. Synthesize into tier list or trend report
```

## MCP Server Configuration

```json
{
  "mcpServers": {
    "pokemon-pocket-mcp": {
      "command": "npx",
      "args": ["pokemon-pocket-mcp-server"]
    }
  }
}
```

## MCP Tools Reference

| Tool             | Purpose                         | Key Parameters              |
| ---------------- | ------------------------------- | --------------------------- |
| `search_cards`   | Filter cards by attributes      | name, type, hp, set, rarity |
| `get_card`       | Single card details             | id                          |
| `find_synergies` | Partner card discovery          | card name or type           |
| `find_counters`  | Counter-strategy identification | type or card                |
| `get_type_stats` | Type distribution & averages    | (none required)             |
| `query_cards`    | Custom SQL on card database     | SQL query string            |
| `analyze_deck`   | Deck composition analysis       | card list                   |

### MCP Resources

- `pokemon://cards/all` — Full database
- `pokemon://cards/unique` — Deduplicated cards
- `pokemon://stats/types` — Type breakdowns

## Content Guidelines

- Keep SKILL.md under 100 lines; split to REFERENCE.md for bulky data
- Don't hardcode card counts or set names — they change with scraper updates
- Don't duplicate rules or meta data already in other Pokemon skills
- Reference sibling skills for cross-domain queries (e.g., deck building → meta analysis)
- Use `find_synergies` / `find_counters` instead of hardcoding card relationships

## Testing

Validate new Pokemon skills against:

- [ ] MCP server accessible and all tools respond
- [ ] Pokemon Pocket rules correctly represented
- [ ] Frontmatter valid (name + description with triggers)
- [ ] No hardcoded card counts or time-sensitive data in SKILL.md
- [ ] Deck outputs always: 20 cards, max 2 copies, valid point map
