/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('carts', function (table) {
        table.increments('idCart').primary();
        table.integer('quantity').notNullable();
        table.integer('idShop').unsigned().notNullable();
        table.integer('idUser').unsigned().notNullable();
        table.foreign('idShop').references('idShop').inTable('shops');
        table.foreign('idUser').references('idUser').inTable('users');
        table.timestamps(true,true);
      })
        .then(_=>{
            console.log("TABEL CARTS DIBUAT");
        })
        .catch(err=>{
            console.log(err);
            console.log("TABEL CARTS GAGAL DIBUAT");
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('carts')
    .then(_=>{
        console.log("CARTS BERHASIL DIHAPUS");
    })
    .catch(err=>{
        console.log(err);
        console.log("CARTS GAGAL DIHAPUS");
    })
};
