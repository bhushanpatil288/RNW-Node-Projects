const User = require("../models/user.model.js");
const AppError = require("../utils/AppError.js");
const decryptToken = require("../utils/decryptToken.js");

const profilePageController = async (req, res) => {
    const userInfo = await User.findById(req.user.id).lean().select("-password -__v");
    console.log(userInfo);
    res.render("profile", {
        title: "Profile",
        user: { id: req.user.id, ...userInfo }
    });
}

const resetPasswordController = async (req, res) => {
    const { passwordOld, passwordNew, passwordConfirm } = req.body;

    if ([passwordOld, passwordNew, passwordConfirm].some(field => field.trim() === "")) {
        throw new AppError(400, "All the fields are required");
    };

    const token = req.cookies?.token;

    if (!token) {
        throw new AppError(404, "Token not found");
    };

    const ddata = decryptToken(token);
    const userId = ddata.id;

    const user = await User.findById(userId);

    if (!user) {
        throw new AppError(404, "User not found");
    };

    const isSamePassword = await user.comparePassword(passwordNew);

    if (isSamePassword) {
        throw new AppError(400, "New password must be different from the current password");
    };

    const isMatch = await user.comparePassword(passwordOld, user.password);

    if (!isMatch) {
        throw new AppError(400, "Entered current password is incorrect");
    };

    if (passwordNew !== passwordConfirm) {
        throw new AppError(400, "New password and confirm passwords are not matching");
    };

    user.password = passwordNew;
    await user.save();

    res.redirect("/user/profile");
}

module.exports = {
    profilePageController,
    resetPasswordController
}