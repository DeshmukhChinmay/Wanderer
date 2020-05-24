const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const applicationKeys = require("./../config/applicationKeys");
const User = mongoose.model("users");

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

// Authenticate the user using the passportJs lib
passport.use(
    new GoogleStrategy(
        {
            clientID: applicationKeys.googleClientID,
            clientSecret: applicationKeys.googleClientSecret,
            callbackURL: "/auth/google/callback",
            proxy: true,
        },
        async (accessToken, refreshToken, profile, done) => {
            const existingUser = await User.findOne({ email: profile._json.email });

            if (existingUser) {
                done(null, existingUser);
            } else {
                const user = await new User({
                    googleId: profile.id,
                    email: profile._json.email,
                    name: profile._json.name,
                    profilePic: profile._json.picture,
                }).save();

                done(null, user);
            }
        },
    ),
);
