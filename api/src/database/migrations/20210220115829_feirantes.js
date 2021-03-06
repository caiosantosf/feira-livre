
exports.up = function(knex) {
  return knex.schema.alterTable('feirantes', (table) => {
    table.string('nome').notNullable().defaultTo('')
  })
}

exports.down = function(knex) {
  return knex.schema.alterTable('feirantes', (table) => {
    table.dropColumn('nome')
  })
}
