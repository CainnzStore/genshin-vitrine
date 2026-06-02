export interface Character {
  character_name: string
  element?: string
  weapon_type?: string
  constellation?: string
  signature?: string
}

export interface Weapon {
  weapon_name: string
  character_name?: string
  weapon_type?: string
  refinement?: string
}

export interface Account {
  id: number
  local_id: number
  name: string
  uid?: string
  server?: string
  status: string
  ar: number
  world_level: number
  primogems: number
  intertwined_wishes: number
  acquaint_wishes: number
  starglitter: number
  stardust: number
  fragile_resin: number
  price?: string
  tags?: string
  abyss_floor?: string
  birthday_set: boolean
  abyss_unlocked: boolean
  extra_info?: string
  characters_json: Character[] | string
  weapons_json: Weapon[] | string
  map_progress_json: Record<string, number> | string
  has_cover: boolean
  cover_image_base64?: string
  is_visible: boolean
  updated_at: string
  created_at: string
}
