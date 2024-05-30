const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodSchema = new Schema({
    name: { type: String, maxLength: 255, required: true, trim: true },
    description: { type: String, maxLength: 600, required: true, trim: true },
    image: { type: String, maxLength: 255, required: true, trim: true },
    price: { type: Number, required: true },
    category: { type: String, maxLength: 255, required: true, trim: true },
});

const foodModel = mongoose.models.food || mongoose.model('food', foodSchema);

module.exports = foodModel;
