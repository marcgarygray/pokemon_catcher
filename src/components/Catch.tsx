import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Loading from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { getRandomPokemon } from '../api/api';
import { Consumer, Pokemon } from '../common/types';
import routes from '../routes';
import { usePokemon } from '../pokemon/usePokemon';
import PokemonList from './PokemonList';
import { Container } from './styled';

const Catch: React.FC = () => {
  const [randomPokemon, setRandomPokemon] = useState<Pokemon[]>([]);
  const [fetching, setFetching] = useState(true);
  const [selected, setSelected] = useState<number | null>(null);

  const { addPokemon } = usePokemon();

  const history = useHistory();

  useEffect(() => {
    const fetchRandomPokemon: () => Promise<void> = async () => {
      const fetched = await getRandomPokemon(10);
      setRandomPokemon(fetched);
      setFetching(false);
    };
    fetchRandomPokemon();
  }, []);

  const handlePokemonClick: Consumer<number> = index => {
    if (selected === index) {
      setSelected(null);
    } else {
      setSelected(index);
    }
  };

  const handleCatchClick = async () => {
    if (selected !== null) {
      await addPokemon({
        ...randomPokemon[selected],
        user_provided_name: 'custom name!',
      });
      history.push(routes.root);
    }
  };

  return (
    <Container>
      <Typography variant="h1">Catch a Pokémon!</Typography>
      {fetching && <Loading />}
      {!fetching && randomPokemon.length === 0 && (
        <Typography variant="body1">
          No Pokémon currently available to catch
        </Typography>
      )}
      {!fetching && randomPokemon.length > 0 && (
        <>
          <PokemonList
            catchPage
            pokemon={randomPokemon.map((mon, i) => ({
              ...mon,
              itemClickHandler: () => handlePokemonClick(i),
              selected: selected === i,
            }))}
          />
          <Button disabled={selected === null} onClick={handleCatchClick}>
            Catch Selected Pokémon
          </Button>
        </>
      )}
    </Container>
  );
};

export default Catch;
