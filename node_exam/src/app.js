const express = require("express");
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const logger = require("./utils/logger");
const asyncHandler = require("./middleware/asyncHandler");
const { getAuthenticatedUser } = require("./middleware/auth.middleware");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: process.env.JWT_SECRET || "blog-app-secret",
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, sameSite: true }
}));
app.use(getAuthenticatedUser);
app.use(logger.morganMiddleware);

app.get("/health", asyncHandler(async (req, res) => {
    res.status(200).render("health");
}))

app.use("/", require("./routes/"))

module.exports = app;