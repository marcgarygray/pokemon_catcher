import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Home from '@material-ui/icons/Home';
import { usePokemon } from '../usePokemon';
import routes from '../routes';
import { getPokemonByIndex } from '../utils';
import DataTable from './DataTable';
import { Card, Container } from './styled';

const PokemonDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { pokemon } = usePokemon();

  const selectedPokemon = getPokemonByIndex(id, pokemon);

  return (
    <Container>
      <Link className="home-link" to={routes.root}>
        <Home color="inherit" />
      </Link>
      <Typography variant="h1">Pokémon Details</Typography>
      {selectedPokemon === null && (
        <Typography variant="body1">
          No Pokémon could be found matching that ID.
        </Typography>
      )}
      {selectedPokemon !== null && (
        <Card>
          <img src={selectedPokemon.sprites.front_default} />
          <Typography variant="h3">{selectedPokemon.name}</Typography>
          {selectedPokemon.user_provided_name && (
            <Typography variant="h5">
              {selectedPokemon.user_provided_name}
            </Typography>
          )}
          <DataTable pokemon={selectedPokemon} />
        </Card>
      )}
    </Container>
  );
};

export default PokemonDetail;
