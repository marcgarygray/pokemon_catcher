import { Pokemon } from '../common/types';

const baseRoute = 'https://pokeapi.co/api/v2/pokemon';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getJSON: (route: string) => Promise<any> = async route => {
  try {
    const response = await fetch(route, { method: 'GET' });
    if (response.ok) {
      const parsed = await response.json();
      return parsed;
    }
    return null;
  } catch (_) {
    return null;
  }
};

const getTotalAvailablePokemonCount: () => Promise<number> = async () => {
  try {
    const responseJSON = await getJSON(baseRoute);
    if (responseJSON && responseJSON.count) {
      return responseJSON.count;
    }
    return 0;
  } catch (_) {
    return 0;
  }
};

export const getRandomPokemon: (
  num: number,
) => Promise<Pokemon[]> = async num => {
  try {
    const total = await getTotalAvailablePokemonCount();
    if (total === 0) {
      return [];
    }

    const everyPokemonResponseJSON = await getJSON(
      `${baseRoute}/?limit=${total}`,
    );
    const randomPokemonURLs: string[] = Array(num)
      .fill(null)
      .map(() => {
        const random = Math.floor(Math.random() * total) + 1;
        return everyPokemonResponseJSON.results[random].url;
      });
    const randomPokemon = await Promise.all(
      randomPokemonURLs.map(async url => {
        const pokemonResponseJSON = await getJSON(url);
        return pokemonResponseJSON as Pokemon;
      }),
    );
    return randomPokemon;
  } catch (_) {
    return [];
  }
};
