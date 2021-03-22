
exports.up = function(knex) {
  return knex.schema.alterTable('usuarios', (table) => {
    table.string('senha', 255).alter()
  })
}

exports.down = function(knex) {
  return knex.schema.alterTable('usuarios', (table) => {
    table.string('senha', 8).alter()
  })
}
