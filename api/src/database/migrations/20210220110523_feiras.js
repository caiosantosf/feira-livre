
exports.up = function(knex) {
  return knex.schema.alterTable('feiras', (table) => {
    table.string('image').notNullable().defaultTo('')
    table.string('nome').notNullable().defaultTo('')
  })
}

exports.down = function(knex) {
  return knex.schema.alterTable('feiras', (table) => {
    table.dropColumn('image')
    table.dropColumn('nome')
  })
}
