const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");

const Journey = mongoose.model("journeys");
const User = mongoose.model("users");

module.exports = (app) => {
    /**
     * Creating a new journey in the database after getting a POST request
     */
    app.post("/journey/create", async (req, res) => {
        const name = req.body.name;
        const notes = req.body.notes;
        const startDate = req.body.startDate;
        const endDate = req.body.endDate;
        const locations = req.body.locations;
        const active = true;
        const _user = req.user.id;

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

    /**
     * Returning all of the journeys of a user
     */
    app.get("/journey/all", requireLogin, async (req, res) => {
        const journeys = await Journey.find({ _user: req.user.id });
        res.send(journeys);
    });

    /**
     * Returning all of the inactive journeys of a user
     */
    app.get("/journey/all-inactive", requireLogin, async (req, res) => {
        const journeys = await Journey.find({ _user: req.user.id, active: false });
        res.send(journeys);
    });

    /**
     * Returning all of the active journeys of a user
     */
    app.get("/journey/all-active", requireLogin, async (req, res) => {
        const journeys = await Journey.find({ _user: req.user.id, active: true });
        res.send(journeys);
    });

    /**
     * Returning a specific journey
     */
    app.get("/journey/:id", requireLogin, async (req, res) => {
        const journey = await Journey.findOne({ _id: req.params.id });
        res.send(journey);
    });

    /**
     * Deleting a specific journey from the database
     */
    app.delete("/journey/:id", requireLogin, async (req, res) => {
        const journey = await Journey.findOneAndRemove({ _id: req.params.id });
        res.send(journey);
    });

    /**
     * Changing the status of a journey to active
     */
    app.post("/journey/make-active/:id", requireLogin, async (req, res) => {
        var journey = await Journey.findOneAndUpdate({ _id: req.params.id }, { active: true });
        res.send(journey);
    });

    /**
     * Changing the status of a journey to inactive
     */
    app.post("/journey/make-inactive/:id", requireLogin, async (req, res) => {
        var journey = await Journey.findOneAndUpdate({ _id: req.params.id }, { active: false });
        res.send(journey);
    });
};
