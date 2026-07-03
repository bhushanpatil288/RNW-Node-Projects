const express = require("express");
const router = express.Router();
const blogRoutes = require("./blogRoutes/blogRoutes");
const authRoutes = require("./authRoutes");

router.use("/", authRoutes);
router.use(blogRoutes);

module.exports = router;