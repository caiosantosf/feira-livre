
exports.up = function(knex) {
  return knex.schema.alterTable('feiranteProdutos', (table) => {
    table.string('unidadeMedida').notNullable().defaultTo('')
    table.string('nome').notNullable().defaultTo('')
  })
}

exports.down = function(knex) {
  return knex.schema.alterTable('feiranteProdutos', (table) => {
    table.dropCollumn('unidadeMedida')
    table.dropCollumn('nome')
  })
}
