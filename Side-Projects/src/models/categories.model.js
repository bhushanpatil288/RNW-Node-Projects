const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
    categoryTitle: {
        type: String,
        require: true,
        trim: true
    }
}, { timestamps: true });

module.exports = mongoose.model("categories", categorySchema);