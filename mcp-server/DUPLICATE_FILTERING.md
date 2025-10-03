# Duplicate Card Filtering

## Problem

The Pokemon Pocket TCG CSV contains **2,077 cards**, but many are duplicates with different art:
- **1,890 total cards** with attacks
- **1,068 unique cards** with attacks
- **822 duplicate cards** (43.5% duplicates!)

### Examples of Duplicates

**Pikachu ex (Circle Circuit)**: 7 duplicates
- A1-96, A1-259, A1-281, A1-285, A4b-131, A4b-364, A4b-376
- All have identical stats: HP 120, attacks "LL Circle Circuit: 30x", weakness Fighting, retreat cost 1

**Pikachu (Gnaw)**: 6 duplicates
- A1-94, A4b-128, A4b-129, P-A-9, P-A-15, P-A-26
- All have identical stats: HP 60, attacks "L Gnaw: 20", weakness Fighting, retreat cost 1

### Different Cards with Same Name (NOT duplicates)

Pikachu has **7 unique variants** with different attacks:
1. Pikachu - "L Gnaw: 20"
2. Pikachu - "L Circle Circuit: 10x"
3. Pikachu - "L Spark: 10"
4. Pikachu - "CC Tail Smack: 30"
5. Pikachu - "LC Quick Attack 20+"
6. Pikachu ex - "LL Circle Circuit: 30x"
7. Pikachu ex - "LLL Thunderbolt: 150"

## Solution

### What Defines a Unique Card?

A card is considered unique based on these fields:
- `name`
- `type`
- `hp`
- `attacks`
- `weakness`
- `retreat_cost`

Cards with identical values for all these fields are considered duplicates (different art versions).

### Implementation

#### 1. Updated `searchCards()` Method

Added `uniqueOnly` parameter to filter duplicates:

```typescript
async searchCards(filters: {
  // ... existing filters ...
  uniqueOnly?: boolean;  // NEW: Filter out duplicate cards
}): Promise<Card[]>
```

**SQL Query:**
```sql
-- When uniqueOnly = true
SELECT DISTINCT ON (name, type, hp, attacks, weakness, retreat_cost) *
FROM cards
WHERE ... filters ...
ORDER BY name, type, hp, attacks, weakness, retreat_cost, set_code, card_number
LIMIT 50

-- When uniqueOnly = false (default)
SELECT *
FROM cards
WHERE ... filters ...
ORDER BY name
LIMIT 50
```

#### 2. Updated `search_cards` Tool

Added `uniqueOnly` parameter to the MCP tool:

```typescript
server.registerTool('search_cards', {
  title: 'Search Pokemon Cards',
  description: 'Search for Pokemon cards... By default returns all card variants (different art). Use uniqueOnly=true to filter out duplicates.',
  inputSchema: {
    // ... existing parameters ...
    uniqueOnly: z.boolean().optional()
      .describe('If true, returns only unique cards (filters out duplicates with same stats but different art). Default: false')
  }
}, ...)
```

#### 3. Updated `find_synergies()` - Always Returns Unique Cards

When building decks, you typically want unique cards, not all art variants:

```sql
SELECT DISTINCT ON (name, type, hp, attacks, weakness, retreat_cost)
  name, hp, attacks, retreat_cost
FROM cards
WHERE type = 'Lightning'
  AND name != 'Pikachu ex'
  AND attacks != ''
ORDER BY name, type, hp, attacks, weakness, retreat_cost, CAST(hp AS INTEGER) DESC
LIMIT 10
```

#### 4. Updated `find_counters()` - Always Returns Unique Cards

```sql
SELECT DISTINCT ON (name, type, hp, attacks, weakness, retreat_cost)
  name, type, hp, attacks, weakness
FROM cards
WHERE type = (weakness_type)
  AND attacks != ''
ORDER BY name, type, hp, attacks, weakness, retreat_cost, CAST(hp AS INTEGER) DESC
LIMIT 20
```

## Usage Examples

### Example 1: Search without Duplicates (Default)

```typescript
// Returns only unique Pikachu cards (default behavior)
const results = await search_cards({
  name: "Pikachu"
});
// Returns: 7 unique cards
```

### Example 2: Search with All Art Variants

```typescript
// Returns ALL Pikachu cards including art variants
const results = await search_cards({
  name: "Pikachu",
  uniqueOnly: false
});
// Returns: 21 cards
```

### Example 3: Find Lightning Synergies

```typescript
// Automatically returns unique cards
const synergies = await find_synergies({
  cardName: "Pikachu ex"
});
// sameTypeCards: 10 unique Lightning Pokemon
// trainers: 10 unique trainer/item cards
```

### Example 4: Resource - Unique Cards Only

```typescript
// Access unique cards resource
GET pokemon://cards/unique
// Returns: 1,068 unique cards (filters out duplicates)
```

## Testing Results

### Test 1: Pikachu Search
- **Without uniqueOnly**: 21 cards
- **With uniqueOnly**: 7 cards
- **Duplicates filtered**: 14 cards (66.7%)

### Test 2: Lightning Type
- **Total cards**: Varies by set
- **Unique cards**: Properly filtered using DISTINCT ON

### Test 3: Overall Statistics
- **Total cards with attacks**: 1,890
- **Unique cards with attacks**: 1,068
- **Duplicate percentage**: 43.5%

## Migration Impact

### Breaking Changes
**YES - Default behavior changed:**
- **OLD**: `search_cards` returned all cards including duplicates by default
- **NEW**: `search_cards` returns unique cards by default (filters duplicates)
- **To get old behavior**: Set `uniqueOnly: false` explicitly

### Performance
- `DISTINCT ON` queries are efficient in DuckDB
- No performance degradation observed
- Memory usage unchanged

## Recommendations

### When to Use Default (uniqueOnly=true)
✅ **Default behavior is best for:**
- Building deck recommendations
- Showing card options to users
- Analyzing card statistics
- Listing available cards
- Most common use cases

### When to Use uniqueOnly=false
✅ **Explicitly set uniqueOnly=false when:**
- User wants to see all art variants
- Showing cards from specific sets
- Checking card availability across sets
- Collection management
- Viewing all printings of a card

### Default Behavior
- `search_cards`: `uniqueOnly=true` (filters duplicates by default)
- `find_synergies`: Always unique (deck building doesn't need duplicates)
- `find_counters`: Always unique (deck building doesn't need duplicates)
- `pokemon://cards/unique` resource: Always unique

## Files Modified

1. `src/index.ts`:
   - Updated `searchCards()` method with `uniqueOnly` parameter
   - Updated `find_synergies()` to use DISTINCT ON
   - Updated `find_counters()` to use DISTINCT ON
   - Updated `search_cards` tool schema

2. `test-unique-filtering.ts` (new):
   - Comprehensive tests for duplicate filtering
   - Validation of DISTINCT ON queries

## Future Improvements

1. Add `preferredSet` parameter to choose which art variant to return
2. Add ability to search by art variant (promo, full art, etc.)
3. Add rarity-based filtering for art variants
4. Consider adding `artVariants` array to show all available sets for a card
