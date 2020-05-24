const passport = require("passport");

module.exports = (app) => {
    /**
     * Authenticating a user using google.
     */
    app.get(
        "/auth/google",
        passport.authenticate("google", {
            scope: ["profile", "email"],
        }),
    );

    /**
     * Redirecting the user back to the homepage after authentication.
     */
    app.get("/auth/google/callback", passport.authenticate("google"), (req, res) => {
        res.redirect("/home");
    });

    /**
     * Logout the user from the current session.
     */
    app.get("/auth/logout", (req, res) => {
        req.logout();
        res.redirect("/");
    });
};
