module.exports = (app) => {
    app.get("/user/current-user", (req, res) => {
        res.send(req.user);
    });
};
