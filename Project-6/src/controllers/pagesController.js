const asyncHandler = require("../utils/asyncHandler");
const User = require("../models/userModel");

const homePage = asyncHandler((req, res) => {
    return res.render("index", { title: "Welcome" });
});

const dashboardPage = asyncHandler(async (req, res) => {
    const { id } = req.cookies || {};

    if (!id) {
        return res.render("dashboard", {
            data: {
                username: "Demo name",
                email: "Demo email",
                password: "Demo Password"
            }
        });
    }

    const userData = await User.findById(id);
    return res.render("dashboard", { data: userData || {} });
});

module.exports = {
    homePage,
    dashboardPage
};