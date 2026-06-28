const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("./utils/logger");
const requestLogger = require("./middleware/requestLogger")
const ApiError = require("./utils/ApiError");
const asyncHandler = require("./utils/asyncHandler");
const errorHandler = require("./utils/errorHandler");


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "uploads")));

app.get("/health-check", requestLogger, (_, res) => {
    res.render("healthCheck")
});

app.get("/error-check",asyncHandler((_, res) => {
    throw new ApiError(500, "Internal Server Error (test)");
}));

app.use("/", require("./routes/index"));

// Error handling middleware (must be last)
app.use(errorHandler);

module.exports = app;