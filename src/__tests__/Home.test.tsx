import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, RenderResult } from '@testing-library/react';
import Home, { emptyInventoryMessage } from '../components/Home';
import { Factory } from '../types';
import { PokemonContext } from '../usePokemon';
import { mockedPokemon, mockPokemonSpeciesName } from '../testData';

const renderWithRouter: Factory<RenderResult> = () => {
  return render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>,
  );
};

const renderWithStoredPokemon: Factory<RenderResult> = () => {
  return render(
    <PokemonContext.Provider
      value={{
        pokemon: [mockedPokemon],
        fetching: false,
        addPokemon: () => Promise.resolve(),
      }}
    >
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    </PokemonContext.Provider>,
  );
};

test('Shows empty inventory list message when no inventory is present', () => {
  const { queryByText } = renderWithRouter();
  expect(queryByText(emptyInventoryMessage)).not.toBeNull();
});

test('Inventory list shows if there is a Pokemon in local storage', () => {
  const { queryByText } = renderWithStoredPokemon();
  expect(queryByText(mockPokemonSpeciesName)).not.toBeNull();
});
