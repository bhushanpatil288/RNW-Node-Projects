const { Router } = require("express");
const router = Router();
const {
    productsPageController
} = require("../controllers/products.controllers.js");
const asyncHandler = require("../utils/asyncHandler.js");

router.get("/products", asyncHandler(productsPageController));

module.exports = router;