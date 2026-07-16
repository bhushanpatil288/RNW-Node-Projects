const { Router } = require("express");
const router = Router();
const {
    productsPageController,
    addProductPageController,
    addProductController,
    removeProductController,
    categoryFilterController,
    dashboardPageController
} = require("../controllers/products.controllers.js");
const asyncHandler = require("../utils/asyncHandler.js");
const protected = require("../middlewares/protected.js");
const upload = require("../middlewares/upload.js");

router.get("/", protected, asyncHandler(productsPageController));
router.get("/dashboard", protected, asyncHandler(dashboardPageController));
router.get("/add", protected, asyncHandler(addProductPageController));
router.post("/add", protected, upload, asyncHandler(addProductController));
router.delete("/remove/:id", protected, asyncHandler(removeProductController));
router.get("/filter/:id", protected, asyncHandler(categoryFilterController));

module.exports = router;