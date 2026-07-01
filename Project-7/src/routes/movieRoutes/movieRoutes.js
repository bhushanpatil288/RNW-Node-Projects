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
const { ensureAuthenticated } = require("../../middleware/auth");

router.get("/", ensureAuthenticated, indexPage);
router.get("/add", ensureAuthenticated, showAddPage);
router.post("/add", ensureAuthenticated, upload, createMovie);
router.get("/delete/:id", ensureAuthenticated, deleteMovie);
router.get("/edit/:id", ensureAuthenticated, ShowEidtPage);
router.post("/edit/:id", ensureAuthenticated, upload, editMovie);

module.exports = router;