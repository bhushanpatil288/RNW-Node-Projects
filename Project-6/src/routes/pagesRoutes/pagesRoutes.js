const express = require("express");
const router = express.Router();
const {
    homePage,
    dashboardPage
} = require("../../controllers/pagesController");

router.get("/", homePage);
router.get("/dashboard", dashboardPage);

module.exports = router;