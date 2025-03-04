export interface PkmnLegends {
  name: string
}

export interface SelectPkmn {
  name: string
}

export interface StarterPkmns{
  name: string,
  front_default: string,
  back_default: string,
  dream_front: string,
  showdown_front: string,
  showdown_back: string,
  hp: number,
  attack: number  
}

export interface Pokemon {
  abilities: Ability[]
  base_experience: number
  cries: Cries
  forms: Form[]
  game_indices: any[]
  height: number
  held_items: any[]
  id: number
  is_default: boolean
  location_area_encounters: string
  moves: Mfe[]
  name: string
  order: number
  past_abilities: any[]
  past_types: any[]
  species: Species
  sprites: Sprites
  stats: Stat[]
  types: Type[]
  weight: number
}

export interface Ability {
  ability: Ability2
  is_hidden: boolean
  slot: number
}

export interface Ability2 {
  name: string
  url: string
}

export interface Cries {
  latest: string
  legacy: any
}

export interface Form {
  name: string
  url: string
}

export interface Mfe {
  move: Move
  version_group_details: VersionGroupDetail[]
}

export interface Move {
  name: string
  url: string
}

export interface VersionGroupDetail {
  level_learned_at: number
  move_learn_method: MoveLearnMethod
  version_group: VersionGroup
}

export interface MoveLearnMethod {
  name: string
  url: string
}

export interface VersionGroup {
  name: string
  url: string
}

export interface Species {
  name: string
  url: string
}

export interface Sprites {
  back_default: any
  back_female: any
  back_shiny: any
  back_shiny_female: any
  front_default: string
  front_female: any
  front_shiny: string
  front_shiny_female: any
  other: Other
  versions: Versions
}

export interface Other {
  dream_world: DreamWorld
  home: Home
  "official-artwork": OfficialArtwork
  showdown: Showdown
}

export interface DreamWorld {
  front_default: any
  front_female: any
}

export interface Home {
  front_default: string
  front_female: any
  front_shiny: string
  front_shiny_female: any
}

export interface OfficialArtwork {
  front_default: string
  front_shiny: string
}

export interface Showdown {
  back_default: any
  back_female: any
  back_shiny: any
  back_shiny_female: any
  front_default: any
  front_female: any
  front_shiny: any
  front_shiny_female: any
}

export interface Versions {
  "generation-i": GenerationI
  "generation-ii": GenerationIi
  "generation-iii": GenerationIii
  "generation-iv": GenerationIv
  "generation-v": GenerationV
  "generation-vi": GenerationVi
  "generation-vii": GenerationVii
  "generation-viii": GenerationViii
}

export interface GenerationI {
  "red-blue": RedBlue
  yellow: Yellow
}

export interface RedBlue {
  back_default: any
  back_gray: any
  back_transparent: any
  front_default: any
  front_gray: any
  front_transparent: any
}

export interface Yellow {
  back_default: any
  back_gray: any
  back_transparent: any
  front_default: any
  front_gray: any
  front_transparent: any
}

export interface GenerationIi {
  crystal: Crystal
  gold: Gold
  silver: Silver
}

export interface Crystal {
  back_default: any
  back_shiny: any
  back_shiny_transparent: any
  back_transparent: any
  front_default: any
  front_shiny: any
  front_shiny_transparent: any
  front_transparent: any
}

export interface Gold {
  back_default: any
  back_shiny: any
  front_default: any
  front_shiny: any
  front_transparent: any
}

export interface Silver {
  back_default: any
  back_shiny: any
  front_default: any
  front_shiny: any
  front_transparent: any
}

export interface GenerationIii {
  emerald: Emerald
  "firered-leafgreen": FireredLeafgreen
  "ruby-sapphire": RubySapphire
}

export interface Emerald {
  front_default: any
  front_shiny: any
}

export interface FireredLeafgreen {
  back_default: any
  back_shiny: any
  front_default: any
  front_shiny: any
}

export interface RubySapphire {
  back_default: any
  back_shiny: any
  front_default: any
  front_shiny: any
}

export interface GenerationIv {
  "diamond-pearl": DiamondPearl
  "heartgold-soulsilver": HeartgoldSoulsilver
  platinum: Platinum
}

export interface DiamondPearl {
  back_default: any
  back_female: any
  back_shiny: any
  back_shiny_female: any
  front_default: any
  front_female: any
  front_shiny: any
  front_shiny_female: any
}

export interface HeartgoldSoulsilver {
  back_default: any
  back_female: any
  back_shiny: any
  back_shiny_female: any
  front_default: any
  front_female: any
  front_shiny: any
  front_shiny_female: any
}

export interface Platinum {
  back_default: any
  back_female: any
  back_shiny: any
  back_shiny_female: any
  front_default: any
  front_female: any
  front_shiny: any
  front_shiny_female: any
}

export interface GenerationV {
  "black-white": BlackWhite
}

export interface BlackWhite {
  animated: Animated
  back_default: any
  back_female: any
  back_shiny: any
  back_shiny_female: any
  front_default: any
  front_female: any
  front_shiny: any
  front_shiny_female: any
}

export interface Animated {
  back_default: any
  back_female: any
  back_shiny: any
  back_shiny_female: any
  front_default: any
  front_female: any
  front_shiny: any
  front_shiny_female: any
}

export interface GenerationVi {
  "omegaruby-alphasapphire": OmegarubyAlphasapphire
  "x-y": XY
}

export interface OmegarubyAlphasapphire {
  front_default: any
  front_female: any
  front_shiny: any
  front_shiny_female: any
}

export interface XY {
  front_default: any
  front_female: any
  front_shiny: any
  front_shiny_female: any
}

export interface GenerationVii {
  icons: Icons
  "ultra-sun-ultra-moon": UltraSunUltraMoon
}

export interface Icons {
  front_default: any
  front_female: any
}

export interface UltraSunUltraMoon {
  front_default: any
  front_female: any
  front_shiny: any
  front_shiny_female: any
}

export interface GenerationViii {
  icons: Icons2
}

export interface Icons2 {
  front_default: any
  front_female: any
}

export interface Stat {
  base_stat: number
  effort: number
  stat: Stat2
}

export interface Stat2 {
  name: string
  url: string
}

export interface Type {
  slot: number
  type: Type2
}

export interface Type2 {
  name: string
  url: string
}
