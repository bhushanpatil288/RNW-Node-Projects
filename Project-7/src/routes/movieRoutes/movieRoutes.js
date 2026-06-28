const express = require("express");
const router = express.Router();
const {
    indexPage,
    showAddPage,
    createMovie,
    deleteMovie,
    ShowEidtPage,
    editMovie
} = require("../../controllers/moviesController");
const upload = require("../../middleware/upload");

router.get("/", indexPage);
router.get("/add", showAddPage);
router.post("/add", upload, createMovie);
router.get("/delete/:id", deleteMovie)
router.get("/edit/:id", ShowEidtPage);
router.post("/edit/:id", upload, editMovie);

module.exports = router;