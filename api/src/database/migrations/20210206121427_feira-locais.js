
exports.up = function (knex) {
  return knex.schema.createTable('feiraLocais', (table) => {
    table.increments('id').primary()
    table.integer('feira_id').notNullable()
    table.foreign('feira_id').references('feiras.id')
    table.string('cep', 8).notNullable()
    table.string('logradouro').notNullable()
    table.integer('numero').notNullable()
    table.string('complemento')
    table.string('bairro').notNullable()
    table.string('diaSemana').notNullable()
    table.time('horarioInicio').notNullable()
    table.time('horarioTermino').notNullable()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('feiras-locais')
}