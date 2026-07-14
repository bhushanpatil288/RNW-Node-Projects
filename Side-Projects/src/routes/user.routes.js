const { Router } = require("express");
const router = Router();
const {
    profilePageController
} = require("../controllers/users.controllers.js");
const asyncHandler = require("../utils/asyncHandler.js");
const protected = require("../middlewares/protected.js");

router.get("/profile", protected, asyncHandler(profilePageController));

module.exports = router;
