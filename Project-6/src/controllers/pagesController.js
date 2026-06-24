const User = require("../models/userModel");

const homePage = (req, res)=>{
    const data = {
        title: "Welcome"
    }
    res.render("index", data);
};

const dashboardPage = async (req, res) => {
    const { id } = req.cookies;

    let data = {};

    if (!id) {
        data = {
            username: "Demo name",
            email: "Demo email",
            password: "Demo Password"
        };
    } else {
        const userData = await User.findById(id);
        console.log(userData);
        data = userData;
    }

    res.render("dashboard", { data });
};

module.exports = {
    homePage,
    dashboardPage
}