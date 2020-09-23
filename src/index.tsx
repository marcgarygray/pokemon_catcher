import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './index.css';
import { PokemonProvider } from './pokemon/usePokemon';
import Home from './components/Home';
import PokemonDetail from './components/PokemonDetail';
import Catch from './components/Catch';
import routes from './routes';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <PokemonProvider>
      <BrowserRouter>
        <Switch>
          <Route path={routes.root} component={Home} exact />
          <Route path={routes.pokemon_detail} component={PokemonDetail} exact />
          <Route path={routes.catch} component={Catch} exact />
          <Route render={() => <h1>Not Found</h1>} />
        </Switch>
      </BrowserRouter>
    </PokemonProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
