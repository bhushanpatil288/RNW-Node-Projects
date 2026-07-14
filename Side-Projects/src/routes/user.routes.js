const { Router } = require("express");
const router = Router();
const {
    profilePageController,
    resetPasswordController,
    resetPasswordPageController,
    verifyOtp
} = require("../controllers/users.controllers.js");
const asyncHandler = require("../utils/asyncHandler.js");
const protected = require("../middlewares/protected.js");

router.get("/profile", protected, asyncHandler(profilePageController));
router.get("/reset-password", protected, asyncHandler(resetPasswordPageController));
router.post("/reset-password", protected, asyncHandler(resetPasswordController));
router.post("/verify-otp", protected, verifyOtp);

module.exports = router;