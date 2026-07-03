const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    readTime: {
        type: Number,
        required: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("blogs", blogSchema);