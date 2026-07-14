const { Router } = require("express");
const router = Router();
const {
    registerPageController,
    registerController,
    loginPageController,
    loginController,
    resetPasswordPageController,
    resetPasswordController,
    verifyOtp
} = require("../controllers/auth.controllers.js");
const asyncHandler = require("../utils/asyncHandler.js");
const isLoggedIn = require("../middlewares/isLoggedIn.js");
const protected = require("../middlewares/protected.js");

router.get("/register", isLoggedIn, asyncHandler(registerPageController));
router.post("/register", asyncHandler(registerController));

router.get("/login", isLoggedIn, asyncHandler(loginPageController));
router.post("/login", asyncHandler(loginController));

router.get("/reset-password", protected, asyncHandler(resetPasswordPageController));
router.post("/reset-password", protected, asyncHandler(resetPasswordController));
router.post("/verify-otp", protected, asyncHandler(verifyOtp));

module.exports = router;
