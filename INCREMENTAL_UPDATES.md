# Incremental Update Feature

## Overview

The scraper now supports **incremental updates** - only scraping new cards that haven't been synced yet!

## How It Works

### Default Behavior (Incremental)

```bash
npm run scrape
```

1. **Loads existing CSV** - Reads `pokemon_pocket_cards.csv`
2. **Identifies existing cards** - Creates index of `set_code:card_number`
3. **Auto-discovers sets** - Finds all sets from website
4. **Scrapes only new cards** - Skips cards that already exist
5. **Merges data** - Combines new cards with existing cards
6. **Exports combined CSV** - Saves all cards to CSV

### Full Scrape

```bash
npm run scrape:full
```

1. **Ignores existing CSV** - Starts fresh
2. **Auto-discovers sets** - Finds all sets from website
3. **Scrapes all cards** - No filtering, scrapes everything
4. **Exports CSV** - Overwrites existing file

## Benefits

✅ **Much faster** - Skips 2000+ existing cards
✅ **Saves bandwidth** - Only fetches new data
✅ **Automatic** - No manual tracking needed
✅ **Safe** - Preserves existing data
✅ **Perfect for updates** - Run daily/weekly to get new cards

## Example Scenarios

### Scenario 1: New Set Released

```bash
# Before: CSV has 2077 cards from sets A1-A4b
npm run scrape

# Output:
# 📂 Loading existing cards from pokemon_pocket_cards.csv...
# ✅ Loaded 2077 existing cards
#
# 🔍 Auto-discovering sets from limitlesstcg.com...
# ✅ Found 13 sets (NEW: A5)
#
# Scraping set: A5 - New Set Name...
#   New cards from this set: 150
# Scraping set: A4b - Deluxe Pack: ex...
#   New cards from this set: 0 (all exist)
# ...
#
# 📊 Merge Statistics:
#    Existing cards: 2077
#    New cards scraped: 150
#    Unique new cards: 150
#    Total cards: 2227
#
# Skipped 2077 existing cards
# Added 150 new cards
# Total cards in database: 2227
```

### Scenario 2: First Run (No Existing CSV)

```bash
npm run scrape

# Output:
# No existing CSV found, will scrape all cards
# 🔍 Auto-discovering sets...
# ✅ Found 12 sets
#
# [Scrapes all 2077 cards]
#
# Total cards in database: 2077
```

### Scenario 3: Re-run Same Day (No Changes)

```bash
npm run scrape

# Output:
# 📂 Loading existing cards...
# ✅ Loaded 2077 existing cards
#
# 🔍 Auto-discovering sets...
# ✅ Found 12 sets
#
# [Skips all existing cards]
#
# 📊 Merge Statistics:
#    Existing cards: 2077
#    New cards scraped: 0
#    Unique new cards: 0
#    Total cards: 2077
#
# Skipped 2077 existing cards
# Added 0 new cards
```

## Implementation Details

### Card Uniqueness

Cards are identified by: `set_code` + `card_number`

Examples:
- `A1:1` - Bulbasaur from Genetic Apex
- `A4b:1` - Bulbasaur from Deluxe Pack
- `P-A:9` - Pikachu promo

These are considered **different cards** even if they have the same name.

### Loading Existing Cards

```typescript
function parseExistingCsv(filename: string): PokemonCard[] {
  // 1. Read CSV file
  // 2. Parse each line
  // 3. Extract card data
  // 4. Return array of cards
}
```

### Checking for Duplicates

```typescript
const existingCardKeys = new Set(
  existingCards.map(c => `${c.set_code}:${c.card_number}`)
);

for (const card of setCards) {
  const key = `${card.set_code}:${card.card_number}`;
  if (!existingCardKeys.has(key)) {
    newCards.push(card);  // Only add if doesn't exist
  } else {
    skippedCount++;  // Skip if already exists
  }
}
```

### Merging Cards

```typescript
function mergeCards(existing: PokemonCard[], new: PokemonCard[]): PokemonCard[] {
  // 1. Filter out duplicates from new cards
  // 2. Combine existing + unique new cards
  // 3. Return merged array
}
```

## Performance Comparison

| Scenario | Full Scrape | Incremental Update |
|----------|-------------|-------------------|
| **First run** | ~6-7 min | ~6-7 min |
| **No changes** | ~6-7 min | ~30 seconds |
| **New set (150 cards)** | ~6-7 min | ~1-2 min |
| **New cards (10 cards)** | ~6-7 min | ~30 seconds |

## When to Use Each Mode

### Use Incremental (Default)

✅ **Daily/weekly updates** - Check for new cards
✅ **New set releases** - Add new sets to existing data
✅ **Fast updates** - Only get what's new
✅ **Preserving data** - Keep existing cards intact

### Use Full Scrape

✅ **First time setup** - No existing CSV
✅ **Data corruption** - CSV file is corrupted
✅ **Major changes** - Website structure changed
✅ **Testing** - Verify all cards scrape correctly

## Error Handling

### Missing CSV File

```bash
npm run scrape

# Output:
# No existing CSV found, will scrape all cards
# [Proceeds with full scrape]
```

### Corrupted CSV

```bash
npm run scrape

# Output:
# ❌ Error loading existing cards: [error message]
# [Falls back to empty array, scrapes all]
```

### Partial Failure

If some sets fail to scrape:
- Existing cards are preserved
- Successfully scraped new cards are merged
- Partial update is saved

## Command-Line Options

```bash
# Incremental update (default)
npm run scrape
npx tsx scraper.ts

# Full scrape
npm run scrape:full
npx tsx scraper.ts --full
```

## Maintenance

### Verify Data Integrity

After incremental updates, verify:

```bash
# Check total count
wc -l pokemon_pocket_cards.csv

# Check for duplicates
cut -d',' -f2,4 pokemon_pocket_cards.csv | sort | uniq -d
# Should return nothing (no duplicates)
```

### Force Full Refresh

If you suspect data issues:

```bash
# Backup existing
cp pokemon_pocket_cards.csv pokemon_pocket_cards.backup.csv

# Full scrape
npm run scrape:full

# Compare
diff pokemon_pocket_cards.csv pokemon_pocket_cards.backup.csv
```

## Future Improvements

Potential enhancements:
1. **Update detection** - Detect when card data changes
2. **Versioning** - Track when cards were added/updated
3. **Soft deletes** - Mark removed cards instead of deleting
4. **Change log** - Log what changed in each run
5. **Parallel scraping** - Scrape multiple sets simultaneously
