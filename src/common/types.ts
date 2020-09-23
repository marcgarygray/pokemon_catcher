export type Factory<T> = () => T;
export type Consumer<T> = (arg: T) => void;
export type Runnable = () => void;

interface Resource {
  name: string;
  url: string;
}

interface Ability {
  ability: Resource;
  is_hidden: boolean;
  slot: number;
}

interface GameIndex {
  game_index: number;
  version: Resource;
}

/* Note - this is not an extensive list */
export interface Pokemon {
  abilities: Ability[];
  base_experience: number;
  forms: Resource[];
  game_indices: GameIndex[];
  height: number;
  id: number;
  name: string;
  order: number;
  species: Resource;
  sprites: {
    front_default: string;
  };
  weight: number;
}
