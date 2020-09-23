import React from 'react';
import { useParams } from 'react-router-dom';

const PokemonDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return <h1>Pokemon Detail for: {id}</h1>;
};

export default PokemonDetail;
