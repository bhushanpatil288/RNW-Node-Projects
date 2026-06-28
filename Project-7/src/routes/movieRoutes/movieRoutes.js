const express = require("express");
const router = express.Router();
const {
    indexPage
} = require("../../controllers/moviesController");

router.get("/", indexPage);

module.exports = router;