const express = require("express");
const path = require("path");
const asyncHandler = require('./middleware/asyncHandler');
const errorHandler = require('./middleware/errorHandler');
const upload = require('./middleware/upload');
const ApiError = require('./utils/ApiError');
const logger = require('./utils/logger');

const app = express();

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, "views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger.morganMiddleware);

app.get("/health-check", (req, res) => {
    res.render("healthcheck");
});

app.post(
    "/upload",
    upload.single('file'),
    asyncHandler(async (req, res) => {
        if (!req.file) {
            throw new ApiError(400, 'No file uploaded');
        }

        res.status(200).json({
            success: true,
            message: 'File uploaded successfully',
            file: req.file.filename,
        });
    })
);

app.use(errorHandler);

module.exports = app;