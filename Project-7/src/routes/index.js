const express = require("express");
const router = express.Router();
const movieRoutes = require("./movieRoutes/movieRoutes");
const authRoutes = require("./authRoutes");

router.use("/", authRoutes);
router.use(movieRoutes);

module.exports = router;