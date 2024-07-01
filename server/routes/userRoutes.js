const express = require('express')
const app = express()
const routes = express.Router()
const UserController = require("../controllers/userController")

app.set('view engine', 'ejs');

routes.get("/register_user", (req,res) =>{res.render("register_user")})
routes.post("/register_user",UserController.register)

routes.get("/login_user",(req,res) =>{res.send("Halaman Login User")})
routes.post("/login_user",UserController.login)

routes.get("/edit_user/:idUser",(req,res) =>{res.send("Halaman Edit User")})
routes.patch("/edit_user/:idUser", UserController.updateUser)


routes.delete("/delete_user/:idUser", UserController.deleteUser)


module.exports=routes