const { Router } = require("express");
const router = Router();

router.get("/test", (_, res) => {
    res.render("testRoute")
})

module.exports = router;