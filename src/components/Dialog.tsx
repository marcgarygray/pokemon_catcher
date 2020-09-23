import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import MaterialDialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Consumer, Pokemon } from '../types';

interface Props {
  onButtonClick: Consumer<string>;
  open: boolean;
  selectedPokemon: Pokemon | null;
}

const Dialog: React.FC<Props> = ({ onButtonClick, open, selectedPokemon }) => {
  const [userNameInput, setUserNameInput] = useState('');

  return (
    <MaterialDialog disableBackdropClick open={open}>
      <DialogTitle>Optional: Name Your Pokémon</DialogTitle>
      <DialogContent>
        <Typography variant="body2">
          Name your {selectedPokemon?.name} (type{' '}
          {selectedPokemon?.types.map(type => type.type.name).join(', ')}
          ):
          <TextField
            onChange={e => setUserNameInput(e.target.value)}
            placeholder="Enter name here"
            style={{ display: 'block', margin: '24px 0' }}
            value={userNameInput}
          />
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          color="inherit"
          disableElevation
          onClick={() => onButtonClick('')}
          variant="contained"
        >
          Skip
        </Button>
        <Button
          color="inherit"
          disableElevation
          onClick={() => onButtonClick(userNameInput)}
          variant="contained"
        >
          Confirm
        </Button>
      </DialogActions>
    </MaterialDialog>
  );
};

export default Dialog;
