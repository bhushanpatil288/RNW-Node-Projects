const { Router } = require("express");
const router = Router();
const {
    registerPageController,
    registerController
} = require("../controllers/auth.controllers.js");
const asyncHandler = require("../utils/asyncHandler.js");
const isLoggedIn = require("../middlewares/isLoggedIn.js");

router.get("/register", isLoggedIn, asyncHandler(registerPageController));
router.post("/register", asyncHandler(registerController));

module.exports = router;