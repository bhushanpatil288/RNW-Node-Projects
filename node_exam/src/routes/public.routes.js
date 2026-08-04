const { Router } = require("express");
const router = Router();
const { indexPage } = require("../controllers/public.controllers.js");
const asyncHandler = require("../middleware/asyncHandler.js");

router.get("/", asyncHandler(indexPage));

module.exports = router;