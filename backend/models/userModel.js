const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true, trim: true },
    cartData: { type: Object, default: {} },
   }, {minimize:false});

const userModel = mongoose.models.user || mongoose.model('user', userSchema);

module.exports = userModel;
