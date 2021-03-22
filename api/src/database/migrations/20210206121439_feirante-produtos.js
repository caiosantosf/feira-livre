
exports.up = function (knex) {
  return knex.schema.createTable('feiranteProdutos', (table) => {
    table.increments('id').primary()
    table.integer('usuarioId').notNullable()
    table.integer('feiranteId').notNullable()
    table.foreign('usuarioId').references('usuarios.id')
    table.foreign('feiranteId').references('feirantes.id')
    table.string('descricao').notNullable()
    table.string('imagemUrl')
    table.decimal('valor', 10, 2)
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('feirante')
}