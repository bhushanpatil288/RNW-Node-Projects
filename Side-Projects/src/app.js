const express = require("express");
const morgan = require("morgan");
const path = require("path");
const router = require("./routes/index.js");
const cookieParser = require("cookie-parser");

const app = express();

app.use(morgan("dev"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(router);

app.use(require("./middlewares/errorHandler.js"));

module.exports = app;