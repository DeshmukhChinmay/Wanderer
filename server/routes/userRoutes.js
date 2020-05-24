module.exports = (app) => {
    /**
     * Sending the current user from the session that
     * is logged in
     */
    app.get("/user/current-user", (req, res) => {
        res.send(req.user);
    });
};
