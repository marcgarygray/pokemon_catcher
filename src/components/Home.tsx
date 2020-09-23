import React from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Loading from '@material-ui/core/CircularProgress';
import PokemonList from './PokemonList';
import logo from '../logo.svg';
import { usePokemon } from '../pokemon/usePokemon';
import routes from '../routes';
import { Consumer } from '../common/types';
import { Container } from './styled';

const Home: React.FC = () => {
  const { fetching, pokemon } = usePokemon();

  const history = useHistory();

  const handleItemClick: Consumer<number> = i => {
    history.push(routes.pokemon_detail.replace(/:id/, `${i}`));
  };

  return (
    <Container hideTitle>
      <Typography variant="h1">Pokémon Catcher</Typography>
      <img src={logo} alt="Pokemon Logo" />
      <Typography variant="h2">Gotta Catch &apos;Em All!</Typography>
      {fetching && <Loading />}
      {!fetching && pokemon.length === 0 && (
        <Typography variant="body1">
          You haven&apos;t caught any Pokémon yet.
        </Typography>
      )}
      {!fetching && pokemon.length > 0 && (
        <>
          <Typography variant="h4">Current Inventory:</Typography>
          <PokemonList
            pokemon={pokemon.map((mon, i) => ({
              ...mon,
              itemClickHandler: () => handleItemClick(i),
            }))}
          />
        </>
      )}
      <Link to={routes.catch} component={RouterLink} underline="none">
        Catch Pokémon
      </Link>
    </Container>
  );
};

export default Home;
