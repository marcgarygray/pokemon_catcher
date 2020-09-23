import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Home from '@material-ui/icons/Home';
import { UserNamedPokemon } from '../types';
import { usePokemon } from '../usePokemon';
import DataTable from './DataTable';
import { Card, Container } from './styled';
import routes from '../routes';

const getSelectedPokemon: (
  id: string,
  pokemon: UserNamedPokemon[],
) => UserNamedPokemon | null = (id, pokemon) => {
  const index = parseInt(id);
  if (!isNaN(index) && pokemon.length > index) {
    return pokemon[index];
  }
  return null;
};

const PokemonDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { pokemon } = usePokemon();

  const selectedPokemon = getSelectedPokemon(id, pokemon);

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
