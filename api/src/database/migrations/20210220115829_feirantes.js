
exports.up = function(knex) {
  return knex.schema.alterTable('feirante', (table) => {
    table.string('nome').notNullable().defaultTo('')
  })
}

exports.down = function(knex) {
  return knex.schema.alterTable('feirante', (table) => {
    table.dropColumn('nome')
  })
}
