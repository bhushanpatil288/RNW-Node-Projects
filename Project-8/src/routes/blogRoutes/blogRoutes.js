const express = require("express");
const router = express.Router();
const {
    indexPage,
    showAddPage,
    createBlog,
    deleteBlog,
    showEditPage,
    editBlog
} = require("../../controllers/blogsController");
const upload = require("../../middleware/upload");
const { ensureAuthenticated } = require("../../middleware/auth");

router.get("/", ensureAuthenticated, indexPage);
router.get("/add", ensureAuthenticated, showAddPage);
router.post("/add", ensureAuthenticated, upload, createBlog);
router.get("/delete/:id", ensureAuthenticated, deleteBlog);
router.get("/edit/:id", ensureAuthenticated, showEditPage);
router.post("/edit/:id", ensureAuthenticated, upload, editBlog);

module.exports = router;