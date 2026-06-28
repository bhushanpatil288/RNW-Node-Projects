const express = require("express");
const router = express.Router();
const {
    indexPage,
    showAddPage,
    createMovie
} = require("../../controllers/moviesController");
const upload = require("../../middleware/upload");

router.get("/", indexPage);
router.get("/add", showAddPage);
router.post("/add", upload, createMovie);

module.exports = router;