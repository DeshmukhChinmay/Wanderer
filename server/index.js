const express = require("express");
const app = express();

require("./routes/index")(app);

const PORT = 5000;
app.listen(PORT);
