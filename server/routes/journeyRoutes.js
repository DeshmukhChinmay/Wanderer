const mongoose = require("mongoose");
const requireLogin = require('../middleware/requireLogin');

const Journey = mongoose.model('journeys');
const User = mongoose.model('users');

module.exports = (app) => {
  app.get("/journey/all", requireLogin, async (req, res) => {
    const journeys = await Journey.find({_user: req.user.id});
    res.send(journeys);
  });

  app.get("/journey/all-inactive", requireLogin, async (req, res) => {
    const journeys = await Journey.find({_user: req.user.id, active: false});
    res.send(journeys);
  });

  app.get("/journey/all-active", requireLogin, async (req, res) => {
    const journeys = await Journey.find({_user: req.user.id, active: true});
    res.send(journeys);
  });

  app.get("/journey/:id", requireLogin, async (req, res) => {
    const journey = await Journey.findOne({_id: req.params.id});
    res.send(journey);
  });

  app.delete("/journey/:id", requireLogin, async (req, res) => {
    const journey = await Journey.findOneAndRemove({_id: req.params.id});
    res.send(journey);
  });

  app.post("/journey/make-active/:id", requireLogin, async (req, res) => {
    console.log("Attempt to make journey complete.");
    var journey = await Journey.findOneAndUpdate({_id: req.params.id}, {active: true});

    res.send(journey);
  });

  app.post("/journey/make-inactive/:id", requireLogin, async (req, res) => {
    console.log("Attempt to make journey complete.");
    var journey = await Journey.findOneAndUpdate({_id: req.params.id}, {active: false});

    res.send(journey);
  });

  app.delete("/journey/:id", requireLogin, async (req, res) => {
    var journeys = await Journey.findOne({_id: req.params.id});
    journeys[0].deleteOne();
    res.send(journeys);
  });

  app.post("/journey", requireLogin, async (req, res) => {
    const user = await User.findOne({ _id: req.user.id })
    journey = req.body.journey;
    journey._user = user._id;

    console.log("Attempting to post journey: "+req.body.journey);
    finalJourney = Journey.create(journey);
    finalJourney.save();

    res.send(finalJourney);
  });
};
