const express = require("express");
const rountes = require("./routes/index");
const path = require("path");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const passport = require("passport");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(expressSession({ secret: "Hello 123" }));
app.use(passport.initialize());
app.use(passport.session());


app.use("/uploads", express.static(path.join(__dirname, "uploads")))

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use("/", rountes);

module.exports = app;