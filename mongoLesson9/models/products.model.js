const mongoose = require('mongoose');
const product = mongoose.model('product', new mongoose.Schema({}, { strict: false }));

module.exports=product;