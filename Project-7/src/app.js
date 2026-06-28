const express = require("express");
const ejs = require("ejs");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("./utility/logger");
const requestLogger = require("./middleware/requestLogger")

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.set("View Engine", ejs);
app.set("views", path.join(__dirname, "views"));

app.get("/health-check", requestLogger, (req, res) => {
    res.send("working fine")
})

module.exports = app;