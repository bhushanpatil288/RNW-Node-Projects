const { Router } = require("express");
const router = Router();
const asyncHandler = require("../middleware/asyncHandler.js");
const { createPost, updatePost, deletePost } = require("../controllers/blog.controllers.js");
const { requireAuth } = require("../middleware/auth.middleware.js");

router.post("/create-post", requireAuth, asyncHandler(createPost));
router.post("/:id/update", requireAuth, asyncHandler(updatePost));
router.post("/:id/delete", requireAuth, asyncHandler(deletePost));

module.exports = router;