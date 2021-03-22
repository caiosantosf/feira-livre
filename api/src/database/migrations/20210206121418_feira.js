
exports.up = function (knex) {
  return knex.schema.createTable('feiras', (table) => {
    table.increments('id').primary()
    table.integer('usuarioId').notNullable()
    table.foreign('usuarioId').references('usuarios.id')
    table.string('cidade').notNullable()
    table.string('estado', 2).notNullable()
    table.string('descricao').notNullable()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('feiras')
}