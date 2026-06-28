const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    profilePicture: {
        type: String,
        default: null
    }
}, { timestamps: true });

module.exports = mongoose.model("Students", studentSchema);