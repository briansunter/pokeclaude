# Field Filtering Optimization

## Updated: 2025-10-02 (Final)

## Changes Made

All tool descriptions updated with **clear "don't specify" guidance** to strongly encourage using defaults:

### Server Description
```
💡 **IMPORTANT: Don't specify fields parameter - tools auto-default to "basic" which includes
ALL game data (type, HP, attacks, abilities, weakness, retreat) WITHOUT heavy image URLs.
This saves 3-4x tokens.** Only specify fields="full" if user explicitly asks "show me the
image" or "give me the URL". "basic" is comprehensive for all gameplay queries.
```

### Tool Updates (All 7 Field-Aware Tools)

Every tool description now says:
```
💡 **Don't specify fields - auto-defaults to "basic/minimal" with all/comprehensive game data.**
```

| Tool | Default | Key Message |
|------|---------|-------------|
| **search_cards** | `basic` | "Don't specify fields - auto-defaults to 'basic' with ALL game data" |
| **get_card** | `basic` | "Don't specify fields - auto-defaults to 'basic' with ALL game data" |
| **find_synergies** | `basic` | "Don't specify fields - auto-defaults to 'basic' with all game data" |
| **find_counters** | `basic` | "Don't specify fields - auto-defaults to 'basic' with all game data" |
| **query_cards** | `basic` | "Don't specify fields - auto-defaults to 'basic' with all game data" |
| **list_trainers** | `minimal` | "Don't specify fields - auto-defaults to 'minimal' (just names, perfect for trainers)" |

### Field Parameter Descriptions

**Evolution:**

**V1 (too restrictive):**
```
⚠️ DO NOT SET THIS - defaults to "basic". "full" WASTES TOKENS.
```

**V2 (too soft):**
```
💡 Field filtering: Leaving unset defaults to "basic"...
```

**V3 (current - clear and direct):**
```
💡 LEAVE UNSET (defaults to "basic" = comprehensive game data WITHOUT images).
"basic" includes: type, HP, attacks, abilities, weakness, retreat.
Only specify if: (1) "minimal" for name-only lists, (2) "full" when user
explicitly asks for images/URLs (costs 3-4x tokens), (3) custom array for
specific fields. For most queries, omit this parameter.
```

## Key Principles (V3 - Current)

1. **Clear Directive**: "Don't specify fields" is direct but not prohibitive
2. **Emphasize Comprehensive Default**: "ALL game data" makes clear basic has everything
3. **Explicit Token Cost**: Always mention "3-4x tokens" for context
4. **LEAVE UNSET in Caps**: Makes the action clear and prominent
5. **List What's Included**: Enumerate fields in "basic" (type, HP, attacks, abilities, weakness, retreat)
6. **Specific Exceptions**: Only specify when: (1) minimal for names, (2) full for images, (3) custom array
7. **Closing Reminder**: "For most queries, omit this parameter"
8. **Context-Appropriate Defaults**:
   - `minimal` for trainers (just names)
   - `basic` for Pokemon (comprehensive stats)
   - `full` only when user asks for images

## Token Savings

With 10 cards:
- **minimal**: ~200 tokens (id, name only)
- **basic**: ~600 tokens (8 fields - type, HP, attacks, weakness, etc.)
- **full**: ~1800 tokens (15 fields - adds image_url, card_url, set info)

**Using "basic" instead of "full" saves ~66% of tokens** while providing all functional data.

## Implementation Status

✅ Server description updated with prominent guidance
✅ All 7 tools with field filtering updated
✅ All field parameter descriptions use guiding language
✅ Defaults encourage minimal usage (basic/minimal)
✅ Educational messages explain token cost

## Usage Examples

### ✅ Good - Efficient Defaults
```typescript
// Just names for browsing
list_trainers({ limit: 50 })  // Uses "minimal" default

// Full stats for queries
search_cards({ name: 'Pikachu' })  // Uses "basic" default
get_card({ name: 'Charizard ex' })  // Uses "basic" default
```

### ✅ When "full" is Appropriate
```typescript
// User says: "Show me Pikachu's card image"
get_card({ name: 'Pikachu ex', fields: 'full' })

// User says: "Give me the URL for Charizard"
search_cards({ name: 'Charizard', fields: 'full' })
```

### ❌ Wasteful (but not prohibited)
```typescript
// User just asks: "What's Pikachu's HP?"
// This works but wastes tokens:
get_card({ name: 'Pikachu', fields: 'full' })

// Better (saves 66% tokens):
get_card({ name: 'Pikachu' })  // basic has HP
```

## Result

Claude is strongly guided toward efficient field settings through:
1. **Direct messaging**: "Don't specify fields - auto-defaults to 'basic'"
2. **Comprehensive emphasis**: "ALL game data" clarifies basic has everything needed
3. **Clear instruction**: "LEAVE UNSET" in parameter descriptions
4. **Explicit enumeration**: Lists exactly what's in "basic" (type, HP, attacks, abilities, weakness, retreat)
5. **Token cost visibility**: Always mentions "3-4x tokens" for full
6. **Specific exceptions**: Only use full "when user explicitly asks for images/URLs"
7. **Final reminder**: "For most queries, omit this parameter"

This approach strongly discourages setting fields while maintaining flexibility when truly needed.
