
exports.up = function(knex) {
  return knex.schema.alterTable('usuarios', (table) => {
    table.dropColumn('name')
    table.string('nome')
  })
}

exports.down = function(knex) {
  return knex.schema.alterTable('usuarios', (table) => {
    table.dropColumn('nome')
    table.string('name')
  })
}
