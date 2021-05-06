const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({

    date: {
        type: String,
        required: true
    },
    products: {
        type: Array,
        required: true
    },
    total: {
        type: Number,
        required: true
    },

});

module.exports = mongoose.model('Transaction', transactionSchema);