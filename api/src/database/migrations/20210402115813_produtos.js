
exports.up = function(knex) {
  return knex.schema.alterTable('feiranteProdutos', (table) => {
    table.dropColumn('usuarioId')
  })
}

exports.down = function(knex) {
  return knex.schema.alterTable('feiranteProdutos', (table) => {
    table.integer('usuarioId').notNullable()
  })
}
