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

export const add = ({title, slug, text}) => {
  return knex('articles').insert({title, slug, text},'article_id').then( id => {
    return { id, title, slug, text }
  })
}

export const remove = article_id => {
  return knex('articles')
  .where({ article_id })
  .del()
}

export const edit = (article_id, {title, slug, text}) => {
  return knex('users')
  .where({ article_id })
  .update({ title, slug, text })
}

export const list = (sort, direction) => {
  return knex('users').orderBy('name', 'desc')
}

