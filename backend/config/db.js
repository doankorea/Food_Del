const mongoose = require('mongoose');

const connectDB= async()=>{
    await mongoose.connect('mongodb+srv://youngdoanz:123@cluster0.n2mtmhc.mongodb.net/food-del').then(()=>console.log("DB Connected"))

}

module.exports= {connectDB}