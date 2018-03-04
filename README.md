# Node-React Example

Server and client rendered react that uses:

- React for rendering
- Express for the server
- Webpack for building

The zero configuration bundle is provided through [Razzle](https://github.com/jaredpalmer/razzle)

Other tools used:

- [Passport](http://www.passportjs.org/docs/) for logging the user, with plugins [passport-local](https://github.com/jaredhanson/passport-local) and [passport-github2](https://github.com/cfsghost/passport-github)
- [SQLite3](https://github.com/mapbox/node-sqlite3) for the database and [Knex](http://knexjs.org/) to communicate with it
- [typeStyle](https://typestyle.github.io/) for css management
- [ReactRouter](https://reacttraining.com/react-router/web/guides/) for routes management
- Express plugins:
    - [connect-flash](https://github.com/jaredhanson/connect-flash) for persistent success or error messages for the user
    - body-parser to handle `POST` requests
    - express-session to handle sessions



## Install

- Fork on Github
- `git clone <repo>`
- `cd <repo>`
- `npm install`
- `npm start`

## Where do I start?

- Put files you want the user to see in [`./public`](./public)
- Everything else in [`./src`](./src)
