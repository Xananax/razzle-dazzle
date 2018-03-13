
exports.up = (knex, Promise) => {
	return Promise.all([
        knex.schema.createTable('articles', (table) => {
            table.increments('article_id').primary();
            table.string('title').notNullable()
            table.string('slug').notNullable()
            table.string('text');
            table.timestamps(true, true);
        })
    ])
  
};

exports.down = (knex, Promise) => {

	return Promise.all([
        knex.schema.dropTable('articles')
    ])
  
};
