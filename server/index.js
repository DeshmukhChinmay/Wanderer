const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const applicatonKeys = require("./config/applicationKeys");
require("./models/User");
require("./models/Journey");
require("./services/passportGoogle");

const MAX_COOKIE_AGE = 24 * 60 * 60 * 1000;

// MongoDB server initialisation
mongoose.connection.on("open", function (ref) {
    console.log("Connected to mongoDB server!");
});

mongoose.connection.on("error", function (err) {
    console.log("Could not connect to mongoDB server!");
    return console.log(err);
});

mongoose.connect(applicatonKeys.mongoURI, { useNewUrlParser: true });

// Express server initialization
const app = express();

app.use(
    cookieSession({
        maxAge: MAX_COOKIE_AGE,
        keys: [applicatonKeys.cookieKey],
    }),
);

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);
require("./routes/userRoutes")(app);
require("./routes/apiRoutes")(app);
require("./routes/journeyRoutes")(app);

// Serve the static files to the client in production environment
if (process.env.NODE_ENV === "production") {
    app.use(express.static("build"));
    const path = require("path");
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "build", "index.html"));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
