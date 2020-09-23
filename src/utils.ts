import { UserNamedPokemon } from './types';

export const getSelectedPokemon: (
  id: string,
  pokemon: UserNamedPokemon[],
) => UserNamedPokemon | null = (id, pokemon) => {
  const index = parseInt(id);
  if (!isNaN(index) && pokemon.length > index) {
    return pokemon[index];
  }
  return null;
};
