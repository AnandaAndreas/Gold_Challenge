const bcrypt = require('bcrypt');
const ShopModel = require('../models/shopModel');
const db = require('../db');

class ShopController {
    static async register(req,res){
        try {
            const {name,email, password,address,phone_number} = req.body
            let {profile_picture} = req.body
            // Periksa apakah email sudah ada
            console.log("-=====>>>>");
            const existingShop = await ShopModel.findByEmail(email);
            if (existingShop) {
                return res.status(400).json({ error: 'Email sudah terdaftar' });
            }
            if (!profile_picture) {
                profile_picture = "default"
            }
            
            const hashedPassword = await bcrypt.hash(password, 10);
            
            const newShop = {
                name,
                email,
                password : hashedPassword,
                address,
                phone_number,
                profile_picture
            }
            const resultData = await ShopModel.register(newShop);
            res.status(201).json(resultData);
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async login(req,res){
        try {
            const { email, password } = req.body;

            // Cari email shop
            const shop = await ShopModel.findByEmail(email);

            // jika email tidak ada, return 404
            if (!shop) {
                return res.status(404).json({ error: 'Email tidak ditemukan' });
            }

            // Check apakah password sesuai
            const isMatch = await ShopModel.checkPassword(password, shop.password);

            // jika password tidak sesuai, return 401
            if (!isMatch) {
                return res.status(401).json({ error: 'Password salah' });
            }

            // jika email dan password sudah benar
            res.status(200).json({
                message: 'Berhasil Login',
                shop
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }


    static async updateShop(req, res) {
        try {
            const { idShop } = req.params;
            const { name, email, password, address, phone_number, profile_picture } = req.body;

            // cari id shop
            const shop = await ShopModel.findById(idShop);

            // jika shop tidak ada error 404
            if (!shop) {
                return res.status(404).json({ error: 'shop tidak ditemukan' });
            }

            // cek apakah email sudah digunakan toko lain
            if (email && email !== shop.email) {
                const existingShop = await ShopModel.findByEmail(email);
                if (existingShop) {
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
            if(profile_picture) updatedData.profile_picture = profile_picture

            // Update data shop
            const resultData = await ShopModel.updateShop(idShop, updatedData);
            res.status(200).json(resultData);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async deleteShop(req, res) {
        try {
            const { idShop } = req.params;
            const result = await ShopModel.deleteShop(idShop);
            if (result) {
                res.status(200).json({ message: 'Berhasil dihapus' });
            } else {
                res.status(404).json({ error: 'Shop tidak ditemukan' });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }


    static async addProduct(req, res) {
        try {
            const { name, description, price, quantity, product_picture } = req.body;
            const { idShop } = req.params;
            // Validate request body
            if (!name || !description || !price || !quantity || !product_picture || !idShop) {
                return res.status(400).json({ error: 'All fields are required' });
            }
            const priceInt = +price;
            const quantityInt = +quantity
            if (!Number.isInteger(priceInt) || !Number.isInteger(quantityInt)) {
                return res.status(400).json({ error: 'price dan quantity harus bertipe integerr' });
            }

            // Create product object
            const newProduct = {
                name,
                description,
                price : priceInt,
                quantity : quantityInt,
                product_picture,
                idShop
            };

            // Save product to the database
            const resultData = await ShopModel.addProduct(newProduct);
            res.status(201).json(resultData);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async editProduct(req, res) {
        try {
            const { idProduct, idShop } = req.params;
            const { name, description, price, quantity, product_picture} = req.body;

            // Find the product by ID
            const product = await ShopModel.findByShopAndId(idShop, idProduct);

            // If product not found, return 404
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }
            // Prepare updated data object
            let updatedData = {};
            if (name) updatedData.name = name;
            if (description) updatedData.description = description;
            if (price) {
                const priceInt = +price;

                if (!Number.isInteger(priceInt)) {
                    return res.status(400).json({ error: 'Price must be an integer' });
                }
                updatedData.price = price;
            }
            if (quantity) {
                const quantityInt = +quantity;

                if (!Number.isInteger(quantityInt)) {
                    return res.status(400).json({ error: 'Quantity must be an integer' });
                }
                updatedData.quantity = quantity;
            }
            if (product_picture) updatedData.product_picture = product_picture;
            if (idShop) updatedData.idShop = idShop;

            // Update the product data
            const resultData = await ShopModel.updateProduct(idProduct, updatedData);
            res.status(200).json(resultData);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async deleteProduct(req, res) {
        try {
            const { idShop, idProduct } = req.params;

            // Find the product by shop and product ID
            const product = await ProductModel.findByShopAndId(idShop, idProduct);

            // If product not found, return 404
            if (!product) {
                return res.status(404).json({ error: 'Product not found or does not belong to this shop' });
            }

            // Delete the product
            const resultData = await ProductModel.deleteProduct(idShop, idProduct);
            res.status(200).json({ message: 'Product successfully deleted', data: resultData });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

}

module.exports = ShopController