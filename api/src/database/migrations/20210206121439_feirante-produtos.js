
exports.up = function (knex) {
  return knex.schema.createTable('feiranteProdutos', (table) => {
    table.increments('id').primary()
    table.integer('user_id').notNullable()
    table.integer('feirante_id').notNullable()
    table.foreign('user_id').references('users.id')
    table.foreign('feirante_id').references('feirante.id')
    table.string('descricao').notNullable()
    table.string('imagemUrl')
    table.decimal('valor', 10, 2)
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('feirante')
}