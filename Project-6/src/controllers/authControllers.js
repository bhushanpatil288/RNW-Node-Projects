const loginPageController = (req, res) => {
    res.render("signin");
}

const signupPageController = (req, res) => {
    res.render("signup");
}

module.exports = {
    loginPageController,
    signupPageController
}