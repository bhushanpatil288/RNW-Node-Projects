const { Router } = require("express");
const router = Router();
const {
    loginPageController,
    loginController
} = require("../controllers/auth.controllers.js");
const asyncHandler = require("../utils/asyncHandler.js");

router.get("/login", asyncHandler(loginPageController));
router.post("/login", asyncHandler(loginController));

module.exports = router;