/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('shops', function (table) {
        table.increments('idShop').primary();
        table.string('name').notNullable();
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
        table.string('address').notNullable();
        table.string('phone_number').notNullable();
        table.string('profile_picture').notNullable();
        table.timestamps(true,true);
      })
        .then(_=>{
            console.log("TABEL SHOPS DIBUAT");
        })
        .catch(err=>{
            console.log(err);
            console.log("TABEL products GAGAL DIBUAT");
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('shops')
    .then(_=>{
        console.log("SHOPS BERHASIL DIHAPUS");
    })
    .catch(err=>{
        console.log(err);
        console.log("SHOPS GAGAL DIHAPUS");
    })
};
