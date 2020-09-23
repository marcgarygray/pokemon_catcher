import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Loading from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Home from '@material-ui/icons/Home';
import { getRandomPokemon } from '../api/api';
import { Consumer, Factory, Pokemon } from '../types';
import routes from '../routes';
import { usePokemon } from '../usePokemon';
import PokemonList from './PokemonList';
import Dialog from './Dialog';
import { Container } from './styled';

const Catch: React.FC = () => {
  const [randomPokemon, setRandomPokemon] = useState<Pokemon[]>([]);
  const [fetching, setFetching] = useState(true);
  const [selected, setSelected] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

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

  const handleUserConfirmation: Consumer<string> = async (name: string) => {
    if (selected !== null) {
      await addPokemon({
        ...randomPokemon[selected],
        user_provided_name: name,
      });
      history.push(routes.root);
    }
  };

  const getSelectedPokemon: Factory<Pokemon | null> = () =>
    selected ? randomPokemon[selected] : null;

  return (
    <>
      <Container>
        <Link className="home-link" to={routes.root}>
          <Home color="inherit" />
        </Link>
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
            <Button
              color="inherit"
              disabled={selected === null}
              disableElevation
              onClick={() => setDialogOpen(true)}
              variant="contained"
            >
              Catch Selected Pokémon
            </Button>
          </>
        )}
      </Container>
      <Dialog
        onButtonClick={handleUserConfirmation}
        open={dialogOpen}
        selectedPokemon={getSelectedPokemon()}
      />
    </>
  );
};

export default Catch;
