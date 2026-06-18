const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes/authRoutes");

router.get("/", (req, res)=>{
    const data = {
        title: "Welcome"
    }
    res.render("index", data);
})

router.use('/auth', authRoutes);

module.exports = router;