const { Router } = require("express");
const router = Router();
const authRoutes = require("./auth.routes.js");
const publicRoutes = require("./public.routes.js");

router.use("/", authRoutes);
router.use("/blog", require("./blog.routes.js"));
router.use("/", publicRoutes);

module.exports = router;