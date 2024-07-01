const knex = require('knex');
const config = require("./knexfile");

const db = knex(config.development);

const dbName = "careFood";

db.raw('CREATE DATABASE??', [dbName])
    .then(_=>{
        console.log("DATABASE careFood Terbuat");
    })
    .catch(_=>{
        console.log("DB gagal terbuat");
    })
    .finally(_=>{
        db.destroy()
    })