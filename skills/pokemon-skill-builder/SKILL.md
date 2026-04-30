---
name: Pokemon TCG Pocket Skill Builder
description: Use when building Claude Code skills or plugins for Pokemon TCG Pocket. Creates Pokemon-specific commands, integrates MCP servers, scaffolds deck-building workflows, and provides templates for Pokemon automation tools.
---

# Pokemon TCG Pocket Skill Builder

Build Claude Code skills and plugins for Pokemon TCG Pocket with proven templates and best practices.

## Core Templates

### 1. Basic Pokemon Skill Template

```yaml
---
name: Skill Name
description: Use when [trigger condition]. Activates when user mentions [keywords].
---
# Skill Title
[Instructions for Claude Code]
```

### 2. Pokemon Deck Command Template

```markdown
---
name: build-deck
description: Build a Pokemon TCG Pocket deck around a specific Pokemon or strategy
---

# Build Pokemon TCG Pocket Deck

Use the Pokemon Pocket MCP server to create a competitive 20-card deck.

## Input Requirements

- Core Pokemon or strategy
- Preferred playstyle (aggro/disruption/snipe/acceleration)
- Budget constraints (optional)

## Process

1. Search for core Pokemon using MCP `search_cards`
2. Find synergies using `find_synergies`
3. Plan point map (1-1-3 for Mega decks)
4. Verify deck composition (20 cards, max 2 copies)
5. Analyze using `analyze_deck`
6. Provide optimization suggestions

## Output

- Complete 20-card deck list
- Point map explanation
- Energy curve analysis
- Counter-strategy recommendations
```

## MCP Server Integration

### Pokemon Pocket MCP Configuration

```json
{
  "mcpServers": {
    "pokemon-pocket-mcp": {
      "type": "stdio",
      "command": "npx",
      "args": ["pokemon-pocket-mcp-server"]
    }
  }
}
```

### Available MCP Tools

| Tool             | Purpose                                           |
| ---------------- | ------------------------------------------------- |
| `search_cards`   | Search with filters (name, type, HP, set, rarity) |
| `get_card`       | Get specific card details                         |
| `find_synergies` | Find card synergies                               |
| `find_counters`  | Find counter cards                                |
| `get_type_stats` | Type-based analysis                               |
| `query_cards`    | Custom SQL queries                                |
| `analyze_deck`   | Deck analysis                                     |

### MCP Resources

- `pokemon://cards/all` - Full database (2908 cards)
- `pokemon://cards/unique` - Unique cards (~1400)
- `pokemon://stats/types` - Type breakdowns

## Pokemon-Specific Guidelines

### Current Meta Context (April 2026, B3)

When building skills, reference the current meta:

- **Top decks**: Chien-Pao ex, Mega Altaria ex, Mega Absol ex
- **Rising**: Mega Lucario ex (Fighting), Mega Sceptile ex (Grass)
- **Universal staples**: Professor's Research, Poke Ball, Cyrus, Rare Candy, Copycat
- **Key mechanic**: Point mapping (1-1-3 for Mega decks)
- **Latest set**: Pulsing Aura (B3), released April 29, 2026

### Deck Building Rules (Always Enforce)

- 20-card format, max 2 copies per card
- Energy Zone auto-generates (no energy cards in deck typically)
- 3-point win condition (ex = 2 pts, regular = 1 pt)
- Max 3 bench Pokemon
- Turn 1: no draw, no energy, no attack
- 1-2 energy types recommended

### Card Evaluation Framework

Score cards on:

1. **Base stats** (30%): HP, damage, abilities
2. **Energy efficiency** (25%): Cost vs output
3. **Type matchups** (20%): Weakness/resistance
4. **Meta relevance** (15%): Tournament presence
5. **Versatility** (10%): Fit in multiple decks

## Skill Structure Best Practices

### Frontmatter

```yaml
---
name: Clear name (64 chars max)
description: |
  Use when [trigger].
  Activates when user mentions [keywords].
  Keep under 1024 characters.
---
```

### Content Organization

1. **Overview** (100-200 words)
2. **Core Capabilities** (with examples)
3. **MCP Integration** (tools and resources)
4. **Usage Examples** (real queries)
5. **Best Practices** (do's and don'ts)

### Common Patterns

**Pattern 1: Deck Build Workflow**

```
1. Get user requirements
2. Search core cards via MCP
3. Find synergies (type + partner)
4. Plan point map
5. Verify 20-card rules
6. Analyze with MCP
7. Suggest counters
```

**Pattern 2: Card Analysis Workflow**

```
1. Retrieve card data via MCP
2. Check meta positioning (current tier list)
3. Find synergies and counters
4. Generate tier rating
5. Provide strategic guide
```

**Pattern 3: Meta Analysis Workflow**

```
1. Query database for statistics
2. Cross-reference tournament data
3. Analyze matchup matrix
4. Generate tier lists
5. Provide strategic advice
```

## Testing Pokemon Skills

### Test Scenarios

1. **Deck Building Test:**

   ```
   Input: "Build Mega Absol ex deck"
   Check: 20 cards, point map planned, disruption strategy clear
   ```

2. **Card Analysis Test:**

   ```
   Input: "Analyze Greninja"
   Check: Water Shuriken highlighted, partner decks listed, tier correct
   ```

3. **Meta Query Test:**
   ```
   Input: "Current S-tier decks"
   Check: Accurate tier list with sources, B3 cards included
   ```

### Validation Checklist

- [ ] MCP server accessible
- [ ] All tools working correctly
- [ ] Pokemon rules accurately represented (20 cards, energy zone, bench limit)
- [ ] Meta references current (Pulsing Aura B3)
- [ ] Frontmatter properly formatted
- [ ] Under token limits

## Example Complete Skill

```yaml
---
name: Pokemon Deck Optimizer
description: Use when optimizing existing Pokemon TCG Pocket decks. Improves consistency, fixes energy curves, finds missing synergies, and provides competitive enhancements based on current meta.
---

# Pokemon Deck Optimizer

Optimize Pokemon TCG Pocket decks for competitive play.

## Optimization Process

### 1. Current Deck Analysis
- Use MCP `analyze_deck` for composition
- Identify energy curve issues
- Check point map efficiency

### 2. Meta Alignment
- Compare to top-tier strategies
- Check for meta staples (Cyrus, Professor, Poke Ball, Rare Candy)
- Verify partner synergies

### 3. Energy Curve Fixes
- Ensure 1-2 type focus
- Primary attacker at 2-3 energy
- Early game at 1 energy

### 4. Synergy Improvements
- Use `find_synergies` for additions
- Check free-damage ability stacking
- Add counter-strategies

## Output Format
- Changes made (added/removed with reasoning)
- Revised point map
- Energy curve comparison
- Expected matchup spread
```
