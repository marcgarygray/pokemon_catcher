import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Loading from '@material-ui/core/CircularProgress';
import Checkmark from '@material-ui/icons/Check';
import { getRandomPokemon } from '../api/api';
import { Consumer, Pokemon } from '../common/types';
import routes from '../routes';
import { usePokemon } from '../pokemon/usePokemon';

const Catch: React.FC = () => {
  const [randomPokemon, setRandomPokemon] = useState<Pokemon[]>([]);
  const [fetching, setFetching] = useState(true);
  const [selected, setSelected] = useState<number | null>(null);

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

  const handleCatchClick = async () => {
    if (selected !== null) {
      await addPokemon({
        ...randomPokemon[selected],
        user_provided_name: 'custom name!',
      });
      history.push(routes.root);
    }
  };

  return (
    <>
      {fetching && <Loading />}
      {!fetching && randomPokemon.length === 0 && (
        <p>No Pokémon currently available to catch</p>
      )}
      {!fetching && randomPokemon.length > 0 && (
        <>
          <ul>
            {randomPokemon.map((mon, i) => (
              <li key={`mon_${i}`}>
                <button onClick={() => handlePokemonClick(i)}>
                  {mon.name} {i === selected && <Checkmark />}
                </button>
              </li>
            ))}
          </ul>
          <Button disabled={selected === null} onClick={handleCatchClick}>
            Catch Selected Pokémon
          </Button>
        </>
      )}
    </>
  );
};

export default Catch;
