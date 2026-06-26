const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes/authRoutes");
const pagesRoutes = require("./pagesRoutes/pagesRoutes");
const studentRoutes = require("./studentRoutes/studentRoutes")
router.use("/", pagesRoutes)
router.use("/auth", authRoutes);
router.use("/students", studentRoutes)

module.exports = router;