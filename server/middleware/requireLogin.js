// Check whether the request sends a user object with the request.
// If there is a user, then the user is logged in.
module.exports = (req, res, next) => {
    if (!req.user) {
        return res.status(401).send({ error: "You must log in!" });
    }

    next();
};
