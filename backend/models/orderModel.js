const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    userId: { type: String, required: true, trim: true },
    items: { type: Array, required: true, trim: true },
    amount: { type: Number, required: true, trim: true },
    address: { type: Object, required: true },
    status: { type: String, required: true, trim: true, default:"Food Processing" },
    date: { type: Date, required: true, default: Date.now },
    payment:{type:Boolean, default:false}
});

const orderModel = mongoose.models.order || mongoose.model('order', orderSchema);




module.exports = orderModel;
