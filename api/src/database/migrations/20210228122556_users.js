
exports.up = function(knex) {
  return knex.schema.alterTable('users', (table) => {
    table.dropColumn('name')
    table.string('nome')
  })
}

exports.down = function(knex) {
  return knex.schema.alterTable('users', (table) => {
    table.dropColumn('nome')
    table.string('name')
  })
}
