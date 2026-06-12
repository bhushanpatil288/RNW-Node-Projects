const express = require("express");
const path = require("path");
const { asyncHandler } = require("./utils/asyncHandler");
const { errorHandler } = require("./utils/errorHandler");
const ApiError = require("./utils/ApiError");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ejs setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// test routes
app.get("/health", (_, res) => {
    res.render("others/healthCheck");
});
app.get("/raise-error", asyncHandler((_, res) => {
    throw new ApiError(500, "Internal Server Error (demo)");
}));

app.use(errorHandler);

module.exports = app;