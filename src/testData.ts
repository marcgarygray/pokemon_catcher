import { UserNamedPokemon } from './types';

export const mockPokemonSpeciesName = 'Test Species Name';

export const mockedPokemon: UserNamedPokemon = {
  abilities: [],
  base_experience: 1,
  forms: [],
  game_indices: [],
  height: 1,
  id: 1,
  name: mockPokemonSpeciesName,
  order: 1,
  species: {
    name: '',
    url: '',
  },
  sprites: { front_default: '' },
  stats: [],
  types: [],
  weight: 1,
};
