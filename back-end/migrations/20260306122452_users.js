/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
      return knex.schema.createTable('users',(column)=>{
        column.increments('id').primary();
        column.string('first_name',20).notNullable();
        column.string('last_name',20).notNullable();
        column.string('password').notNullable();
        column.string('email',50).notNullable();
        column.integer('role_id').unsigned().notNullable();
        column.foreign('role_id').references('id').inTable('roles').onDelete('CASCADE');
        column.string('refresh_token').nullable();
        column.timestamps(true,true);
        column.timestamp('deleted_at').nullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
      return knex.schema.dropTable('users');  
};
