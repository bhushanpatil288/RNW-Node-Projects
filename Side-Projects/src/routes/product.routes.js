const { Router } = require("express");
const router = Router();
const {
    productsPageController,
    addProductPageController,
    addProductController,
    removeProductController
} = require("../controllers/products.controllers.js");
const asyncHandler = require("../utils/asyncHandler.js");
const protected = require("../middlewares/protected.js");
const upload = require("../middlewares/upload.js");

router.get("/", protected, asyncHandler(productsPageController));
router.get("/add", protected, asyncHandler(addProductPageController));
router.post("/add", protected, upload, asyncHandler(addProductController));
router.delete("/remove/:id", protected, asyncHandler(removeProductController))

module.exports = router;