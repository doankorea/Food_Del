const foodModel = require('../models/foodModel');
const fs = require('fs');

// Add food item
const addFood = async (req, res) => {
    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category: req.body.category,
        image:image_filename,
    });

    try {
        await food.save()
        res.json("Food added");
    } catch (error) {
        res.json({ message: error.message });
    }
};

//all food list
const listFood= async(req, res)=>{
    try {
        const foods = await foodModel.find({});
        res.json({success: true, data: foods});
    } catch (error) {
        res.json({ message: error.message });
    }
}

//remove food item

const removeFood= async(req, res)=>{
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, ()=>{})


        await foodModel.findByIdAndDelete(req.body.id)

        res.json({success: true, message: "Food remove"});
    } catch (error) {
        res.json({ message: error.message });
    }
}

module.exports = { addFood, listFood, removeFood };
