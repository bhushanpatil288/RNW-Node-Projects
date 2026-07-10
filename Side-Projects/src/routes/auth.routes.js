const { Router } = require("express");
const router = Router();
const {
    registerPageController,
    registerController
} = require("../controllers/auth.controllers.js");
const asyncHandler = require("../utils/asyncHandler.js");
const authMiddleware = require("../middlewares/authMiddleware.js");

router.get("/register", authMiddleware, asyncHandler(registerPageController));
router.post("/register", authMiddleware , asyncHandler(registerController));

module.exports = router;