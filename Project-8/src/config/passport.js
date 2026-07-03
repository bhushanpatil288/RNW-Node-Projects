const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

module.exports = function (passport) {
    passport.use(
        new LocalStrategy(
            { usernameField: "email" },
            async (email, password, done) => {
                try {
                    // Find user by email (case-insensitive search)
                    const user = await User.findOne({ email: email.toLowerCase() });
                    if (!user) {
                        return done(null, false, { message: "Invalid email or password" });
                    }

                    // Check password
                    const isMatch = await user.comparePassword(password);
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: "Invalid email or password" });
                    }
                } catch (err) {
                    return done(err);
                }
            }
        )
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });
};
