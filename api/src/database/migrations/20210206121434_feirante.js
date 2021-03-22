
exports.up = function (knex) {
  return knex.schema.createTable('feirantes', (table) => {
    table.increments('id').primary()
    table.integer('usuarioId').notNullable()
    table.integer('feiraId').notNullable()
    table.foreign('usuarioId').references('usuarios.id')
    table.foreign('feiraId').references('feiras.id')
    table.string('descricao').notNullable()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('feirantes')
}