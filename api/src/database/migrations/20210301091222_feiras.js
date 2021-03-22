
exports.up = function(knex) {
  return knex.schema.alterTable('feiras', (table) => {
    table.string('imagemUrl', 1000).alter()
  })
}

exports.down = function(knex) {
  return knex.schema.alterTable('feiras', (table) => {
    table.string('imagemUrl', 255).alter()
  })
}
