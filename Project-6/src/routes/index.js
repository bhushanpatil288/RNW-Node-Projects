const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes/authRoutes");
const pagesRoutes = require("./pagesRoutes/pagesRoutes");

router.use("/", pagesRoutes)
router.use('/auth', authRoutes);

module.exports = router;