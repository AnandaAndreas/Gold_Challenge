const db = require('../db');
const bcrypt = require('bcrypt');

class UserModel {
    static async findByEmail(email) {
        try {
            const result = await db('users').where({ email }).first();
            return result;
        } catch (err) {
            throw err;
        }
    }

    static async findById(idUser) {
        return db('users').where({ idUser }).first();
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

    static async register(user) {
        try {
            const result = await db('users').insert(user).returning('*');
            return result[0];
        } catch (err) {
            throw err;
        }
    }

    static async updateUser(id, updatedData) {
        try {
            const result = await db('users')
                .where({ idUser: id })
                .update(updatedData)
                .returning('*');
            return result;
        } catch (err) {
            console.error(err);
            throw new Error('Database error');
        }
    }

    static async deleteUser(id){
        return db('users').where({ id }).del();
    }
}

module.exports = UserModel;