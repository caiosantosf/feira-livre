
exports.up = function(knex) {
  return knex.schema.alterTable('feiras', (table) => {
    table.string('imagemUrl').notNullable().defaultTo('')
    table.string('nome').notNullable().defaultTo('')
  })
}

exports.down = function(knex) {
  return knex.schema.alterTable('feiras', (table) => {
    table.dropColumn('imagemUrl')
    table.dropColumn('nome')
  })
}
