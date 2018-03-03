import App from '../Components/App';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import express from 'express';
import { renderToString } from 'react-dom/server';
import renderPage from './renderPage'
import api from './api'

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();

server.disable( 'x-powered-by' )

server.use( express.static( process.env.RAZZLE_PUBLIC_DIR ) )

server.use('/api',api)

server.get( '/*', ( req, res ) => {

  const context = {};

  const html = renderToString(
    <StaticRouter context={context} location={req.url}>
      <App />
    </StaticRouter>
  );

  if (context.url) {
    return res.redirect(context.url);
  }

  const result = renderPage({
    title: '',
    lang: 'en',
    stylesheets: [ assets.client.css ],
    scripts: [ assets.client.js ],
    html,
  })

  res.status(200).send(result);

});

export default server;
