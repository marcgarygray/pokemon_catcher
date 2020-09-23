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

interface Row {
  label: string;
  value: string;
}

export const getTableRowsFromPokemonData: (
  pokemon: UserNamedPokemon,
) => Row[] = pokemon => {
  console.log(pokemon.stats);
  const rows: Row[] = [];
  rows.push({ label: 'Id', value: `${pokemon.id}` });
  rows.push({ label: 'Height', value: `${pokemon.height}` });
  rows.push({ label: 'Weight', value: `${pokemon.weight}` });
  rows.push({ label: 'Base Experience', value: `${pokemon.base_experience}` });
  rows.push({
    label: 'Abilities',
    value: pokemon.abilities.map(ability => ability.ability.name).join(', '),
  });
  rows.push({
    label: 'Types',
    value: pokemon.types.map(type => type.type.name).join(', '),
  });
  const hp = pokemon.stats.find(stat => stat.stat.name === 'hp');
  if (hp) {
    rows.push({
      label: 'HP',
      value: `${hp.base_stat}`,
    });
  }
  const attack = pokemon.stats.find(stat => stat.stat.name === 'attack');
  if (attack) {
    rows.push({
      label: 'Attack',
      value: `${attack.base_stat}`,
    });
  }
  const defense = pokemon.stats.find(stat => stat.stat.name === 'defense');
  if (defense) {
    rows.push({
      label: 'Defense',
      value: `${defense.base_stat}`,
    });
  }
  const special_attack = pokemon.stats.find(
    stat => stat.stat.name === 'special-attack',
  );
  if (special_attack) {
    rows.push({
      label: 'Special Attack',
      value: `${special_attack.base_stat}`,
    });
  }
  const special_defense = pokemon.stats.find(
    stat => stat.stat.name === 'special-defense',
  );
  if (special_defense) {
    rows.push({
      label: 'Special Defense',
      value: `${special_defense.base_stat}`,
    });
  }
  const speed = pokemon.stats.find(stat => stat.stat.name === 'speed');
  if (speed) {
    rows.push({
      label: 'Speed',
      value: `${speed.base_stat}`,
    });
  }
  return rows;
};
