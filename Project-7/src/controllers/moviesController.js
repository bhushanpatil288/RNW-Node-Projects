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

const deleteMovie = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const movie = await Movies.findById(id);
    if (!movie) {
        throw new ApiError(404, "Movie not found");
    }

    const { poster } = movie;
    if (poster) {
        const fs = require("fs");
        const path = require("path");
        const posterPath = path.join(__dirname, "..", "public", poster);
        fs.unlink(posterPath, (err) => {
            if (err) {
                console.error("Error deleting poster image:", err);
            }
        });
    }
    await Movies.findByIdAndDelete(id);
    res.redirect("/");
});

const ShowEidtPage = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const movie = await Movies.findById(id);
    console.log(movie);
    if (!movie) {
        throw new ApiError(404, "Movie not found");
    }
    res.render("edit", {
        id: movie._id,
        title: movie.title,
        director: movie.director,
        releaseYear: movie.releaseYear,
        genre: movie.genre,
        rating: movie.rating,
        description: movie.description
    });
});

const editMovie = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, director, releaseYear, genre, rating, description } = req.body;

    if (!title || !director || !releaseYear || !genre) {
        return res.status(400).render("edit", {
            error: "Please fill in all required fields (Title, Director, Year, Genre)",
            id,
            title,
            director,
            releaseYear,
            genre,
            rating,
            description
        });
    }

    const movieData = {
        title: title.trim(),
        director: director.trim(),
        releaseYear: parseInt(releaseYear),
        genre: genre.trim(),
        description: description?.trim() || "",
        rating: rating ? parseFloat(rating) : null
    };

    if (req.file) {
        movieData.poster = `/uploads/${req.file.filename}`;
    }

    const oldMovieData = await Movies.findById(id);

    if (req.file) {
        const { poster } = oldMovieData;
        const fs = require("fs");
        const path = require("path");
        const posterPath = path.join(__dirname, "..", "public", poster);
        fs.unlink(posterPath, (err) => {
            if (err) {
                console.error("Error deleting poster image:", err);
            }
        });
    }


    const movie = await Movies.findByIdAndUpdate(id, movieData, { new: true });
    if (!movie) {
        throw new ApiError(404, "Movie not found");
    }

    res.redirect("/");
});

module.exports = {
    indexPage,
    showAddPage,
    createMovie,
    deleteMovie,
    ShowEidtPage,
    editMovie
};