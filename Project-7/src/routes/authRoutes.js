const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
    showLoginPage,
    showSignupPage,
    registerUser,
    logoutUser,
    showProfilePage,
    changePassword,
    showForgotPasswordPage,
    handleForgotPassword,
    showVerifyOtpPage,
    handleVerifyOtp,
    showResetPasswordPage,
    handleResetPassword
} = require("../controllers/authController");
const { ensureAuthenticated, ensureGuest } = require("../middleware/auth");

router.get("/login", ensureGuest, showLoginPage);

router.post(
    "/login",
    ensureGuest,
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true
    })
);

router.get("/signup", ensureGuest, showSignupPage);

router.post("/signup", ensureGuest, registerUser);

router.get("/logout", ensureAuthenticated, logoutUser);

// Profile routes
router.get("/profile", ensureAuthenticated, showProfilePage);
router.post("/profile/change-password", ensureAuthenticated, changePassword);

// Forgot Password routes
router.get("/forgot-password", ensureGuest, showForgotPasswordPage);
router.post("/forgot-password", ensureGuest, handleForgotPassword);

router.get("/verify-otp", ensureGuest, showVerifyOtpPage);
router.post("/verify-otp", ensureGuest, handleVerifyOtp);

router.get("/reset-password", ensureGuest, showResetPasswordPage);
router.post("/reset-password", ensureGuest, handleResetPassword);

module.exports = router;
