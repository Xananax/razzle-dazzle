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
const page = ( { title, stylesheets, scripts, lang="en", html } ) =>
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

export default page