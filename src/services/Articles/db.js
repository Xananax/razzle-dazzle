import Knex from 'knex'

var knex = Knex({
  client: 'sqlite3',
  connection: {
    filename: "./mydb.sqlite"
  },
  useNullAsDefault: true,
  migrations: {
    tableName: 'migrations',
    directory:__dirname+'/migrations'
  }
});

knex.migrate.latest()

export const add = ({title, slug, text}) => {
  const new_article = {title, slug, text}
  return validate(new_article)
  .then(
    article => knex('articles').insert(article,'article_id').then( ([article_id]) => {
      return { article_id, title, slug, text }
    })
  )
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

export const list = (sort='article_id',limit=10,offset=0,direction='desc') => {
  const is_valid_property = /created_at|slug|title|article_id/.test(sort)

  if(is_valid_property){
    return Promise.reject(new Error(`'${sort}' is not a valid ordering property`))
  }

  direction = ( direction === 'asc' ? 'asc' : 'desc')
  return knex.select('*').from('articles').orderBy(sort, direction).limit(limit).offset(offset)
}

export const getOne = (property, value) => {
  if(property !== 'id' && property !== 'article_id' && property !== 'slug'){
    return Promise.reject(new Error(`'${property}' is not a valid key`))
  }
  if(property === 'id'){ property = 'article_id' }
  return knex.select('*').from('articles').where({[property]:value}).limit(1)
}

export const getOneById = id => getOne('article_id',id)

export const search = (property, value, sort='article_id',limit=10,offset=0,direction='desc') => {
  if(property !== 'id' && property !== 'article_id' && property !== 'slug'){
    return Promise.reject(new Error(`'${property}' is not a valid key`))
  }
  if(property === 'id'){ property = 'article_id' }
  direction = ( direction === 'asc' ? 'asc' : 'desc')
  return knex.select('*').from('articles').where(property, 'like', `%${value}%`).orderBy(sort, direction).limit(limit).offset(offset)
}

export const validate = (article) => {
  if(!article){ return Promise.reject(new Error(`no article provided`)) }
  const errors = []
  if(!article.title){ errors.push(`no \`title\` provided`) }
  if(!article.slug){ errors.push(`no \`slug\` provided`)}
  if(!article.text){ errors.push(`no \`text\` provided`)}
  if(errors.length){
    const error_message = errors.join(', ')
    const error = new Error(error_message)
    return Promise.reject(error)
  }
  return Promise.resolve(article)
}