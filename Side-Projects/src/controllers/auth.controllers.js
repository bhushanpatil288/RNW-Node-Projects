const AppError = require("../utils/AppError");
const loginPageController = (req, res) => {
    res.render("login");
}

const loginController = (req, res) => {
    const { username, email, password } = req.body;

    if ([username, email, password].some(field => field.trim() === "")) {
        throw new AppError(400, "All the fields are required");
    }

    res.redirect("/products");
}

module.exports = {
    loginPageController,
    loginController
}
