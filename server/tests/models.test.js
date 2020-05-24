const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const userModel = require("../models/User");
const journeyModel = require("../models/Journey");

let mongod;
let user1, user2, user3;
let journey1, journey2, journey3;

beforeAll(async () => {
    mongod = new MongoMemoryServer();

    const connectionString = await mongod.getConnectionString();
    await mongoose.connect(connectionString, { useNewUrlParser: true });
});

describe("journey", () => {
    beforeEach(async () => {
        const collection = await mongoose.connection.db.createCollection("journeys");

        user1 = new userModel({
            googleId: "someGoogleId1",
            email: "pparker@gmail.com",
            name: "Peter Parker",
            profilePic: "LinkToProfilePicSpiderman",
        });

        user2 = new userModel({
            googleId: "someGoogleId2",
            email: "kent.clark@gmail.com",
            name: "Clark Kent",
            profilePic: "LinkToProfilePicSuperman",
        });

        journey1 = new journeyModel({
            name: "Spain Trip",
            notes: "Remeber to travel to Madrid",
            startDate: "2020-05-25T11:28:00.000Z",
            endDate: "2020-05-28T11:28:00.000Z",
            locations: [
                {
                    name: "Madrid",
                    latitude: 123.123,
                    longitude: 111.111,
                },
                {
                    name: "Barcelona",
                    latitude: 40.44,
                    longitude: -12.13,
                },
            ],
            active: true,
            _user: user1._id,
        });

        journey2 = new journeyModel({
            name: "NZ Trip",
            notes: "Book Hobbiton Tour",
            startDate: "2020-05-25T11:28:00.000Z",
            endDate: "2020-05-28T11:28:00.000Z",
            locations: [
                {
                    name: "Hamilton, New Zealand",
                    latitude: -37.7870012,
                    longitude: 175.279253,
                },
                {
                    name: "Barcelona",
                    latitude: 40.44,
                    longitude: -12.13,
                },
            ],
            active: false,
            _user: user1._id,
        });

        journey3 = new journeyModel({
            name: "Europe Trip",
            notes: "Dont forget to book the Alps Tour",
            startDate: "2020-05-25T11:28:00.000Z",
            endDate: "2020-05-28T11:28:00.000Z",
            locations: [
                {
                    name: "Munich, Germany",
                    latitude: 48.1351253,
                    longitude: 11.5819805,
                },
                {
                    name: "Zürich, Switzerland",
                    latitude: 47.3768866,
                    longitude: 8.541694,
                },
            ],
            active: true,
            _user: user2._id,
        });

        await collection.insertMany([journey1, journey2, journey3]);
    });

    afterEach(async () => {
        await mongoose.connection.db.dropCollection("journeys");
    });

    it("get all journeys for a user", async () => {
        const retrievedJourneys = await journeyModel.find({ _user: user1._id });

        expect(retrievedJourneys).toBeTruthy();
        expect(retrievedJourneys.length).toBe(2);

        expect(retrievedJourneys[0].name).toBe("Spain Trip");
        expect(retrievedJourneys[1].name).toBe("NZ Trip");
    });

    it("get all active journeys for a user", async () => {
        const retrievedJourneys = await journeyModel.find({ _user: user1.id, active: true });

        expect(retrievedJourneys).toBeTruthy();
        expect(retrievedJourneys.length).toBe(1);

        expect(retrievedJourneys[0].name).toBe("Spain Trip");
    });

    it("get all inactive journeys for a user", async () => {
        const retrievedJourneys = await journeyModel.find({ _user: user1.id, active: false });

        expect(retrievedJourneys).toBeTruthy();
        expect(retrievedJourneys.length).toBe(1);

        expect(retrievedJourneys[0].name).toBe("NZ Trip");
    });

    it("get a single journey", async () => {
        const retrievedJourney = await journeyModel.findOne({ _id: journey1._id });

        expect(retrievedJourney.name).toBe("Spain Trip");
    });

    it("change a journeys active status to true", async () => {
        await journeyModel.findOneAndUpdate({ _id: journey2._id }, { active: true });

        const changedJourney = await journeyModel.findOne({ _id: journey2._id });

        expect(changedJourney.name).toBe("NZ Trip");
        expect(changedJourney.active).toBe(true);
    });

    it("change a journeys active status to false", async () => {
        await journeyModel.findOneAndUpdate({ _id: journey1._id }, { active: false });

        const changedJourney = await journeyModel.findOne({ _id: journey1._id });

        expect(changedJourney.name).toBe("Spain Trip");
        expect(changedJourney.active).toBe(false);
    });
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
});
