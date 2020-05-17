const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const applicatonKeys = require("./config/applicationKeys");
require("./models/User");
require("./services/passportGoogle");

const MAX_COOKIE_AGE = 24 * 60 * 60 * 1000;

mongoose.connection.on("open", function (ref) {
    console.log("Connected to mongoDB server!");
});

mongoose.connection.on("error", function (err) {
    console.log("Could not connect to mongoDB server!");
    return console.log(err);
});

mongoose.connect(applicatonKeys.mongoURI, { useNewUrlParser: true });

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

require("./routes/index")(app);
require("./routes/authRoutes")(app);
require("./routes/userRoutes")(app);
require("./routes/apiRoutes")(app);

const PORT = 5000;
app.listen(PORT);
