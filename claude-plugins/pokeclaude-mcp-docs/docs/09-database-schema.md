# Database Schema

Complete schema for the Pokemon Pocket card database.

## Overview

The Pokemon Pocket MCP server uses DuckDB with data stored in CSV format. The database contains **2,077 total cards** across 12 sets.

## Table: cards

### Column Reference

| Column           | Type    | Description                          | Example                                          |
| ---------------- | ------- | ------------------------------------ | ------------------------------------------------ | ------------------------- |
| id               | VARCHAR | UUID primary key                     | "550e8400-e29b-41d4-a716-446655440000"           |
| set_code         | VARCHAR | Set code identifier                  | "A1", "A2", "A3"                                 |
| set_name         | VARCHAR | Full set name                        | "Genetic Apex"                                   |
| card_number      | VARCHAR | Position in set                      | "008", "054"                                     |
| name             | VARCHAR | Card name                            | "Pikachu ex"                                     |
| type             | VARCHAR | Pokemon type                         | "Fire", "Water", "Lightning" (NULL for trainers) |
| hp               | VARCHAR | Hit points                           | "120", "150"                                     |
| rarity           | VARCHAR | Rarity level                         | "Rare Rainbow", "Common"                         |
| abilities        | VARCHAR | Special abilities                    | semicolon-separated)                             | "Static Shock: Paralysis" |
| attacks          | VARCHAR | Attack details (semicolon-separated) | "Circle Circuit: 90 damage - Switch"             |
| weakness         | VARCHAR | Weakness type                        | "Fighting", "Water"                              |
| resistance       | VARCHAR | Resistance type                      | NULL (rare in Pocket)                            |
| retreat_cost     | VARCHAR | Retreat cost (0-4)                   | "0", "1", "2"                                    |
| image_url        | VARCHAR | Card image URL                       | "https://limitlesstcg.nyc3..."                   |
| card_url         | VARCHAR | limitlesstcg.com link                | "https://pocket.limitlesstcg.com/..."            |
| evolution_stage  | VARCHAR | Evolution stage                      | "Basic", "Stage 1", "Stage 2", "Mega Evolution"  |
| evolves_from     | VARCHAR | Base Pokemon name                    | "Pikachu" (for Raichu)                           |
| evolves_to       | VARCHAR | Evolutions                           | "Raichu" (for Pikachu)                           |
| evolution_type   | VARCHAR | Evolution type                       | "Regular", "Mega", "Primal"                      |
| base_pokemon_id  | VARCHAR | Base form UUID                       | UUID of base form                                |
| is_evolution     | VARCHAR | Evolution flag                       | "true"/"false"                                   |
| evolution_method | VARCHAR | How evolution occurs                 | "Mega Evolution", "Level up"                     |

---

## Data Types

### VARCHAR Fields

All text fields are VARCHAR (variable length strings).

### Numeric Fields

HP and retreat_cost are stored as VARCHAR (not INTEGER). Cast for math:

```sql
CAST(hp AS INTEGER)
CAST(retreat_cost AS INTEGER)
```

### NULL Values

- **type**: NULL for Trainer/Item cards
- **resistance**: Almost always NULL (resistance removed in Pocket)
- **weakness**: NULL for cards with no weakness
- **abilities**: NULL for cards without abilities

---

## Special Values

### Type Values

```
Fire, Water, Grass, Lightning, Psychic, Fighting,
Darkness, Metal, Colorless, Dragon, Fairy, Poison
```

### Rarity Values

```
Common, Uncommon, Rare, Rare Rainbow,
Rare Holo, Rare Prime, Rare BREAK, etc.
```

### Retreat Cost Values

```
"0", "1", "2", "3", "4"
```

---

## Evolution Metadata Fields

### evolution_stage

Possible values:

- `Basic` - Base Pokemon
- `Stage 1` - First evolution
- `Stage 2` - Second evolution
- `Mega Evolution` - Mega form

### evolves_from / evolves_to

- **evolves_from**: Name of the Pokemon this evolves from
  - Example: "Raichu" has evolves_from = "Pikachu"
  - NULL for Basic Pokemon

- **evolves_to**: Comma-separated list of possible evolutions
  - Example: "Pikachu" has evolves_to = "Raichu"
  - NULL for final forms

### evolution_type

- `Regular` - Standard evolution
- `Mega` - Mega Evolution
- `Primal` - Primal Reversion
- `BREAK` - BREAK evolution

---

## Example Records

### Pokemon Card

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "set_code": "A1",
  "set_name": "Genetic Apex",
  "card_number": "008",
  "name": "Pikachu ex",
  "type": "Lightning",
  "hp": "120",
  "rarity": "Rare Rainbow",
  "abilities": "Static Shock: Paralyzes opponent if contacted",
  "attacks": "Circle Circuit: 90 damage - Switch to Bench",
  "weakness": "Fighting",
  "resistance": null,
  "retreat_cost": "2",
  "image_url": "https://limitlesstcg.nyc3.cdn.digitaloceanspaces.com/pocket/A1/A1_008_EN_SM.webp",
  "card_url": "https://pocket.limitlesstcg.com/cards/A1/A1_008",
  "evolution_stage": "Basic",
  "evolves_from": "",
  "evolves_to": "Raichu",
  "evolution_type": "Regular",
  "base_pokemon_id": null,
  "is_evolution": "false",
  "evolution_method": ""
}
```

### Trainer Card

```json
{
  "id": "660e8400-e29b-41d4-a716-446655440001",
  "set_code": "A1",
  "set_name": "Genetic Apex",
  "card_number": "054",
  "name": "Professor's Research",
  "type": null,
  "hp": null,
  "rarity": "Uncommon",
  "abilities": null,
  "attacks": "Draw 2 cards",
  "weakness": null,
  "resistance": null,
  "retreat_cost": null,
  "image_url": "...",
  "card_url": "...",
  "evolution_stage": null,
  "evolves_from": null,
  "evolves_to": null,
  "evolution_type": null,
  "base_pokemon_id": null,
  "is_evolution": "false",
  "evolution_method": null
}
```

### Mega Evolution

```json
{
  "id": "770e8400-e29b-41d4-a716-446655440002",
  "set_code": "B1",
  "set_name": "Mega Rising",
  "card_number": "010",
  "name": "Mega Charizard ex",
  "type": "Fire",
  "hp": "180",
  "rarity": "Rare Rainbow",
  "abilities": "Mega Evolution: Heal 30 damage",
  "attacks": "Inferno Destroyer: 150 damage",
  "weakness": "Water",
  "resistance": null,
  "retreat_cost": "3",
  "image_url": "...",
  "card_url": "...",
  "evolution_stage": "Mega Evolution",
  "evolves_from": "Charizard",
  "evolves_to": "",
  "evolution_type": "Mega",
  "base_pokemon_id": "uuid-of-charizard",
  "is_evolution": "true",
  "evolution_method": "Mega Evolution"
}
```

---

## Set Codes

| Code | Name                    | Release Date |
| ---- | ----------------------- | ------------ |
| A1   | Genetic Apex            | Oct 30, 2024 |
| A1a  | Mythical Island         | Dec 17, 2024 |
| A2   | Space-Time Smackdown    | Jan 29, 2025 |
| A2a  | Triumphant Light        | Feb 28, 2025 |
| A2b  | Shining Revelry         | Mar 27, 2025 |
| A3   | Celestial Guardians     | Apr 30, 2025 |
| A3a  | Extradimensional Crisis | May 29, 2025 |
| A3b  | Eevee Grove             | Jun 26, 2025 |
| A4   | Wisdom of Sea and Sky   | Jul 30, 2025 |
| A4a  | Secluded Springs        | Aug 28, 2025 |
| A4b  | Deluxe Pack: ex         | Sep 30, 2025 |
| B1   | Mega Rising             | TBD          |
| P-A  | Promo-A                 | TBD          |

---

## Indexes

While DuckDB manages indexing automatically, commonly queried columns include:

- `name` - For exact lookups
- `type` - For type filtering
- `set_code` - For set filtering
- `hp` - For HP range queries
- `weakness` - For weakness exploitation

---

## Data Quality

- **Total Cards**: 2,077
- **Unique Cards**: 1,068 (art variants removed)
- **Sets**: 12 complete sets
- **Coverage**: 100% of released cards
- **Validation**: All cards verified against limitlesstcg.com

---

## See Also

- `docs/02-tools-reference.md` - Tools that query this database
- `docs/06-sql-query-guide.md` - SQL queries against this schema
