# Pokemon Pocket MCP Server - Usage Guide

## Overview

MCP server for Pokemon Pocket TCG with 2000+ cards including Pokemon, Trainers (Supporters), and Items.

## Features

- 🎴 **2000+ Cards**: Pokemon, Trainers (Giovanni, Erika, etc.), Items (Rare Candy, Pokémon Communication, etc.)
- 🔍 **Smart Search**: Filter by name, type, HP, set, and more
- 🤝 **Synergy Finder**: Get recommended cards + trainers for any Pokemon
- 📊 **Field Filtering**: Control response size with minimal/basic/full presets
- 🎯 **187 Trainers/Items**: Easy access to all Supporter and Item cards

## Quick Start: Searching Trainers/Items

### Method 1: Dedicated Tool (Recommended)
```typescript
list_trainers({
  limit: 20,
  fields: 'minimal'
})
// Returns: [{ id: '...', name: 'Giovanni' }, ...]
```

### Method 2: Search with hasAttacks Filter
```typescript
search_cards({
  hasAttacks: false,  // FALSE = Trainers/Items
  limit: 20
})
```

### Method 3: Search by Name
```typescript
search_cards({
  name: 'Giovanni',
  hasAttacks: false
})
```

### Method 4: Automatic via Synergies
```typescript
find_synergies({ cardName: 'Pikachu ex' })
// Automatically includes 10 recommended trainers
```

## Field Filtering

All tools support field filtering to reduce token usage:

| Preset | Fields | Use Case |
|--------|--------|----------|
| **minimal** | `id`, `name` | Smallest response, just identifiers |
| **basic** (default) | `id`, `name`, `type`, `hp`, `attacks`, `weakness`, `retreat_cost`, `rarity` | Common use case, excludes images/URLs |
| **full** | All 15 fields | Complete card data including images and URLs |
| **custom** | `["name", "type", "hp"]` | Specific fields you need |

### Examples

```typescript
// Minimal - just names
search_cards({ type: 'Fire', fields: 'minimal' })

// Basic (default) - common fields
search_cards({ type: 'Fire' })

// Full - all fields including images
search_cards({ type: 'Fire', fields: 'full' })

// Custom - specific fields
search_cards({ type: 'Fire', fields: ['name', 'hp', 'attacks'] })
```

## Available Tools (8 total)

### 1. search_cards
Search Pokemon, Trainers, and Items with flexible filters.

```typescript
search_cards({
  name: 'Pikachu',           // Partial match
  type: 'Lightning',         // Pokemon type
  minHp: 50,                 // Minimum HP
  maxHp: 100,                // Maximum HP
  set: 'A1',                 // Set code
  hasAttacks: true,          // true=Pokemon, false=Trainers/Items
  retreatCost: 1,            // Retreat cost
  weakness: 'Fighting',      // Weakness type
  limit: 20,                 // Max results
  uniqueOnly: true,          // Filter art variants (default)
  fields: 'basic'            // Field selection
})
```

**To search Trainers/Items**: Set `hasAttacks: false`

### 2. get_card
Get specific card by exact name.

```typescript
get_card({
  name: 'Pikachu ex',
  fields: 'full'
})
```

### 3. find_synergies
Find cards that synergize with a Pokemon. Automatically includes 10 recommended trainers.

```typescript
find_synergies({
  cardName: 'Charizard ex',
  fields: 'basic'
})
// Returns:
// {
//   card: { ... },
//   sameTypeCards: [...],
//   trainers: [10 recommended trainers]
// }
```

### 4. find_counters
Find Pokemon that counter a specific type (exploit weakness).

```typescript
find_counters({
  targetType: 'Water',
  fields: 'basic'
})
```

### 5. get_type_stats
Get statistics about Pokemon types.

```typescript
get_type_stats()
// Returns: type distribution, avg HP, avg retreat cost
```

### 6. query_cards
Run custom SQL queries (SELECT only).

```typescript
query_cards({
  sql: "SELECT name, hp FROM cards WHERE type = 'Fire' ORDER BY hp DESC LIMIT 10",
  fields: 'basic'
})
```

**To query Trainers/Items**: Use `WHERE type IS NULL`

### 7. list_trainers (NEW!)
List all Trainer and Item cards.

```typescript
list_trainers({
  limit: 50,
  fields: 'minimal'
})
```

### 8. analyze_deck
Analyze a deck list for energy requirements and type distribution.

```typescript
analyze_deck({
  cardNames: ['Pikachu ex', 'Zapdos ex', 'Giovanni', 'Pokémon Communication']
})
// Returns deck stats: type distribution, energy needs, avg HP
```

## Common Use Cases

### Build a Deck
```typescript
// 1. Find a main attacker
search_cards({ name: 'Charizard ex' })

// 2. Find synergies and trainers
find_synergies({ cardName: 'Charizard ex' })

// 3. Find counters to common threats
find_counters({ targetType: 'Water' })

// 4. List available trainers
list_trainers({ limit: 50 })

// 5. Analyze your deck
analyze_deck({ cardNames: ['Charizard ex', 'Moltres ex', 'Giovanni', ...] })
```

### Discover Trainers
```typescript
// Get all trainers
list_trainers({ limit: 187, fields: 'minimal' })

// Search specific trainer
search_cards({ name: 'Giovanni', hasAttacks: false })

// Get trainers via SQL
query_cards({
  sql: "SELECT name FROM cards WHERE type IS NULL AND name NOT LIKE '%Energy%' ORDER BY name"
})
```

### Find Type Matchups
```typescript
// What beats Water?
find_counters({ targetType: 'Water' })

// All Lightning Pokemon
search_cards({ type: 'Lightning', hasAttacks: true, limit: 50 })

// Type statistics
get_type_stats()
```

## Card Types Explained

- **Pokemon**: Cards with `type` field (Fire, Water, etc.) and `attacks`
- **Trainers (Supporters)**: Cards with `type = NULL`, no attacks, no HP (Giovanni, Erika, etc.)
- **Items**: Cards with `type = NULL`, no attacks (Rare Candy, Pokémon Communication, etc.)
- Some Items have HP (like Old Amber with 40 HP)

## Tips

1. **Always use field filtering** to reduce token usage in Claude conversations
2. **Use `hasAttacks: false`** to search Trainers/Items
3. **Use `uniqueOnly: true`** (default) to avoid duplicate art variants
4. **Use `list_trainers`** for quick discovery of all Trainer/Item cards
5. **Use `find_synergies`** to get automatic trainer recommendations

## Examples

### Example 1: Build a Lightning Deck
```typescript
// Find Lightning attackers
const attackers = search_cards({
  type: 'Lightning',
  hasAttacks: true,
  minHp: 80,
  fields: 'basic'
})

// Get synergies for Pikachu ex
const synergies = find_synergies({ cardName: 'Pikachu ex' })

// List trainers
const trainers = list_trainers({ limit: 20, fields: 'minimal' })
```

### Example 2: Search Specific Trainer
```typescript
// Method 1: By name with filter
search_cards({ name: 'Erika', hasAttacks: false })

// Method 2: Via list_trainers (searches all trainers)
list_trainers({ limit: 187, fields: 'minimal' })
  .filter(t => t.name.includes('Erika'))
```

### Example 3: Counter Analysis
```typescript
// What counters Fire decks?
const counters = find_counters({ targetType: 'Fire' })

// What's weak to Lightning?
query_cards({
  sql: "SELECT DISTINCT name, type FROM cards WHERE weakness = 'Lightning' LIMIT 20"
})
```

## Trainer/Item Cards (187 total)

**Popular Supporters:**
- Giovanni - Damage boost
- Erika - Healing
- Sabrina - Switch opponent's Pokemon
- Blaine - Fire boost
- Misty - Water energy
- Brock - Rock boost
- Blue - Hand refresh

**Popular Items:**
- Pokémon Communication - Search for Pokemon
- Rare Candy - Evolution support
- Elemental Switch - Energy movement
- Giant Cape - HP boost
- Rocky Helmet - Damage reflection
- Leaf Cape - Grass protection

Use `list_trainers()` to see all 187 cards!
