const express = require("express");
const router = express.Router();
const { 
    homePage
} = require("../cotrollers/students.controller");

router.get("/", homePage);

module.exports = router;