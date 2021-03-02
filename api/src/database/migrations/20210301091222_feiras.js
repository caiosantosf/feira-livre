
exports.up = function(knex) {
  return knex.schema.alterTable('feiras', (table) => {
    table.string('image', 1000).alter()
  })
}

exports.down = function(knex) {
  return knex.schema.alterTable('users', (table) => {
    table.string('image', 255).alter()
  })
}
