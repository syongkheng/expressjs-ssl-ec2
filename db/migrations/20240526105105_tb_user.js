/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('tb_aa_user', function (table) {
        table.increments('id').primary();
        table.string('username', 100).unique().notNullable();
        table.string('password', 500).notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('tb_aa_user');
};
