const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
    title: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    genre: {
        type: String,
        trim: true
    },
    releaseYear: {
        type: Number,
        require: true
    },
    poster: {
        type: String,
        require: true,
        trim: true
    }
}, { timestamps: true });

module.exports = mongoose.model("movies", movieSchema);