import utils from '../utils';
import { mockedPokemon } from '../testData';

describe('getSelectedPokemon', () => {
  it('returns null if no Pokemon is selected', () => {
    const result = utils.getSelectedPokemon(null, [mockedPokemon]);
    expect(result).toBeNull();
  });
  it('returns the Pokemon by index if selected is a number', () => {
    const result = utils.getSelectedPokemon(0, [mockedPokemon]);
    expect(result).toEqual(mockedPokemon);
  });
});

describe('getPokemonByIndex', () => {
  it('returns null if invalid index value is passed', () => {
    expect(utils.getPokemonByIndex('1', [mockedPokemon])).toBeNull();
    expect(utils.getPokemonByIndex('foo', [mockedPokemon])).toBeNull();
  });

  it('returns the Pokemon by index if valid value is passed', () => {
    expect(utils.getPokemonByIndex('0', [mockedPokemon])).toEqual(
      mockedPokemon,
    );
  });
});

describe('getSelectedPokemonAbilities', () => {
  it('returns an empty string if no Pokemon is selected', () => {
    expect(utils.getSelectedPokemonAbilities(null)).toBe('');
  });
  it('returns a string indicating no abilities exist for this Pokemon if abilities array is empty', () => {
    expect(utils.getSelectedPokemonAbilities(mockedPokemon)).toBe(
      'The selected Pokémon has no abilities.',
    );
  });
  it('returns a list of abilities if the abilities array is populated', () => {
    const pokemonWithAbilities = {
      ...mockedPokemon,
      abilities: [
        {
          ability: { name: 'test ability one', url: '' },
          is_hidden: false,
          slot: 1,
        },
      ],
    };
    expect(utils.getSelectedPokemonAbilities(pokemonWithAbilities)).toBe(
      'The selected Pokemon has the following abilities: test ability one.',
    );
  });
});
