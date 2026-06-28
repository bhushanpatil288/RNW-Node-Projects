const express = require("express");
const router = express.Router();
const movieRoutes = require("./movieRoutes/movieRoutes");

router.use(movieRoutes);

module.exports = router;