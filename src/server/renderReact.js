import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import { Router } from 'express'
import App from '../Components/App';

/**
 * `is_production_build` will be false in development mode
 */
const is_production_build = process.env.NODE_ENV === 'production'

/** 
 * Takes a css source as a string
 * and returns an html stylesheet tag
 * @param string sheet a stylesheet source
 */
const render_stylesheet = sheet => `<link rel="stylesheet" href="${ sheet }"/>`

/** 
 * Takes a script source as a string
 * and returns an html script tag
 * @param string script a string source
 */
const render_script = is_production_build
    ? ( script ) => `<script src="${script}" defer></script>`
    : ( script ) => `<script src="${script}" defer crossorigin></script>`

/**
 * This function takes an object of properties and returns a string
 * that can be sent to the browser
 * @param { title, stylesheets, scripts, lang, html } parameters an object of options to render the page 
 */
export const renderPage = ( { title, stylesheets, scripts, lang="en", html } ) =>
`<!doctype html>`+
  `<html lang="${lang}">`+
  `<head>`+
    `<meta http-equiv="X-UA-Compatible" content="IE=edge" />`+
    `<meta charset="utf-8" />`+
    `<title>${title}</title>`+
    `<style>html, body { margin: 0; padding: 0; font-family: sans-serif; }</style>`+
    `<meta name="viewport" content="width=device-width, initial-scale=1">`+
    stylesheets.map(render_stylesheet).join('')+
    scripts.map(render_script).join('')+
  `</head>`+
  `<body>`+
    `<div id="root">${html}</div>`+
  `</body>`+
`</html>`

/**
 * A middleware to handle and respond to http requests
 * @param {Request Object} req The request as passed from node/express
 * @param {Response Object} res The response as passed from node/express
 */
export const handleRequest = ( req, res ) => {

  const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

  const context = {};
  
  const html = renderToString(
    <StaticRouter context={context} location={req.url}>
      <App />
    </StaticRouter>
  );

  if (context.url) {
      return res.redirect(context.url);
  }

  const status = context.status || 200

  const result = renderPage({
    title: '',
    lang: 'en',
    stylesheets: [ assets.client.css ],
    scripts: [ assets.client.js ],
    html
  })

  res.status(status).send(result);
}


const router = new Router()

router.get( '/*', handleRequest)

export default router