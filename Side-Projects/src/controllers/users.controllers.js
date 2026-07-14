const User = require("../models/user.model.js");

const profilePageController = async (req, res) => {
    const userInfo = await User.findById(req.user.id).lean().select("-password -__v -candidatePassword -otp");
    res.render("profile", {
        title: "Profile",
        user: { id: req.user.id, ...userInfo }
    });
}

module.exports = {
    profilePageController
}
