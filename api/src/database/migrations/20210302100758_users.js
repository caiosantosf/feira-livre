
exports.up = function(knex) {
  return knex.schema.alterTable('usuarios', (table) => {
    table.string('tipo')
  })
}

exports.down = function(knex) {
  return knex.schema.alterTable('usuarios', (table) => {
    table.dropColumn('tipo')
  })
}
