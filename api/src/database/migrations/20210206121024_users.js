
exports.up = function (knex) {
  return knex.schema.createTable('usuarios', (table) => {
    table.increments('id').primary()
    table.string('name').notNullable()
    table.string('email').unique()
    table.string('senha', 8).notNullable()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('usuarios')
}