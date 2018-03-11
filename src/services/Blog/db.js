import Knex from 'knex'

var knex = Knex({
  client: 'sqlite3',
  connection: {
    filename: "./mydb.sqlite"
  },
  migrations: {
    tableName: 'migrations'
  }
});

