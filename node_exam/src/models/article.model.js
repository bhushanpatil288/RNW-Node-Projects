const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    title: {
        type: String,
        require: true,
        trim: true
    },
    content: {
        type: String,
        require: true,
        trim: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        require: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Comments", userSchema);