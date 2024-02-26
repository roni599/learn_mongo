const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true

    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    ratting: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

// const product = mongoose.model('product', new mongoose.Schema({}, { strict: false }));
const product = mongoose.model('product', productSchema);

module.exports = product;