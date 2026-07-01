const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
    showLoginPage,
    showSignupPage,
    registerUser,
    logoutUser
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

module.exports = router;
