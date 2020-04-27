const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    googleId: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
});

mongoose.model("users", userSchema);
