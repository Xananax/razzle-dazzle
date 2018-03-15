import React from 'react';
import Route from 'react-router-dom/Route';
import Link from 'react-router-dom/Link';
import Switch from 'react-router-dom/Switch';
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';
import Fruits from '../services/Fruits/FruitsContainer'
import Articles from '../services/Articles/ArticlesContainer'

const App = () => (
  <div>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/fruits">Fruits</Link>
      </li>
      <li>
        <Link to="/articles">Articles</Link>
      </li>
    </ul>

    <hr />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/fruits" component={Fruits} />
      <Route path="/articles" component={Articles} />
      <Route component={NotFound}/>
    </Switch>
  </div>
);

export default App;
