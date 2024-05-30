const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db.js');
const foodRouter = require('./routes/foodRouter');
const userRouter = require('./routes/userRoute.js');
const cartRouter = require('./routes/cartRoute.js');
const orderRouter = require('./routes/orderRoute.js');
require('dotenv').config();




//app config
const app = express()
const port= 4000


//middleware

app.use(express.json())
app.use(cors())

//db conection
connectDB()

//api endpoints
app.use("/api/food", foodRouter)
app.use("/images", express.static('uploads'))
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)

app.get("/",(req,res)=>{
    res.send("Welcome to my API")
})

app.listen(port, ()=>{
    console.log(`server is running on port: http://localhost:${port}`)
})

