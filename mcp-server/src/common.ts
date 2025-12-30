// Shared constants and helper functions for Pokemon Pocket MCP Server

// Field selection presets to reduce context usage
// - minimal: Just id and name (smallest response)
// - basic: Common fields without images/URLs (default for all tools)
// - full: All 22 fields including set info, images, URLs, and evolution metadata
export const FIELD_PRESETS = {
	minimal: ['id', 'name'] as const,
	basic: [
		'id',
		'name',
		'type',
		'hp',
		'attacks',
		'weakness',
		'retreat_cost',
		'rarity',
	] as const,
	full: [
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
	] as const,
};

export type FieldPreset = keyof typeof FIELD_PRESETS;
export type FieldArray = string[];
export type FieldSelection = FieldPreset | FieldArray;

// Helper to filter fields from objects
export function filterFields<T extends Record<string, unknown>>(
	data: T | T[],
	fields?: FieldSelection
): T | T[] {
	if (!fields) {
		return data; // full fields if not specified
	}

	const fieldList =
		typeof fields === 'string'
			? FIELD_PRESETS[fields as FieldPreset] || []
			: fields;

	const filterObject = (obj: T) => {
		const filtered: Record<string, unknown> = {};
		for (const field of fieldList) {
			if (field in obj) {
				filtered[field] = (obj as Record<string, unknown>)[field];
			}
		}
		return filtered as T;
	};

	return Array.isArray(data) ? data.map(filterObject) : filterObject(data);
}

// Helper to serialize data with BigInt support
export function safeJsonStringify(data: unknown): string {
	return JSON.stringify(
		data,
		(_key, value) => (typeof value === 'bigint' ? value.toString() : value),
		2
	);
}
