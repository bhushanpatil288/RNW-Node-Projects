const asyncHandler = require("../utils/asyncHandler");

const homePage = asyncHandler(async (req, res) => {
    res.render("homePage");
});

module.exports = {
    homePage
}