const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");

const Journey = mongoose.model("journeys");
const User = mongoose.model("users");

module.exports = (app) => {
    app.post("/journey/create", async (req, res) => {
        console.log("Getting a post request");

        console.log(req.body);

        const name = req.body.name;
        const notes = req.body.notes;
        const startDate = req.body.startDate;
        const endDate = req.body.endDate;
        const locations = req.body.locations;
        const active = true;
        const _user = req.user.id;

        console.log(locations);

        try {
            await new Journey({
                name,
                notes,
                startDate,
                endDate,
                locations,
                active,
                _user,
            }).save();
        } catch (error) {
            res.status(400).send();
        }

        res.status(201).send();
    });

    app.get("/journey/all", requireLogin, async (req, res) => {
        const journeys = await Journey.find({ _user: req.user.id });
        res.send(journeys);
    });

    app.get("/journey/all-inactive", requireLogin, async (req, res) => {
        const journeys = await Journey.find({ _user: req.user.id, active: false });
        res.send(journeys);
    });

    app.get("/journey/all-active", requireLogin, async (req, res) => {
        console.log("IN THE SERVER");
        const journeys = await Journey.find({ _user: req.user.id, active: true });
        console.log("journeys");
        console.log(journeys);
        res.send(journeys);
    });

    app.get("/journey/:id", requireLogin, async (req, res) => {
        const journey = await Journey.findOne({ _id: req.params.id });
        res.send(journey);
    });

    app.delete("/journey/:id", requireLogin, async (req, res) => {
        const journey = await Journey.findOneAndRemove({ _id: req.params.id });
        res.send(journey);
    });

    app.post("/journey/make-active/:id", requireLogin, async (req, res) => {
        console.log("Attempt to make journey complete.");
        var journey = await Journey.findOneAndUpdate({ _id: req.params.id }, { active: true });

        res.send(journey);
    });

    app.post("/journey/make-inactive/:id", requireLogin, async (req, res) => {
        console.log("Attempt to make journey complete.");
        var journey = await Journey.findOneAndUpdate({ _id: req.params.id }, { active: false });

        res.send(journey);
    });

    app.delete("/journey/:id", requireLogin, async (req, res) => {
        var journeys = await Journey.findOne({ _id: req.params.id });
        journeys[0].deleteOne();
        res.send(journeys);
    });
};
