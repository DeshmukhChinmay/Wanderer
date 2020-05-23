const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const applicationKeys = require("./../config/applicationKeys");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
    // console.log("In serialize");
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    // console.log("In deserialize");
    const user = await User.findById(id);
    // console.log(user);
    done(null, user);
});

passport.use(
    new GoogleStrategy(
        {
            clientID: applicationKeys.googleClientID,
            clientSecret: applicationKeys.googleClientSecret,
            callbackURL: "/auth/google/callback",
            proxy: true,
        },
        async (accessToken, refreshToken, profile, done) => {
            // console.log("In passport");
            // console.log("profile: ", profile);

            const existingUser = await User.findOne({ email: profile._json.email });

            // console.log(`Existing user: ${existingUser}`);

            if (existingUser) {
                // console.log("USER ALREADY EXISTS");
                done(null, existingUser);
            } else {
                // console.log("NOT AN EXISTING USER");
                const user = await new User({
                    googleId: profile.id,
                    email: profile._json.email,
                    name: profile._json.name,
                    profilePic: profile._json.picture,
                }).save();

                done(null, user);
            }

            // console.log("AUTHENTICATION FINISHED");
        },
    ),
);
