const { Router } = require("express");
const router = Router();
const asyncHandler = require("../utils/asyncHandler.js");
const AppError = require("../utils/AppError.js");
const decryptToken = require("../utils/decryptToken.js");

// test routes
router.get("/test", (_, res) => {
    res.render("testRoute")
})

router.get("/test-error", asyncHandler(async (_, res) => {
    throw new AppError(500, "This is a test error!");
}));

// main routes
router.get("/", asyncHandler(async (req, res) => {
    const token = req.cookies?.token;
    const user = token ? decryptToken(token) : null;

    res.render("index", { isLoggedIn: Boolean(user) });
}));

router.use("/auth", require("./auth.routes.js"));
router.use("/", require("./product.routes.js"));



module.exports = router;