const User = require("../models/userModel");
const {
    signupService
} = require("../services/authServices");

const loginPageController = async (req, res) => {
    console.log("signin page hit", req.cookies);

    const { id } = req.cookies || {};

    if (id) {
        const user = await User.findById(id);

        if (user) {
            return res.redirect("/students");
        }
    }

    return res.render("signin");
}

const signupPageController = (req, res) => {
    res.render("signup");
}

const signupController = async (req, res) => {
    const resultObj = await signupService(req, res);

    if (!resultObj) {
        return res.redirect("/auth/signup");
    }

    res.cookie("id", resultObj._id);

    return res.redirect("/students");
}

const loginController = async (req, res) => {
    const { email = "", password = "" } = req.body || {};

    if (!email.trim() || !password.trim()) {
        return res.redirect("/auth/signin");
    }

    const user = await User.findOne({ email: email.trim() });

    if (!user) {
        return res.redirect("/auth/signup");
    }

    if (password !== user.password) {
        return res.redirect("/auth/signin");
    }

    res.cookie("id", user._id, { httpOnly: true });
    return res.redirect("/students");
}

module.exports = {
    loginPageController,
    signupPageController,
    signupController,
    loginController
}