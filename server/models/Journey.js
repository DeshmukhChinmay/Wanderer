const mongoose = require("mongoose");
const { Schema } = mongoose;
const LocationSchema = require("./Location");

const journeySchema = new Schema({
    name: String,
    notes: String,
    locations: [LocationSchema],
    active: Boolean,
    _user: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
});

mongoose.model("journeys", journeySchema);
