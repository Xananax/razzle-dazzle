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
  return knex('articles')
  .where({ article_id })
  .update({ title, slug, text })
}

export const list = (sort,limit=10,offset=0,direction='desc') => {
  if(!sort){
    return knex.select('*').from('articles').limit(limit).offset(offset)
  }
  if(sort !== 'created_at' && sort!== 'slug' ){
    return Promise.reject(new Error(`'${sort}' is not a valid ordering property`))
  }
  direction = ( direction === 'asc' ? 'asc' : 'desc')
  return knex('articles').orderBy(sort, direction).limit(limit).offset(offset)
}

export const getOne = (property, value) => {
  if(property !== 'id' && property !== 'article_id' && property !== 'slug'){
    return Promise.reject(new Error(`'${property}' is not a valid key`))
  }
  if(property === 'id'){ property === 'article_id' }
  return knex.select('*').from('articles').where({[property]:value}).limit(1)
}

export const getOneById = id => getOne('article_id',id)

export const search = (property, value, limit=10) => {
  if(property !== 'id' && property !== 'article_id' && property !== 'slug'){
    return Promise.reject(new Error(`'${property}' is not a valid key`))
  }
  if(property === 'id'){ property === 'article_id' }
  return knex.select('*').from('articles').where(property, 'like', `%${value}%`).limit(limit)
}

