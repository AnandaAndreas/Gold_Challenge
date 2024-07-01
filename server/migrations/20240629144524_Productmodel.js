/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('products', function (table) {
        table.increments('idProduct').primary();
        table.string('name').notNullable();
        table.string('description').notNullable();
        table.integer('price').notNullable();
        table.integer('quantity').notNullable();
        table.string('product_picture').notNullable();
        table.integer('idShop').unsigned().notNullable();
        table.foreign('idShop').references('idShop').inTable('shops');
        table.timestamps(true,true);
      })
        .then(_=>{
            console.log("TABEL PRODUCTS DIBUAT");
        })
        .catch(err=>{
            console.log(err);
            console.log("TABEL PRODUCTS GAGAL DIBUAT");
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('products')
    .then(_=>{
        console.log("PRODUCTS BERHASIL DIHAPUS");
    })
    .catch(err=>{
        console.log(err);
        console.log("PRODUCTS GAGAL DIHAPUS");
    })
};
