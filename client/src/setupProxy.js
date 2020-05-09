const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
    app.use(
        // ADD MORE ROUTES HERE
        ["/auth", "/user"],
        createProxyMiddleware({
            target: "http://localhost:5000",
        }),
    );
};
