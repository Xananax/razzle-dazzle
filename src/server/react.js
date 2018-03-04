import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import { Router } from 'express'
import App from '../Components/App';
import renderPage from './renderPage'

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const router = new Router()

router.get( '/*', ( req, res ) => {

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
    html
  })

  res.status(200).send(result);
});

export default router