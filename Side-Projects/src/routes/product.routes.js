const { Router } = require("express");
const router = Router();
const {
    productsPageController,
    addProductPageController,
    addProductController
} = require("../controllers/products.controllers.js");
const asyncHandler = require("../utils/asyncHandler.js");
const protected = require("../middlewares/protected.js");
const upload = require("../middlewares/upload.js");

router.get("/", protected, asyncHandler(productsPageController));
router.get("/add", protected, asyncHandler(addProductPageController));
router.post("/add", protected, upload, asyncHandler(addProductController));

module.exports = router;