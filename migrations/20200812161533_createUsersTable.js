
exports.up = function(knex) {
  return knex.schema.createTable('users', tbl => {
    tbl.increments()
    tbl.text('username', 100)
      .notNullable()
      .unique()
      .index()
    tbl.text('email', 128)
      .notNullable()
      .unique()
    tbl.text('password', 128)
      .notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users')
};
