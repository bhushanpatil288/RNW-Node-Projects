const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    title: {
        type: String,
        require: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        require: true
    },
    productImg: {
        type: String,
        require: true
    }
}, { timestamps: true });

module.exports = mongoose.model("products", productSchema);