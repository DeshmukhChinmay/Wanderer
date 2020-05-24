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
    profilePic: {
        type: String,
    },
});

module.exports = mongoose.model("users", userSchema);
