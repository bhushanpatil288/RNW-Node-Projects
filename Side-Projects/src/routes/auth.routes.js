const { Router } = require("express");
const router = Router();
const {
    registerPageController,
    registerController,
    loginPageController,
    loginController,
    resetPasswordPageController,
    resetPasswordController,
    verifyOtp,
    forgotPasswordPageController,
    forgotPasswordController,
    forgotPasswordOtpPageController,
    forgotPasswordVerifyOtpController,
    logoutController
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

// Forgot password (unauthenticated)
router.get("/forgot-password", asyncHandler(forgotPasswordPageController));
router.post("/forgot-password", asyncHandler(forgotPasswordController));
router.get("/forgot-password/verify", asyncHandler(forgotPasswordOtpPageController));
router.post("/forgot-password/verify", asyncHandler(forgotPasswordVerifyOtpController));

// Logout
router.get("/logout", logoutController);

module.exports = router;
