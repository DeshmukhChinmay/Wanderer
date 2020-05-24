const mongoose = require("mongoose");
const { Schema } = mongoose;
const LocationSchema = require("./Location");

const journeySchema = new Schema({
    name: String,
    notes: String,
    startDate: String,
    endDate: String,
    locations: [LocationSchema],
    active: {
        type: Boolean,
        default: true,
    },
    _user: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
});

module.exports = mongoose.model("journeys", journeySchema);
