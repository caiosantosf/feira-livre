
exports.up = function(knex) {
  return knex.schema.alterTable('feirantes', (table) => {
    table.boolean('confirmado')
  })
}

exports.down = function(knex) {
  return knex.schema.alterTable('feirantes', (table) => {
    table.dropColumn('confirmado')
  })
}
