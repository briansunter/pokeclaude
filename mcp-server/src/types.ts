// Shared type definitions for Pokemon Pocket MCP Server

export interface Card {
	id: string;
	set_code: string;
	set_name: string;
	card_number: string;
	name: string;
	type: string;
	hp: string;
	rarity: string;
	abilities: string;
	attacks: string;
	weakness: string;
	resistance: string;
	retreat_cost: string;
	image_url: string;
	card_url: string;
	// Evolution metadata fields
	evolution_stage?: string;
	evolves_from?: string;
	evolves_to?: string;
	evolution_type?: string;
	base_pokemon_id?: string;
	is_evolution?: string;
	evolution_method?: string;
	[key: string]: unknown;
}

export interface TypeStats {
	type: string;
	count: number;
	avg_hp: number;
	avg_retreat_cost: number;
}
