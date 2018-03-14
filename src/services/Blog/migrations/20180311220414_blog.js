
exports.up = (knex, Promise) =>
  Promise.all([
    knex.schema.createTable('users', (table) => {
      table.increments('user_id').primary();
      table.string('email').notNullable()
      table.string('password').notNullable()
      table.string('nick');
      table.timestamps(true, true);
    }),

    knex.schema.createTable('posts', (table) => {
      table.increments('post_id').primary();
      table.string('title');
      table.string('body');
      table.integer('user_id')
        .references('user_id')
        .inTable('users');
      table.timestamps(true, true);
    }),

    knex.schema.createTable('comments', (table) => {
      table.increments('comment_id').primary();
      table.string('body');
      table.integer('user_id')
        .references('user_id')
        .inTable('users');
      table.integer('post_id')
        .references('id')
        .inTable('posts');
      table.timestamps(true, true);
    })
  ])

exports.down = (knex, Promise) =>
  Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('posts'),
    knex.schema.dropTable('comments')
  ])