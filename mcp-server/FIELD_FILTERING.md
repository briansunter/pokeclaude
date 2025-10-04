# Field Filtering Guide

## Problem

Claude was using `fields: 'full'` which includes heavy data like `image_url`, `card_url`, `set_code`, `set_name`, etc. This wastes **3-4x more tokens** than necessary.

## Solution

Updated all tool descriptions to emphasize field filtering:

### Server Description
```
**IMPORTANT: Always use field filtering to save context tokens!**
Use "minimal" (id, name) for listings, "basic" (default, no images) for most queries,
"full" ONLY when you need image_url/card_url.
```

### Field Presets

| Preset | Fields | Token Usage | When to Use |
|--------|--------|-------------|-------------|
| **minimal** | `id`, `name` | ⭐ Smallest | Listings, browsing card names |
| **basic** (default) | `id`, `name`, `type`, `hp`, `attacks`, `weakness`, `retreat_cost`, `rarity` | ⭐⭐ Recommended | Most queries, deck building |
| **full** | All 15 fields | ⭐⭐⭐⭐ Large | ONLY when user explicitly needs images/URLs |

### What "basic" Excludes

Fields excluded from "basic" to save tokens:
- `image_url` - Heavy CDN URLs (not needed for most queries)
- `card_url` - Website links (not needed for most queries)
- `set_code` - Set identifier (A1, A2, etc.)
- `set_name` - Full set name ("Genetic Apex A1")
- `card_number` - Card number within set
- `abilities` - Pokemon abilities (often empty)
- `resistance` - Resistance type (often empty)

### Updated Tool Descriptions

All 7 tools with field filtering now include warnings:

**search_cards**:
```
**IMPORTANT: Use fields="minimal" for listings, leave default (basic) for most queries.
Only use "full" if user explicitly needs image_url or card_url - it wastes tokens!**
```

**get_card**:
```
**Use "basic" (default) for most queries. Only use "full" if user explicitly
requests image_url or card_url.**
```

**find_synergies**:
```
**Recommend using "basic" or "minimal" to save tokens - avoid "full" unless user needs images.**
```

And similar for find_counters, query_cards, and list_trainers.

### Code Comments

Added detailed guidelines in the source code:

```typescript
// FIELD SELECTION GUIDELINES:
// ✅ DO: Use "minimal" for listings and "basic" for queries (default)
// ❌ DON'T: Use "full" unless user specifically needs image_url or card_url
// 💡 TIP: "basic" excludes image_url, card_url, set_name, set_code, card_number, abilities, resistance
```

## Examples

### ❌ Bad (wastes tokens)
```typescript
// Unnecessarily includes image_url, card_url, set info
search_cards({ name: 'Pikachu', fields: 'full' })
```

### ✅ Good (efficient)
```typescript
// For listings - just names
list_trainers({ limit: 50, fields: 'minimal' })

// For queries - common fields only (default)
search_cards({ name: 'Pikachu' })
search_cards({ name: 'Pikachu', fields: 'basic' })

// For specific needs
search_cards({ name: 'Pikachu', fields: ['name', 'type', 'hp'] })
```

### ✅ When "full" is OK
```typescript
// User explicitly asks: "Show me Pikachu's card image"
search_cards({ name: 'Pikachu', fields: 'full' })
```

## Token Savings

Example with 10 cards:

- **minimal**: ~200 tokens (id, name only)
- **basic**: ~600 tokens (8 fields)
- **full**: ~1800 tokens (15 fields)

**Savings**: Using "basic" instead of "full" saves ~66% of tokens!

## Implementation

1. Server description emphasizes field filtering
2. All tool descriptions warn against using "full" unnecessarily
3. All `fields` parameters have detailed descriptions
4. Code comments provide guidelines
5. Tests validate all three presets work correctly

## Result

Claude should now:
- Use **"minimal"** for browsing/listings
- Use **"basic"** (default) for most queries
- Use **"full"** ONLY when user needs images/URLs

This reduces token usage significantly while maintaining full functionality.
