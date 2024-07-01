const db = require('../db');
const bcrypt = require('bcrypt');

class ShopModel {
    static async findByEmail(email) {
        try {
            const result = await db('shops').where({ email }).first();
            return result;
        } catch (err) {
            throw err;
        }
    }

    static async findById(idShop) {
        return db('shops').where({ idShop }).first();
    }

    static async checkPassword(password, hash) {
        try {
            const isMatch = await bcrypt.compare(password, hash);
            return isMatch;
        } catch (err) {
            console.error(err);
            throw new Error('Password comparison error');
        }
    }

    static async register(shop) {
        try {
            const result = await db('shops').insert(shop).returning('*');
            return result[0];
        } catch (err) {
            throw err;
        }
    }

    static async updateShop(id, updatedData) {
        try {
            const result = await db('shops')
                .where({ idShop: id })
                .update(updatedData)
                .returning('*');
            return result;
        } catch (err) {
            console.error(err);
            throw new Error('Database error');
        }
    }

    static async deleteShop(id){
        return db('shops').where({ id }).del();
    }

    static async addProduct(product) {
        try {
            const result = await db('products').insert(product).returning('*');
            return result[0];
        } catch (err) {
            console.error(err);
            throw new Error('Database error');
        }
    }

    static async findByShopAndId(idShop, idProduct) {
        try {
            const result = await db('products').where({ idShop, idProduct }).first();
            return result;
        } catch (err) {
            throw err;
        }
    }

    static async updateProduct(idProduct, updatedData) {
        try {
            const result = await db('products')
                .where({ idProduct })
                .update(updatedData)
                .returning('*');
            return result;
        } catch (err) {
            throw err;
        }
    }

    static async deleteProduct(idShop, idProduct) {
        try {
            const result = await db('products')
                .where({ idShop, idProduct })
                .del()
                .returning('*');
            return result;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = ShopModel;