/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {idUser: 1, name: '1user', email: '1@gmail.com', password: '1user', address: 'jl.jalan', phone_number:'08123'},
    {idUser: 2, name: '2user', email: '2@gmail.com', password: '2user', address: 'jl.jalan', phone_number:'08123'}
  ]);
};
