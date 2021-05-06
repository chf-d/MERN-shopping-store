const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    title: {
        type: String,
        unique: true,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        minLength: 10,
        required: true
    },
    image: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('Product', productSchema);