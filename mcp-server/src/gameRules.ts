/**
 * Pokemon TCG Pocket Game Rules Constants
 *
 * This file contains core game rules and constants for Pokemon TCG Pocket.
 * Use these for validation and game logic throughout the codebase.
 */

export const GAME_RULES = {
  // Deck Construction
  DECK_SIZE: 20,
  MAX_COPIES_PER_CARD: 2,
  MIN_BASIC_POKEMON: 5,
  RECOMMENDED_MIN_BASIC: 6,

  // Gameplay
  MAX_BENCH_SLOTS: 3,
  POINTS_TO_WIN: 3,
  STARTING_HAND_SIZE: 5,

  // Energy System
  MAX_ENERGY_TYPES: 3,
  RECOMMENDED_ENERGY_TYPES: 2,
  ENERGY_PER_TURN: 1, // Auto-generated

  // Card Ratios (Recommended)
  RECOMMENDED_POKEMON_MIN: 12,
  RECOMMENDED_POKEMON_MAX: 15,
  RECOMMENDED_TRAINERS_MIN: 5,
  RECOMMENDED_TRAINERS_MAX: 8,

  // Points
  REGULAR_POKEMON_POINTS: 1,
  EX_POKEMON_POINTS: 2,
} as const;

export const GAME_CONTEXT = `
Pokemon TCG Pocket uses a unique format:
- 20-card decks with Energy Zone (auto-generates 1 Energy/turn, NOT from deck)
- 3-point win condition (ex Pokemon = 2 pts, regular = 1 pt)
- Max 3 bench slots (not 5 like standard TCG)
- Turn 1 restrictions: no draw, no energy, no attack
- 1-2 Energy types recommended (3+ types = inconsistent due to random generation)
- Max 2 copies per card
`;

export const IMPORTANT_CARDS = {
  // Universal Staples
  STAPLES: [
    'Professor\'s Research', // Draw 2
    'Poké Ball',             // Search Basic
    'Sabrina',               // Switch opponent
    'Giovanni',              // +10 damage
  ],

  // Key Items
  STAGE_2_ACCELERATION: 'Rare Candy', // Skip Stage 1
  EVOLUTION_SEARCH: 'Pokémon Communication',

  // Tools
  HP_BOOST: 'Giant Cape',      // +20 HP
  GRASS_HP_BOOST: 'Leaf Cape', // +30 HP (Grass only)
  CHIP_DAMAGE: 'Rocky Helmet', // 20 damage to attacker
} as const;

export const ENERGY_CONSISTENCY = {
  ONE_TYPE: 'Always generates that type (100% consistent)',
  TWO_TYPES: 'Random 50/50 split (good flexibility)',
  THREE_TYPES: 'Random 33/33/33 split (too inconsistent - avoid)',
} as const;

export const COMMON_MISTAKES = [
  'Running 3 Energy types (too inconsistent)',
  'Not including enough Basics (5-6 minimum)',
  'Over-benching (leaves vulnerable to Sabrina/Cyrus)',
  'Forgetting +10 damage from Giovanni for KO math',
  'Not including Rare Candy in Stage 2 decks',
] as const;

/**
 * Check if a deck meets basic Pokemon TCG Pocket rules
 */
export function validateDeckRules(deckSize: number, energyTypeCount: number, basicCount: number): {
  valid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Critical errors
  if (deckSize !== GAME_RULES.DECK_SIZE) {
    errors.push(`Deck must be exactly ${GAME_RULES.DECK_SIZE} cards (current: ${deckSize})`);
  }

  // Warnings
  if (energyTypeCount > GAME_RULES.RECOMMENDED_ENERGY_TYPES) {
    warnings.push(`${energyTypeCount} Energy types detected. Recommend 1-2 for Energy Zone consistency`);
  }

  if (basicCount < GAME_RULES.MIN_BASIC_POKEMON) {
    warnings.push(`Only ${basicCount} Basic Pokemon. Recommend ${GAME_RULES.RECOMMENDED_MIN_BASIC} minimum`);
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}
