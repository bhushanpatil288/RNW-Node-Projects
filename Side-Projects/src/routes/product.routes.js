const { Router } = require("express");
const router = Router();
const {
    productsPageController
} = require("../controllers/products.controllers.js");
const asyncHandler = require("../utils/asyncHandler.js");
const protected = require("../middlewares/protected.js");

router.get("/products", protected, asyncHandler(productsPageController));

module.exports = router;