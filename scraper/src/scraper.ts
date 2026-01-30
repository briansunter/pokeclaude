import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

/**
 * Pokemon Pocket Card Scraper
 *
 * Automatically scrapes Pokemon TCG Pocket cards from limitlesstcg.com
 * Features:
 * - Auto-discovery of new sets (including B1: Mega Rising)
 * - Incremental updates (only new cards)
 * - Parallel scraping for speed
 * - Zod validation for data integrity
 * - Proper CSV parsing with quoted string handling
 * - Text sanitization to remove extra whitespace/newlines
 */

// ==================== ZOD SCHEMAS ====================

const AttackSchema = z.object({
	name: z.string().min(1),
	cost: z.string().optional(),
	damage: z.string().optional(),
	effect: z.string().optional(),
});

const PokemonCardSchema = z.object({
	id: z.string().uuid(),
	set_code: z.string().min(1).max(10),
	set_name: z.string().min(1).max(100),
	card_number: z.string().min(1).max(10),
	name: z.string().min(1).max(200),
	type: z.string().max(50).optional(),
	hp: z.string().max(10).optional(),
	rarity: z.string().max(50).optional(),
	abilities: z.array(z.string()).optional(),
	attacks: z.array(AttackSchema).optional(),
	weakness: z.string().max(100).optional(),
	resistance: z.string().max(50).optional(),
	retreat_cost: z.string().max(5).optional(),
	image_url: z.string().url(),
	card_url: z.string().url(),
	// Evolution metadata fields
	evolution_stage: z.string().max(50).optional(),
	evolves_from: z.string().max(100).optional(),
	evolves_to: z.string().max(200).optional(),
	evolution_type: z.string().max(50).optional(),
	base_pokemon_id: z.string().uuid().optional(),
	is_evolution: z.string().max(10).optional(),
	evolution_method: z.string().max(100).optional(),
});

const SetInfoSchema = z.object({
	code: z.string().min(1).max(10),
	name: z.string().min(1).max(100),
	release_date: z.string().max(50),
	total_cards: z.number().int().nonnegative(),
});

// ==================== TYPES ====================

type PokemonCard = z.infer<typeof PokemonCardSchema>;
type Attack = z.infer<typeof AttackSchema>;
type SetInfo = z.infer<typeof SetInfoSchema>;

// ==================== UTILITY FUNCTIONS ====================

/**
 * Sanitize text by removing extra whitespace, newlines, and trimming
 */
function sanitizeText(text: string): string {
	return text
		.replace(/\s+/g, ' ') // Replace all whitespace (including newlines) with single space
		.trim();
}

/**
 * Retry helper for network requests with exponential backoff
 */
async function fetchWithRetry<T>(
	fn: () => Promise<T>,
	maxRetries: number = 3,
	context: string = 'request'
): Promise<T> {
	let lastError: Error | undefined;

	for (let attempt = 1; attempt <= maxRetries; attempt++) {
		try {
			return await fn();
		} catch (error) {
			lastError = error instanceof Error ? error : new Error(String(error));

			// If it's the last attempt, throw the error
			if (attempt === maxRetries) {
				throw lastError;
			}

			// Exponential backoff: 1s, 2s, 4s
			const backoffMs = Math.pow(2, attempt - 1) * 1000;
			console.warn(
				`⚠️  ${context} failed (attempt ${attempt}/${maxRetries}): ${lastError.message}`
			);
			console.warn(`   Retrying in ${backoffMs}ms...`);

			// Wait before retrying
			await new Promise((resolve) => setTimeout(resolve, backoffMs));
		}
	}

	// This should never be reached, but TypeScript needs it
	throw lastError || new Error('Unknown error in fetchWithRetry');
}

/**
 * Proper CSV parser that handles quoted strings with commas and newlines
 */
function parseCsvLine(line: string): string[] {
	const result: string[] = [];
	let current = '';
	let inQuotes = false;

	for (let i = 0; i < line.length; i++) {
		const char = line[i];
		const nextChar = line[i + 1];

		if (char === '"') {
			if (inQuotes && nextChar === '"') {
				// Escaped quote inside quotes
				current += '"';
				i++;
			} else {
				// Toggle quote state
				inQuotes = !inQuotes;
			}
		} else if (char === ',' && !inQuotes) {
			// Field separator
			result.push(current);
			current = '';
		} else {
			current += char;
		}
	}
	result.push(current);
	return result;
}

/**
 * Validate a card using Zod schema
 */
function validateCard(card: unknown): PokemonCard {
	try {
		return PokemonCardSchema.parse(card);
	} catch (error) {
		if (error instanceof z.ZodError) {
			console.error('❌ Card validation failed:', error.issues);
			throw new Error(`Invalid card data: ${JSON.stringify(error.issues)}`);
		}
		throw error;
	}
}

/**
 * Validate set info using Zod schema
 */
function validateSetInfo(set: unknown): SetInfo {
	try {
		return SetInfoSchema.parse(set);
	} catch (error) {
		if (error instanceof z.ZodError) {
			console.error('❌ Set validation failed:', error.issues);
			throw new Error(`Invalid set data: ${JSON.stringify(error.issues)}`);
		}
		throw error;
	}
}

// ==================== EVOLUTION METADATA ====================

/**
 * Detect and populate evolution metadata for a Pokemon card
 */
function detectEvolutionMetadata(
	card: PokemonCard,
	allCards: PokemonCard[]
): void {
	const cardName = card.name.trim();

	// Detect Mega Evolution: "Mega [Pokemon] ex"
	const megaMatch = cardName.match(/^Mega\s+(.+?)(?:\s+ex)?$/i);
	if (megaMatch) {
		const baseName = megaMatch[1].trim();
		card.evolution_stage = 'Mega Evolution';
		card.evolves_from = baseName;
		card.evolves_to = '';
		card.evolution_type = 'Mega';
		card.evolution_method = 'Mega Evolution';
		card.is_evolution = 'true';

		// Find base Pokemon ID
		const baseCard = allCards.find((c) => c.name === baseName);
		if (baseCard) {
			card.base_pokemon_id = baseCard.id;
		}
		return;
	}

	// Detect regular Pokemon cards
	// For now, assume all Pokemon without "Mega" prefix are basic forms
	// Future enhancement: detect Stage 1/Stage 2 via database lookup

	// Check if this is a base form for any mega evolution
	const hasMegaEvo = allCards.some((c) => {
		const cName = c.name.trim();
		const match = cName.match(/^Mega\s+(.+?)(?:\s+ex)?$/i);
		return match && match[1].trim() === cardName;
	});

	if (hasMegaEvo) {
		// This is a base Pokemon that has a mega evolution
		card.evolution_stage = 'Basic';
		card.evolves_from = '';
		// Find all mega evolutions
		const megaEvos = allCards
			.filter((c) => {
				const cName = c.name.trim();
				const match = cName.match(/^Mega\s+(.+?)(?:\s+ex)?$/i);
				return match && match[1].trim() === cardName;
			})
			.map((c) => c.name);
		card.evolves_to = megaEvos.join(', ');
		card.evolution_type = 'Regular';
		card.evolution_method = '';
		card.is_evolution = 'false';
	} else {
		// Regular Pokemon without known evolution
		card.evolution_stage = 'Basic';
		card.evolves_from = '';
		card.evolves_to = '';
		card.evolution_type = 'Regular';
		card.evolution_method = '';
		card.is_evolution = 'false';
	}
}

// ==================== SET DISCOVERY ====================

/**
 * Auto-detect sets from the website
 */
async function discoverSets(): Promise<SetInfo[]> {
	console.log('🔍 Auto-discovering sets from limitlesstcg.com...\n');

	try {
		// Scrape the main cards page to find all available sets
		const response = await fetchWithRetry(
			async () =>
				await axios.get('https://pocket.limitlesstcg.com/cards', {
					headers: {
						'User-Agent':
							'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
					},
					timeout: 30000,
				}),
			3,
			'set discovery'
		);

		const $ = cheerio.load(response.data);
		const sets: SetInfo[] = [];

		// Look for set links - they follow pattern /cards/{SET_CODE}
		// These appear as navigation links on the cards page
		$('a[href^="/cards/"]').each((_, element) => {
			const href = $(element).attr('href');
			if (!href) return;

			// Match /cards/{SET_CODE} but not /cards/{SET_CODE}/{NUMBER}
			const match = href.match(/^\/cards\/([A-Z0-9-]+)$/i);
			if (!match) return;

			const setCode = match[1];
			// Get the text content and sanitize it
			const setName = sanitizeText($(element).text() || setCode);

			// Skip if already added or if it's just "Cards" link
			if (sets.find((s) => s.code === setCode)) return;
			if (setCode.toLowerCase() === 'cards') return;

			try {
				sets.push(
					validateSetInfo({
						code: setCode,
						name: setName,
						release_date: '',
						total_cards: 0,
					})
				);
			} catch {
				// Skip invalid sets
			}
		});

		if (sets.length === 0) {
			console.log('⚠️  No sets found, using fallback list\n');
			return FALLBACK_SETS;
		}

		console.log(`✅ Found ${sets.length} sets:\n`);
		for (const set of sets) {
			console.log(`   - ${set.code}: ${set.name}`);
		}
		console.log();

		return sets;
	} catch (error) {
		console.error('❌ Error discovering sets, using fallback:');
		console.error(error instanceof Error ? error.message : error);
		console.log();
		return FALLBACK_SETS;
	}
}

// Fallback sets in case auto-discovery fails
const FALLBACK_SETS: SetInfo[] = [
	{ code: 'B1', name: 'Mega Rising', release_date: '', total_cards: 331 },
	{ code: 'B1a', name: 'Crimson Blaze', release_date: '', total_cards: 103 },
	{ code: 'P-B', name: 'Promo-B', release_date: '', total_cards: 24 },
	{
		code: 'A4b',
		name: 'Deluxe Pack: ex',
		release_date: '30 Sep 25',
		total_cards: 379,
	},
	{
		code: 'A4a',
		name: 'Secluded Springs',
		release_date: '28 Aug 25',
		total_cards: 105,
	},
	{
		code: 'A4',
		name: 'Wisdom of Sea and Sky',
		release_date: '30 Jul 25',
		total_cards: 241,
	},
	{
		code: 'A3b',
		name: 'Eevee Grove',
		release_date: '26 Jun 25',
		total_cards: 107,
	},
	{
		code: 'A3a',
		name: 'Extradimensional Crisis',
		release_date: '29 May 25',
		total_cards: 103,
	},
	{
		code: 'A3',
		name: 'Celestial Guardians',
		release_date: '30 Apr 25',
		total_cards: 239,
	},
	{
		code: 'A2b',
		name: 'Shining Revelry',
		release_date: '27 Mar 25',
		total_cards: 111,
	},
	{
		code: 'A2a',
		name: 'Triumphant Light',
		release_date: '28 Feb 25',
		total_cards: 96,
	},
	{
		code: 'A2',
		name: 'Space-Time Smackdown',
		release_date: '29 Jan 25',
		total_cards: 207,
	},
	{
		code: 'A1a',
		name: 'Mythical Island',
		release_date: '17 Dec 24',
		total_cards: 86,
	},
	{
		code: 'A1',
		name: 'Genetic Apex',
		release_date: '30 Oct 24',
		total_cards: 286,
	},
	{ code: 'P-A', name: 'Promo-A', release_date: '', total_cards: 0 },
];

// ==================== CARD SCRAPING ====================

async function scrapeSet(
	setInfo: SetInfo,
	concurrency = 20
): Promise<PokemonCard[]> {
	const cards: PokemonCard[] = [];
	const baseUrl = 'https://pocket.limitlesstcg.com/cards';
	const url = `${baseUrl}/${setInfo.code}`;

	console.log(`Scraping set: ${setInfo.name} (${setInfo.code})...`);

	try {
		const response = await fetchWithRetry(
			async () =>
				await axios.get(url, {
					headers: {
						'User-Agent':
							'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
					},
					timeout: 30000,
				}),
			3,
			`set ${setInfo.code}`
		);

		const $ = cheerio.load(response.data);

		$('a[href*="/cards/"]').each((_, element) => {
			const href = $(element).attr('href');
			if (!href || href === `/cards/${setInfo.code}`) return;

			const cardMatch =
				href.match(/\/cards\/([A-Z0-9-]+_\d+)/i) ||
				href.match(/\/cards\/([A-Z0-9-]+)\/(\d+)/i);

			if (cardMatch) {
				const fullCardId = cardMatch[1];
				const cardNumber = fullCardId.includes('_')
					? fullCardId.split('_')[1]
					: cardMatch[2];

				const img = $(element).find('img').first();
				const paddedNumber = cardNumber.padStart(3, '0');
				const cdnUrl =
					'https://limitlesstcg.nyc3.cdn.digitaloceanspaces.com/pocket';
				const imgSrc =
					img.attr('src') ||
					cdnUrl +
						'/' +
						setInfo.code +
						'/' +
						setInfo.code +
						'_' +
						paddedNumber +
						'_EN_SM.webp';

				const cardName = sanitizeText(
					img.attr('alt') || img.attr('title') || 'Unknown'
				);

				try {
					const card = validateCard({
						id: uuidv4(),
						set_code: setInfo.code,
						set_name: setInfo.name,
						card_number: cardNumber,
						name: cardName,
						image_url: imgSrc,
						card_url: `https://pocket.limitlesstcg.com${href}`,
					});
					cards.push(card);
				} catch {
					// Skip invalid cards
				}
			}
		});

		if (cards.length === 0 && setInfo.total_cards > 0) {
			console.log('  No cards found in HTML, generating from card count...');
			for (let i = 1; i <= setInfo.total_cards; i++) {
				const cardNumber = i.toString().padStart(3, '0');
				const cdnUrl =
					'https://limitlesstcg.nyc3.cdn.digitaloceanspaces.com/pocket';
				try {
					const card = validateCard({
						id: uuidv4(),
						set_code: setInfo.code,
						set_name: setInfo.name,
						card_number: i.toString(),
						name: `Card ${i}`,
						image_url:
							cdnUrl +
							'/' +
							setInfo.code +
							'/' +
							setInfo.code +
							'_' +
							cardNumber +
							'_EN_SM.webp',
						card_url:
							'https://pocket.limitlesstcg.com/cards/' +
							setInfo.code +
							'_' +
							cardNumber,
					});
					cards.push(card);
				} catch {
					// Skip invalid cards
				}
			}
		}

		console.log(`  Found ${cards.length} cards`);

		// Scrape card details in parallel batches
		await scrapeCardsInBatches(cards, concurrency);
	} catch (error) {
		console.error(`  Error scraping set ${setInfo.code}:`, error);
	}

	return cards;
}

// Scrape cards in parallel batches to avoid overwhelming the server
async function scrapeCardsInBatches(
	cards: PokemonCard[],
	concurrency: number
): Promise<void> {
	const total = cards.length;
	let completed = 0;

	console.log(`  Scraping ${total} cards with concurrency ${concurrency}...`);

	for (let i = 0; i < cards.length; i += concurrency) {
		const batch = cards.slice(i, i + concurrency);

		await Promise.all(batch.map((card) => scrapeCardDetails(card)));

		completed += batch.length;
		if (completed % 50 === 0 || completed === total) {
			console.log(`  Progress: ${completed}/${total}`);
		}
	}
}

async function scrapeCardDetails(card: PokemonCard): Promise<void> {
	try {
		const response = await fetchWithRetry(
			async () =>
				await axios.get(card.card_url, {
					headers: {
						'User-Agent':
							'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
					},
					timeout: 10000,
				}),
			2, // Fewer retries for individual cards to avoid slowing down
			`card ${card.set_code}:${card.card_number}`
		);

		const $ = cheerio.load(response.data);

		// Extract name from title
		const title = sanitizeText($('title').text());
		const nameMatch = title.match(/^([^•]+)/);
		if (nameMatch) {
			card.name = sanitizeText(nameMatch[1]);
		}

		// Extract type and HP from card-text-title
		const cardName = sanitizeText($('.card-text-name').text());
		const cardTitle = sanitizeText($('.card-text-title').text());

		// Remove the card name from the title to get just the type and HP parts
		let typeAndHp = cardTitle;
		if (cardName) {
			typeAndHp = cardTitle.replace(cardName, '').trim();
		}

		// Now parse "- Type - HP" pattern
		const typeMatch = typeAndHp.match(/^\s*-\s*([^-]+)\s*-/);
		if (typeMatch) {
			card.type = sanitizeText(typeMatch[1]);
		}

		const hpMatch = typeAndHp.match(/(\d+)\s*HP/);
		if (hpMatch) card.hp = hpMatch[1];

		// Extract attacks
		const attacks: Attack[] = [];
		$('.card-text-attack').each((_, element) => {
			const attackInfo = sanitizeText(
				$(element).find('.card-text-attack-info').text()
			);
			const attackEffect = sanitizeText(
				$(element).find('.card-text-attack-effect').text()
			);

			// Parse attack name and damage (handles "Name 50" or "Name 30x" or just "Name")
			const match = attackInfo.match(/([A-Z][\w\s]+?)\s+(\d+x?)\s*$/);
			if (match) {
				attacks.push({
					name: match[1].trim(),
					damage: match[2],
					effect: attackEffect || undefined,
				});
			} else {
				attacks.push({
					name: attackInfo,
					effect: attackEffect || undefined,
				});
			}
		});
		if (attacks.length > 0) card.attacks = attacks;

		// Extract weakness, resistance, and retreat
		const wrr = sanitizeText($('.card-text-wrr').text());

		// Weakness format: "Weakness: Type" (capture only the type, stop at Retreat or end)
		const weaknessMatch = wrr.match(/Weakness:\s*([A-Za-z]+?)(?:\s+Retreat:|$)/);
		if (weaknessMatch) card.weakness = sanitizeText(weaknessMatch[1]);

		// Retreat format: "Retreat: N"
		const retreatMatch = wrr.match(/Retreat:\s*(\d+)/);
		if (retreatMatch) card.retreat_cost = retreatMatch[1];
	} catch {
		// Silently fail for individual cards
	}
}

// ==================== CSV IMPORT/EXPORT ====================

function escapeCsv(value: string): string {
	if (!value) return '';
	// Sanitize value before escaping
	const sanitized = sanitizeText(value);
	const needsQuotes =
		sanitized.includes(',') ||
		sanitized.includes('"') ||
		sanitized.includes('\n');
	if (needsQuotes) {
		return `"${sanitized.replace(/"/g, '""')}"`;
	}
	return sanitized;
}

function exportToCSV(cards: PokemonCard[], filename: string): void {
	const headers = [
		'id',
		'set_code',
		'set_name',
		'card_number',
		'name',
		'type',
		'hp',
		'rarity',
		'abilities',
		'attacks',
		'weakness',
		'resistance',
		'retreat_cost',
		'image_url',
		'card_url',
		// Evolution metadata fields
		'evolution_stage',
		'evolves_from',
		'evolves_to',
		'evolution_type',
		'base_pokemon_id',
		'is_evolution',
		'evolution_method',
	];

	const csvLines = [headers.join(',')];

	for (const card of cards) {
		const attacksStr = card.attacks
			? card.attacks
					.map((a) => {
						let str = `${a.name}: ${a.damage || ''}`;
						if (a.effect) str += ` - ${a.effect}`;
						return str;
					})
					.join('; ')
			: '';
		const row = [
			escapeCsv(card.id),
			escapeCsv(card.set_code),
			escapeCsv(card.set_name),
			escapeCsv(card.card_number),
			escapeCsv(card.name),
			escapeCsv(card.type || ''),
			escapeCsv(card.hp || ''),
			escapeCsv(card.rarity || ''),
			escapeCsv(card.abilities ? card.abilities.join('; ') : ''),
			escapeCsv(attacksStr),
			escapeCsv(card.weakness || ''),
			escapeCsv(card.resistance || ''),
			escapeCsv(card.retreat_cost || ''),
			escapeCsv(card.image_url),
			escapeCsv(card.card_url),
			// Evolution metadata
			escapeCsv(card.evolution_stage || ''),
			escapeCsv(card.evolves_from || ''),
			escapeCsv(card.evolves_to || ''),
			escapeCsv(card.evolution_type || ''),
			escapeCsv(card.base_pokemon_id || ''),
			escapeCsv(card.is_evolution || ''),
			escapeCsv(card.evolution_method || ''),
		];
		csvLines.push(row.join(','));
	}

	writeFileSync(filename, csvLines.join('\n'), 'utf-8');
	console.log(`\nExported ${cards.length} cards to ${filename}`);
}

/**
 * Parse existing CSV to get full card objects
 * Uses proper CSV parsing to handle quoted strings with commas
 */
function parseExistingCsv(filename: string): PokemonCard[] {
	if (!existsSync(filename)) {
		return [];
	}

	console.log(`📂 Loading existing cards from ${filename}...`);

	try {
		const csvContent = readFileSync(filename, 'utf-8');
		const lines = csvContent.split('\n');
		const cards: PokemonCard[] = [];
		let errors = 0;
		const errorExamples: string[] = [];

		// Skip header line
		for (let i = 1; i < lines.length; i++) {
			const line = lines[i].trim();
			if (!line) continue;

			// Use proper CSV parsing that handles quoted strings with commas
			const parts = parseCsvLine(line);
			if (parts.length >= 15) {
				try {
					const attacksStr = parts[9] || '';
					const attacks: Attack[] = attacksStr
						.split(';')
						.map((a) => {
							const [name, rest] = a.trim().split(':');
							if (!rest) return { name: name?.trim() || '' };

							// Split on ' - ' to separate damage from effect
							const [damage, effect] = rest.split(' - ').map((s) => s.trim());
							return {
								name: name?.trim() || '',
								damage: damage || undefined,
								effect: effect || undefined,
							};
						})
						.filter((a) => a.name);

					const card = validateCard({
						id: parts[0] || '',
						set_code: parts[1] || '',
						set_name: sanitizeText(parts[2] || ''),
						card_number: parts[3] || '',
						name: sanitizeText(parts[4] || ''),
						type: parts[5] || undefined,
						hp: parts[6] || undefined,
						rarity: parts[7] || undefined,
						abilities: parts[8]
							? parts[8].split(';').filter((a) => a)
							: undefined,
						attacks: attacks,
						weakness: parts[10] || undefined,
						resistance: parts[11] || undefined,
						retreat_cost: parts[12] || undefined,
						image_url: parts[13] || '',
						card_url: parts[14] || '',
						// Evolution metadata fields (may not exist in old CSV)
						evolution_stage: parts[15] || undefined,
						evolves_from: parts[16] || undefined,
						evolves_to: parts[17] || undefined,
						evolution_type: parts[18] || undefined,
						base_pokemon_id: parts[19] || undefined,
						is_evolution: parts[20] || undefined,
						evolution_method: parts[21] || undefined,
					});

					cards.push(card);
				} catch (err) {
					errors++;
					// Store first 10 error examples
					if (errorExamples.length < 10) {
						const cardId = parts[3] || 'unknown';
						const error = err instanceof Error ? err.message : 'Unknown error';
						errorExamples.push(`Line ${i + 1}: ${cardId} - ${error}`);
					}
				}
			}
		}

		if (errors > 0) {
			console.log(`⚠️  Skipped ${errors} invalid cards during parsing`);
			if (errorExamples.length > 0) {
				console.log('   First few errors:');
				errorExamples.forEach((example) => {
					console.log(`   - ${example}`);
				});
			}
		}
		console.log(`✅ Loaded ${cards.length} existing cards\n`);
		return cards;
	} catch (error) {
		console.error('❌ Error parsing existing CSV:', error);
		return [];
	}
}

// ==================== MERGE LOGIC ====================

function mergeCards(
	existingCards: PokemonCard[],
	newCards: PokemonCard[]
): PokemonCard[] {
	const existingKeys = new Set(
		existingCards.map((c) => `${c.set_code}:${c.card_number}`)
	);

	const uniqueNewCards = newCards.filter((card) => {
		const key = `${card.set_code}:${card.card_number}`;
		return !existingKeys.has(key);
	});

	console.log('\n📊 Merge Statistics:');
	console.log(`   Existing cards: ${existingCards.length}`);
	console.log(`   New cards scraped: ${newCards.length}`);
	console.log(`   Unique new cards: ${uniqueNewCards.length}`);
	console.log(
		`   Total cards: ${existingCards.length + uniqueNewCards.length}\n`
	);

	return [...existingCards, ...uniqueNewCards];
}

// ==================== MAIN ====================

async function main() {
	console.log('Pokemon Pocket Card Scraper');
	console.log('============================\n');

	// Check if --full flag is passed
	const isFullScrape = process.argv.includes('--full');
	const csvFile = '../data/pokemon_pocket_cards.csv';

	if (isFullScrape) {
		console.log('🔄 Running FULL scrape (ignoring existing data)\n');
	} else {
		console.log('⚡ Running INCREMENTAL scrape (only new cards)\n');
	}

	// Load existing cards if doing incremental update
	const existingCards = isFullScrape ? [] : parseExistingCsv(csvFile);
	const existingCardKeys = new Set(
		existingCards.map((c) => `${c.set_code}:${c.card_number}`)
	);

	// Auto-discover sets from the website
	const sets = await discoverSets();

	const newCards: PokemonCard[] = [];
	let skippedCount = 0;

	// Scrape all sets in parallel
	console.log(`\n🚀 Scraping ${sets.length} sets in parallel...\n`);

	const allSetCards = await Promise.all(
		sets.map((setInfo) => scrapeSet(setInfo))
	);

	// Flatten and filter cards
	for (const setCards of allSetCards) {
		for (const card of setCards) {
			const key = `${card.set_code}:${card.card_number}`;
			if (!isFullScrape && existingCardKeys.has(key)) {
				skippedCount++;
			} else {
				newCards.push(card);
			}
		}
	}

	// Merge with existing cards
	const allCards = isFullScrape
		? newCards
		: mergeCards(existingCards, newCards);

	// Detect evolution metadata for all cards
	console.log('\n🔍 Detecting evolution metadata...');
	for (const card of allCards) {
		detectEvolutionMetadata(card, allCards);
	}
	console.log(`✅ Populated evolution metadata for ${allCards.length} cards\n`);

	exportToCSV(allCards, csvFile);

	console.log('\n============================');
	if (!isFullScrape && skippedCount > 0) {
		console.log(`Skipped ${skippedCount} existing cards`);
		console.log(`Added ${newCards.length} new cards`);
	}
	console.log(`Total cards in database: ${allCards.length}`);
	console.log('Scraping complete!');
}

main().catch(console.error);
