import express from 'express';
import bodyParser from 'body-parser'
import session from 'express-session'
import api from '../services/api'
import renderReact from './renderReact'
const server = express();

/**
 * Remove the useless `x-powered-by` mention from headers
 */
server.disable( 'x-powered-by' )

/**
 * bodyParser allows to parse POST requests
 */
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
/**
 * This creates a cookie and stores it in the user's browser, which allows
 * us to recognize the user. This is called a "session"
 */
server.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

/**
 * A file server, often called a "static server"
 */
server.use( express.static( process.env.RAZZLE_PUBLIC_DIR ) )

/**
 * Here, we plug our own routes.
 * First, the api module will be mounted on `api`
 */
server.use('/api',api)

/**
 * Finally, we let the React renderer take care of the rest
 */
server.use(renderReact)

export default server;
