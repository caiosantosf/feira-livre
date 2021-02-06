
exports.up = function (knex) {
  return knex.schema.createTable('feirante', (table) => {
    table.increments('id').primary()
    table.integer('user_id').notNullable()
    table.integer('feira_id').notNullable()
    table.foreign('user_id').references('users.id')
    table.foreign('feira_id').references('feiras.id')
    table.string('descricao').notNullable()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('feirante')
}