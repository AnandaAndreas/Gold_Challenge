const express = require('express')
const app = express()
const routes = express.Router()

const ShopController = require('../controllers/shopController')

app.set('view engine', 'ejs');


routes.get("/register_shop", (req,res) =>{res.render("register_shop")})
routes.post("/register_shop",ShopController.register)

routes.get("/login_shop", (req,res) =>{res.send("login_shop")})
routes.post("/login_shop",ShopController.login)

routes.get("/edit_shop/:idShop",(req,res) =>{res.send("Halaman Edit Shop")})
routes.patch("/edit_shop/:idShop",ShopController.updateShop)

routes.delete("/delete_shop/:idShop",ShopController.deleteShop)

routes.get("/:idShop/add_product",(req,res)=>{res.send("Halaman Tambah Product")})
routes.post("/:idShop/add_product",ShopController.addProduct)

routes.get("/:idShop/edit_product/:idProduct",(req,res)=>{res.send("Halaman Edit Product")})
routes.patch("/:idShop/edit_product/:idProduct",ShopController.editProduct)

routes.delete("/:idShop/delete_product/:idProduct",ShopController.deleteProduct)
routes.get("/:idShop", (req,res) => {res.send("Halaman Shop")})

module.exports=routes
