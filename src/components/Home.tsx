import React from 'react';
import styled from '@emotion/styled';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import DefaultContainer from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Loading from '@material-ui/core/CircularProgress';
import logo from '../logo.svg';
import { usePokemon } from '../pokemon/usePokemon';
import routes from '../routes';
import { Consumer } from '../common/types';

const Container = styled(DefaultContainer)`
  text-align: center;
  padding-top: 48px;
  color: #1d2c5e;
  h1 {
    display: none;
  }
  h2 {
    font-size: 2em;
    margin-bottom: 24px;
  }
  h4 {
    text-align: left;
    font-size: 1.5em;
  }
  a.MuiTypography-root {
    background: #ffcb05;
    display: inline-block;
    border-radius: 4px;
    padding: 12px 24px;
    transition: all 0.2s ease-in-out;
    &:hover {
      background: #1d2c53;
      color: #ffcb05;
    }
  }
`;

const EmptyMessage = styled(Typography)`
  &.MuiTypography-body1 {
    margin: 0 0 24px;
  }
`;

const Home: React.FC = () => {
  const { fetching, pokemon } = usePokemon();

  const history = useHistory();

  const handleItemClick: Consumer<number> = i => {
    history.push(routes.pokemon_detail.replace(':id', `${i}`));
  };

  return (
    <Container>
      <Typography variant="h1">Pokémon Catcher</Typography>
      <img src={logo} alt="Pokemon Logo" />
      <Typography variant="h2">Gotta Catch &apos;Em All!</Typography>
      {fetching && <Loading />}
      {!fetching && pokemon.length === 0 && (
        <EmptyMessage variant="body1">
          You haven&apos;t caught any Pokémon yet.
        </EmptyMessage>
      )}
      {!fetching && pokemon.length > 0 && (
        <>
          <Typography variant="h4">Current Inventory:</Typography>
          <List dense>
            {pokemon.map((mon, i) => (
              <>
                <ListItem
                  button
                  key={`mon_${i}`}
                  onClick={() => handleItemClick(i)}
                >
                  <ListItemAvatar>
                    <Avatar alt={mon.name} src={mon.sprites.front_default} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${mon.name} (${mon.user_provided_name})`}
                    secondary="View Details"
                  />
                </ListItem>
                {i + 1 < pokemon.length && <Divider />}
              </>
            ))}
          </List>
        </>
      )}
      <Link to={routes.catch} component={RouterLink} underline="none">
        Catch Pokemon
      </Link>
    </Container>
  );
};

export default Home;
