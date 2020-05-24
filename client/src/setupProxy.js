const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
    app.use(
        ["/auth", "/user", "/api", "/journey"],
        createProxyMiddleware({
            target: "http://localhost:5000",
        }),
    );
};
