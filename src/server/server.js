import express from 'express';
import bodyParser from 'body-parser'
import session from 'express-session'
import api from './api'
import react from 'react'

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();

server.disable( 'x-powered-by' )

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

server.use( express.static( process.env.RAZZLE_PUBLIC_DIR ) )

server.use('/api',api)

server.use(react)

export default server;
