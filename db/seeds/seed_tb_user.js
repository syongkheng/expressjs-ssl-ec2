/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('tb_user').del()
  await knex('tb_user').insert([
    {username: 'dev', password: 'secret'},
  ]);
};
