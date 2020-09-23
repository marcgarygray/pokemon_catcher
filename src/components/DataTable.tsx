import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { UserNamedPokemon } from '../types';

interface Props {
  pokemon: UserNamedPokemon;
}
const DataTable: React.FC<Props> = ({ pokemon }) => {
  return (
    <Table component={Paper}>
      <TableBody>
        <TableRow>
          <TableCell size="small">ID:</TableCell>
          <TableCell>{pokemon.id}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default DataTable;
