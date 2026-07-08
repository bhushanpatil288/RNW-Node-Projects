const { Router } = require("express");
const router = Router();
const asyncHandler = require("../utils/asyncHandler.js");
const AppError = require("../utils/AppError.js");

// test routes
router.get("/test", (_, res) => {
    res.render("testRoute")
})

router.get("/test-error", asyncHandler(async (_, res) => {
    throw new AppError(500, "This is a test error!");
}));



module.exports = router;