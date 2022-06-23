const knex = require('knex');

export async function up(knex) {
    await knex.schema.createTable('twitt', (table) => {
      table.uuid('id').notNullable().primary()
      table.string('nickname')
      table.string('text')
      table.string('createdAt')
    })
  }