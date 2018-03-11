import React from 'react';
import Route from 'react-router-dom/Route';
import Link from 'react-router-dom/Link';
import Switch from 'react-router-dom/Switch';
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';
import Fruits from '../services/Fruits/FruitsContainer'

const App = () => (
  <div>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/fruits">Fruits</Link>
      </li>
    </ul>

    <hr />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/fruits" component={Fruits} />
      <Route component={NotFound}/>
    </Switch>
  </div>
);

export default App;
