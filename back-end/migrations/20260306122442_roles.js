/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('roles', (column)=>{
        column.increments('id').primary();
        column.enu('role_name',['admin', 'customer', 'seller']);
        column.timestamps(true, true);
        column.timestamp('deleted_at').nullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('roles');  
};
