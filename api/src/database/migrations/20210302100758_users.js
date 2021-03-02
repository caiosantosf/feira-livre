
exports.up = function(knex) {
  return knex.schema.alterTable('users', (table) => {
    table.string('tipo')
  })
}

exports.down = function(knex) {
  return knex.schema.alterTable('users', (table) => {
    table.dropColumn('tipo')
  })
}
