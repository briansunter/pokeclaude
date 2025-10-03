# Pokemon Pocket MCP Server - Usage Examples

## Quick Start

After installing the MCP server in Claude Desktop, you can interact with it naturally through conversation.

---

## Example Conversations

### 🔍 Example 1: Find High HP Lightning Pokemon

**You**: Find all Lightning type Pokemon with at least 120 HP

**Claude Code**: [Automatically uses `search_cards` tool]
```json
{
  "type": "Lightning",
  "minHp": 120
}
```

**Result**:
```
- Pikachu ex (HP: 120)
- Raichu (HP: 120)
- Zapdos ex (HP: 140)
- Electivire (HP: 140)
- Magnezone (HP: 150)
```

---

### 🎯 Example 2: Build a Complete Deck

**You**: Build me a Charizard ex deck

**Claude Code**: [Uses `build-deck` prompt + multiple tools]

1. Gets Charizard ex details (`get_card`)
2. Finds Fire type synergies (`find_synergies`)
3. Searches for supporting Pokemon (`search_cards`)
4. Analyzes composition (`analyze_deck`)

**Deck List Generated**:
```
Pokemon (15):
- Charizard ex x2
- Charmander x2
- Charmeleon x2
- Moltres ex x2
- Arcanine ex x2
- Growlithe x2
- Rapidash x1
- Ponyta x1
- Ninetales x1

Trainers (5):
- Professor Oak x2
- Pokeball x2
- Potion x1

Strategy:
- Use Moltres ex's Inferno Dance to accelerate energy
- Charizard ex's Crimson Storm (200 damage) as main attacker
- Arcanine ex as secondary attacker
- 16-18 Fire Energy recommended
```

---

### 💥 Example 3: Counter Analysis

**You**: What beats Mewtwo ex decks?

**Claude Code**: [Uses `find_counters` tool]
```json
{
  "targetType": "Psychic"
}
```

**Result**:
```
Mewtwo ex is weak to: Darkness

Top Counters:
1. Weavile ex (140 HP, Darkness type)
   - Shadow Claw: 60 damage

2. Gengar (130 HP, Psychic/Darkness synergy)
   - Poltergeist: Variable damage

3. Muk (120 HP, Poison damage)
   - Sludge Bomb: 70 damage

Strategy:
- Exploit 2x weakness for OHKO potential
- Use low retreat cost for switching
- Add disruption trainers
```

---

### 📊 Example 4: Deck Analysis

**You**: Analyze my deck: Pikachu ex, Pikachu ex, Zapdos ex, Magneton, Magnemite, Magnemite, Electrode, Voltorb, Voltorb, Professor Oak, Pokeball, Pokeball

**Claude Code**: [Uses `analyze_deck` tool]

**Analysis Result**:
```json
{
  "deckSize": 12,
  "validCards": 12,
  "typeDistribution": {
    "Lightning": 10,
    "Trainer": 3
  },
  "estimatedEnergyNeeds": {
    "L": 18  // Lightning symbols counted across all attacks
  },
  "averageHp": 91.4
}

Issues Found:
❌ Only 12 cards (need 20 total)
✅ Type synergy excellent (100% Lightning)
⚠️  Missing evolution: Need Magneton for Magnemite
⚠️  Energy-heavy: Suggest 16-18 Lightning Energy

Recommendations:
+ Add 8 more cards:
  - 16 Lightning Energy
  - 1 Magneton (for Magnemite evolution)
  - 1 Red Card (disruption)
```

---

### 🔬 Example 5: Custom Analysis Query

**You**: Show me all Pokemon that have 0 retreat cost and deal at least 60 damage

**Claude Code**: [Uses `query_cards` tool]
```sql
SELECT name, type, hp, attacks, retreat_cost
FROM cards
WHERE retreat_cost = '0'
  AND attacks LIKE '%: 6%'
  OR attacks LIKE '%: 7%'
  OR attacks LIKE '%: 8%'
  OR attacks LIKE '%: 9%'
  OR attacks LIKE '%: 1%'
ORDER BY CAST(hp AS INTEGER) DESC
```

**Result**:
```
1. Starmie ex (HP: 130, 0 retreat)
   - Hydro Splash: 90

2. Rapidash (HP: 100, 0 retreat)
   - Flame Charge: 70

3. Infernape ex (HP: 150, 0 retreat)
   - Fire Fist: 60
```

---

### 🎲 Example 6: Find Specific Card

**You**: What are Moltres ex's attacks?

**Claude Code**: [Uses `get_card` tool]
```json
{
  "name": "Moltres ex"
}
```

**Result**:
```json
{
  "name": "Moltres ex",
  "type": "Fire",
  "hp": "140",
  "attacks": "R Inferno Dance: ; RRRR Heat Blast: 70",
  "weakness": "Lightning",
  "retreat_cost": "2",
  "rarity": "★★★"
}

Attacks Breakdown:
1. Inferno Dance (R)
   - Effect: Attach Fire energy from deck
   - Damage: None (utility)

2. Heat Blast (RRRR)
   - Damage: 70
   - Cost: 4 Fire Energy
```

---

### 📈 Example 7: Type Statistics

**You**: What's the average HP for each type?

**Claude Code**: [Uses `get_type_stats` tool]

**Result**:
```json
[
  { "type": "Dragon", "count": 29, "avg_hp": 115.2, "avg_retreat_cost": 1.7 },
  { "type": "Fire", "count": 189, "avg_hp": 98.5, "avg_retreat_cost": 1.6 },
  { "type": "Water", "count": 203, "avg_hp": 94.3, "avg_retreat_cost": 1.5 },
  { "type": "Lightning", "count": 145, "avg_hp": 88.7, "avg_retreat_cost": 1.2 },
  { "type": "Grass", "count": 178, "avg_hp": 91.2, "avg_retreat_cost": 1.4 },
  { "type": "Psychic", "count": 162, "avg_hp": 89.8, "avg_retreat_cost": 1.4 },
  { "type": "Fighting", "count": 187, "avg_hp": 102.4, "avg_retreat_cost": 1.8 },
  { "type": "Darkness", "count": 134, "avg_hp": 96.1, "avg_retreat_cost": 1.6 },
  { "type": "Metal", "count": 98, "avg_hp": 105.3, "avg_retreat_cost": 1.9 },
  { "type": "Colorless", "count": 165, "avg_hp": 93.7, "avg_retreat_cost": 1.7 }
]

Insights:
- Dragon type has highest average HP (115.2)
- Lightning type has lowest retreat cost (1.2)
- Metal type has highest retreat cost (1.9)
```

---

### 🎨 Example 8: Find Synergies

**You**: What cards work well with Gardevoir?

**Claude Code**: [Uses `find_synergies` tool]
```json
{
  "cardName": "Gardevoir"
}
```

**Result**:
```json
{
  "card": {
    "name": "Gardevoir",
    "type": "Psychic",
    "hp": "110",
    "attacks": "PP Psybeam: 60"
  },
  "sameTypeCards": [
    { "name": "Mewtwo ex", "hp": "150", "attacks": "PP Psydrive: 150" },
    { "name": "Alakazam", "hp": "130", "attacks": "P Psychic: 30+" },
    { "name": "Gengar", "hp": "130", "attacks": "P Poltergeist: 30x" }
  ],
  "trainers": [
    { "name": "Professor Oak", "description": "Draw cards" },
    { "name": "Pokeball", "description": "Search Pokemon" },
    { "name": "Rare Candy", "description": "Evolve instantly" }
  ]
}

Deck Strategy:
- Gardevoir as energy accelerator
- Mewtwo ex as main attacker (150 damage)
- Alakazam for variable damage
- Rare Candy for fast evolution
```

---

## Advanced Prompts

### Optimize Existing Deck

**You**: /optimize-deck deckList="Charizard ex, Moltres ex, Arcanine ex, Professor Oak, Pokeball"

**Claude analyzes**:
- ✅ Good core trio (Charizard, Moltres, Arcanine)
- ❌ Missing basic Pokemon (need Charmander, Growlithe)
- ❌ Missing energy cards (need 16-18 Fire Energy)
- ⚠️  Only 5 cards listed (need 20 total)

**Suggestions**:
```
Add:
+ Charmander x2 (for Charizard evolution)
+ Charmeleon x2 (evolution chain)
+ Growlithe x2 (for Arcanine)
+ Ponyta x2 (bench filler)
+ Rapidash x1 (low retreat utility)
+ Fire Energy x18
+ Potion x1

Final: 20 cards
```

---

### Build Counter Deck

**You**: /counter-deck targetType="Pikachu ex" sets="A1,A2,A3"

**Claude builds**:
```
Anti-Lightning Deck (Fighting type)

Pokemon:
- Primeape x2 (exploit weakness)
- Mankey x2
- Machamp x2
- Machop x2
- Machoke x2
- Onix x2
- Dugtrio x1
- Diglett x2

Trainers:
- Professor Oak x2
- X Speed x1 (retreat manipulation)

Strategy:
- Exploit Lightning's Fighting weakness (2x damage)
- High HP Fighting types tank hits
- Onix (110 HP) walls Pikachu ex
- Machamp (150 damage) OHKOs Pikachu ex
```

---

## Tips for Best Results

1. **Be Specific**: "Find Fire type Pokemon with 100+ HP" works better than "Find good Fire cards"

2. **Use Prompts**: Type `/build-deck mainCard="Mewtwo ex"` for guided workflows

3. **Combine Tools**: Claude will automatically chain tools:
   - Search → Analyze → Suggest → Optimize

4. **Ask Follow-ups**: "Now find counters to that deck" - Claude remembers context

5. **SQL Power Users**: "Run a query to find..." and Claude uses `query_cards`

---

## Tool Reference

| Tool | When to Use | Example |
|------|-------------|---------|
| `search_cards` | Find cards by filters | "Find all Dragon types" |
| `get_card` | Get specific card info | "Show me Charizard ex" |
| `find_synergies` | Build around a card | "What works with Gardevoir?" |
| `find_counters` | Counter a type/deck | "How do I beat Water decks?" |
| `get_type_stats` | Type analysis | "Which type has highest HP?" |
| `query_cards` | Custom SQL | "Show cards with 0 retreat" |
| `analyze_deck` | Deck validation | "Check my deck composition" |

---

## Common Questions

**Q: Can I search for cards with specific attacks?**
A: Yes! "Find Pokemon with attacks dealing 100+ damage"

**Q: How do I find evolution lines?**
A: "Show me the Charizard evolution line from Charmander"

**Q: Can I filter by set?**
A: Yes! "Find all ex Pokemon from set A1"

**Q: What about trainer cards?**
A: Search with `hasAttacks: false` or query where `type = ''`

**Q: Can I save deck lists?**
A: Claude Code can write deck lists to files for you

---

## Next Steps

1. Try the example conversations above
2. Experiment with custom queries
3. Use prompts for guided deck building
4. Build your ultimate Pokemon Pocket deck! 🎮
