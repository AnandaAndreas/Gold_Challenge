const express = require("express")
const app = express()
const PORT = 3005

const userRoutes = require("./routes/userRoutes")
const shopRoutes = require("./routes/shopRoutes")
const Cart = require("./controllers/cart")
// const { register } = require("module")
app.set('view engine','ejs')



app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use("/user",userRoutes)
app.use("/shop",shopRoutes)


app.use(function(req,res,next){
    res.render("notFound")
    console.log("notFound");
}) 

function errorHandler(err,req,res,next){
    // console.log(err.code, " ===> ErroR");
    console.log(err);
    console.log("erroHandle");
    let messageReturn = ""
    let errorStatus
    if(err.code === 400){
        messageReturn = "Bad request"
        errorStatus = 400
    }else if(err.code === 404){
        messageReturn = "Not Found"
        errorStatus = 404
    }else if(err.code === 500){
        console.log("error 500");
    }
    res.status(err.code).json({ "message" : messageReturn})
    // res.render("errorPage",{
    //     messageReturn
    // })
}

app.use(errorHandler)


app.listen(PORT, () =>{
    console.log(`INI PORT ${PORT}`);
})