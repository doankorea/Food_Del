const express = require('express');
const multer = require('multer');
const { addFood , listFood, removeFood} = require('../controllers/foodController');  
const foodRouter = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: "uploads",
    filename: function (req, file, cb) {
    return cb(null, `${Date.now()}${Date.now()}${file.originalname}`)   
    }
});

const upload = multer({ storage: storage });

foodRouter.post('/add', upload.single('image'), addFood);
foodRouter.get('/list', listFood);
foodRouter.post('/remove', removeFood);


module.exports = foodRouter;
