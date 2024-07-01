const bcrypt = require('bcrypt');
const UserModel = require('../models/userModel');
const db = require('../db')

class UserController {
    static async register(req,res){
        try {
            const {name,email, password,address,phone_number} = req.body
            
            // Periksa apakah email sudah ada
            const existingUser = await UserModel.findByEmail(email);
            if (existingUser) {
                return res.status(400).json({ error: 'Email sudah terdaftar' });
            }
            
            const hashedPassword = await bcrypt.hash(password, 10);
            
            const newUser = {
                name,
                email,
                password : hashedPassword,
                address,
                phone_number
            }
            const resultData = await UserModel.register(newUser);
            res.status(201).json(resultData);
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }

    }

    static async login(req,res){
        try {
            const { email, password } = req.body;

            // Cari email user
            const user = await UserModel.findByEmail(email);

            // jika email tidak ada, return 404
            if (!user) {
                return res.status(404).json({ error: 'Email tidak ditemukan' });
            }

            // Check apakah password sesuai
            const isMatch = await UserModel.checkPassword(password, user.password);

            // jika password tidak sesuai, return 401
            if (!isMatch) {
                return res.status(401).json({ error: 'Password salah' });
            }

            // jika email dan password sudah benar
            res.status(200).json({
                message: 'Berhasil Login',
                user
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    

    static async updateUser(req, res) {
        try {
            const { idUser } = req.params;
            const { name, email, password, address, phone_number } = req.body;

            // cari id shop
            const user = await UserModel.findById(idUser);

            // jika shop tidak ada error 404
            if (!user) {
                return res.status(404).json({ error: 'User tidak ditemukan' });
            }

            // cek apakah email sudah digunakan toko lain
            if (email && email !== user.email) {
                const existingUser = await UserModel.findByEmail(email);
                if (existingUser) {
                    return res.status(400).json({ error: 'Email sudah digunakan oleh user lain' });
                }
            }

            let updatedData = {};
            if (name) updatedData.name = name;
            if (email) updatedData.email = email;
            if (address) updatedData.address = address;
            if (phone_number) updatedData.phone_number = phone_number;
            if (password) {
                updatedData.password = await bcrypt.hash(password, 10);
            }

            // Update data shop
            const resultData = await UserModel.updateUser(idUser, updatedData);
            res.status(200).json(resultData);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async deleteUser(req, res) {
        try {
            const { idUser } = req.params;
            const result = await UserModel.deleteUser(idUser);
            if (result) {
                res.status(200).json({ message: 'Berhasil dihapus' });
            } else {
                res.status(404).json({ error: 'User tidak ditemukan' });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = UserController