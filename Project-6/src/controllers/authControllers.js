const {
    signupService
} = require("../services/authServices");

const loginPageController = (req, res) => {
    res.render("signin");
}

const signupPageController = (req, res) => {
    res.render("signup");
}

const signupController = async (req, res) => {
    const resultObj = await signupService(req, res);

    if (!resultObj) {
        res.redirect("/auth/signup");
    }

    res.cookie("id", resultObj._id);

    res.redirect("/dashboard");
}

module.exports = {
    loginPageController,
    signupPageController,
    signupController
}