const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded());

// routes
app.get("/", (req, res) => {
    res.render("home");
})
const studentRouter = require("./routes/student.route");
app.use("/students", studentRouter);

module.exports = app;