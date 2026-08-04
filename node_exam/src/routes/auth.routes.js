const { Router } = require("express");
const router = Router();
const { homePage, registerPage, registerUser, loginPage, loginUser, logoutUser } = require("../controllers/auth.controllers.js");
const asyncHandler = require("../middleware/asyncHandler.js");
const { requireGuest, requireAuth } = require("../middleware/auth.middleware.js");

router.get("/", asyncHandler(homePage));
router.get("/register", requireGuest, asyncHandler(registerPage));
router.post("/register", requireGuest, asyncHandler(registerUser));

router.get("/login", requireGuest, asyncHandler(loginPage));
router.post("/login", requireGuest, asyncHandler(loginUser));
router.get("/logout", requireAuth, asyncHandler(logoutUser));

module.exports = router;