const { Router } = require("express");
const router = Router();
const {
    registerPageController,
    registerController,
    loginPageController,
    loginController,
} = require("../controllers/auth.controllers.js");
const asyncHandler = require("../utils/asyncHandler.js");
const isLoggedIn = require("../middlewares/isLoggedIn.js");

router.get("/register", isLoggedIn, asyncHandler(registerPageController));
router.post("/register", asyncHandler(registerController));

router.get("/login", isLoggedIn, asyncHandler(loginPageController));
router.post("/login", asyncHandler(loginController));

module.exports = router;