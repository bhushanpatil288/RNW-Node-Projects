const express = require("express");
const router = express.Router();

const {
    loginPageController,
    signupPageController,
    signupController
} = require("../../controllers/authControllers");

router.get("/", (req, res)=>{
    res.send("ah ha! gotcha, not corret way to visit, click home buttons to login or signup or if you insist go to /login or /signup route");
})

router.get("/signin", loginPageController);
router.get("/signup", signupPageController);
router.post("/signup", signupController);

module.exports = router;