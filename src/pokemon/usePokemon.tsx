import React, { createContext, useContext, useEffect, useState } from 'react';
import * as localforage from 'localforage';
import { UserNamedPokemon } from '../common/types';

export interface Context {
  addPokemon: (added: UserNamedPokemon) => Promise<void>;
  fetching: boolean;
  pokemon: UserNamedPokemon[];
}

export const PokemonContext = createContext<Context>({
  addPokemon: () => Promise.resolve(),
  fetching: false,
  pokemon: [],
});

export const PokemonProvider: React.FC = ({ children }) => {
  const [fetching, setFetching] = useState(true);
  const [pokemon, setPokemon] = useState<UserNamedPokemon[]>([]);

  const addPokemon: (
    added: UserNamedPokemon,
  ) => Promise<void> = async added => {
    await localforage.setItem('pokemon', [...pokemon, added]);
    setPokemon([...pokemon, added]);
    return;
  };

  useEffect(() => {
    const fetchPokemon: () => Promise<void> = async () => {
      const fetchedPokemon = await localforage.getItem<
        UserNamedPokemon[] | null
      >('pokemon');
      if (fetchedPokemon !== null) {
        setPokemon(fetchedPokemon);
      }
      setFetching(false);
    };

    fetchPokemon();
  }, []);

  return (
    <PokemonContext.Provider value={{ addPokemon, fetching, pokemon }}>
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemon: () => Context = () => useContext(PokemonContext);
