const Movies = require("../models/movie");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");

const indexPage = asyncHandler(async (req, res) => {
    const movies = await Movies.find().sort({ createdAt: -1 });
    res.render("index", { movies });
});

const showAddPage = (req, res) => {
    res.render("add");
};

const createMovie = asyncHandler(async (req, res) => {
    const { title, director, releaseYear, genre, rating, description } = req.body;

    if (!title || !director || !releaseYear || !genre) {
        return res.status(400).render("add", {
            error: "Please fill in all required fields (Title, Director, Year, Genre)"
        });
    }

    if (!req.file) {
        return res.status(400).render("add", {
            error: "Please upload a poster image"
        });
    }

    const movieData = {
        title: title.trim(),
        director: director.trim(),
        releaseYear: parseInt(releaseYear),
        genre: genre.trim(),
        description: description?.trim() || "",
        poster: `/uploads/${req.file.filename}`,
        rating: rating ? parseFloat(rating) : null
    };

    const movie = await Movies.create(movieData);

    res.redirect("/");
});

module.exports = {
    indexPage,
    showAddPage,
    createMovie
};