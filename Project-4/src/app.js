const express = require("express");
const path = require("path");
const asyncHandler = require("./utils/asyncHandler");
const errorHandler = require("./utils/errorHandler");
const ApiError = require("./utils/ApiError");
const requestLogger = require("./middlewares/requestLogger");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(requestLogger);

// ejs setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// public directory setup
app.use(express.static(path.join(__dirname, "public")));

// uploads folder setup
app.use("/uploads", express.static(path.join(__dirname, "uploads")));



// routes
app.use("/", require("./routes/students.route"));

// test routes
app.get("/health", (_, res) => {
    res.render("others/healthCheck");
});
app.get("/raise-error", asyncHandler((_, res) => {
    throw new ApiError(500, "Internal Server Error (demo)");
}));

app.use(errorHandler);



module.exports = app;