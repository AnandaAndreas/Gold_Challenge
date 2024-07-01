/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', function (table) {
        table.increments('idUser').primary();
        table.string('name').notNullable();
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
        table.string('address').notNullable();
        table.string('phone_number').notNullable();
        table.timestamps(true,true);
      })
        .then(_=>{
            console.log("TABEL USER DIBUAT");
        })
        .catch(err=>{
            console.log(err);
            console.log("TABEL USER GAGAL DIBUAT");
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('users')
    .then(_=>{
        console.log("USERS BERHASIL DIHAPUS");
    })
    .catch(err=>{
        console.log(err);
        console.log("USERS GAGAL DIHAPUS");
    })
};
