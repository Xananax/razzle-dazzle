import App from '../Components/App';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import React from 'react';
import { hydrate } from 'react-dom';

const react_container = document.getElementById('root')

hydrate(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  react_container
);

if (module.hot) {
  module.hot.accept();
}
