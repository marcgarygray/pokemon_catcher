import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Check from '@material-ui/icons/Check';
import { Pokemon } from '../common/types';
import { List } from './styled';

interface PokemonListItem extends Pokemon {
  itemClickHandler: React.MouseEventHandler;
  selected?: boolean;
  user_provided_name?: string;
}

interface Props {
  catchPage?: boolean;
  pokemon: PokemonListItem[];
}

const PokemonList: React.FC<Props> = ({ catchPage, pokemon }) => (
  <List dense>
    {pokemon.map((mon, i) => (
      <>
        <ListItem
          button
          key={`mon_${i}`}
          onClick={mon.itemClickHandler}
          selected={mon.selected}
        >
          <ListItemAvatar>
            <Avatar alt={mon.name} src={mon.sprites.front_default} />
          </ListItemAvatar>
          <ListItemText
            primary={`${mon.name}${
              mon.user_provided_name ? ` (${mon.user_provided_name})` : ''
            }`}
            secondary={
              catchPage
                ? mon.types.map(type => type.type.name).join(', ')
                : 'View Details'
            }
          />
          {mon.selected && <Check />}
        </ListItem>
        {i + 1 < pokemon.length && <Divider />}
      </>
    ))}
  </List>
);

export default PokemonList;
