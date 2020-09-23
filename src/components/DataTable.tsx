import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { UserNamedPokemon } from '../types';
import { getTableRowsFromPokemonData } from '../utils';

interface Props {
  pokemon: UserNamedPokemon;
}
const DataTable: React.FC<Props> = ({ pokemon }) => (
  <Table size="small" component={Paper}>
    <TableBody>
      {getTableRowsFromPokemonData(pokemon).map(row => (
        <TableRow key={row.label}>
          <TableCell>{row.label}</TableCell>
          <TableCell>{row.value}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default DataTable;
