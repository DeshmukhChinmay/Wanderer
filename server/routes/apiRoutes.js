const applicationKeys = require("../config/applicationKeys");
const axios = require("axios");

const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/forecast";
const WEATHER_API_KEY = applicationKeys.weatherAPIKey;

const GOOGLE_PLACES_API_URL = "https://maps.googleapis.com/maps/api/place";
const GOOGLE_PLACES_API_KEY = applicationKeys.googlePlacesAPIKey;

module.exports = (app) => {
    /**
     * Getting the weather data for the co-ordinates sent through a GET request.
     */
    app.get("/api/weather/:latitude/:longitude", async (req, res) => {
        const latitude = req.params.latitude;
        const longitude = req.params.longitude;

        const weatherResponse = await axios.get(
            `${WEATHER_API_URL}?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}`,
        );

        res.send(weatherResponse.data);
    });

    // needs placeID in request
    app.get("/api/placeDetails", async (req, res) => {
        console.log("PLACES really getting called");

        // temp placeID
        const placeID = "ChIJL8C1F-VHDW0RsqoLpGczk0E";

        // https://maps.googleapis.com/maps/api/place/details/output?parameters
        // more fields can be added
        // more information on fields --> https://developers.google.com/places/web-service/details?authuser=2#PlaceDetailsResults
        const detailsResponse = await axios.get(
            `${GOOGLE_PLACES_API_URL}/details/json?place_id=${placeID}&fields=name,rating,photos,reviews&key=${GOOGLE_PLACES_API_KEY}`,
        );
        res.send(detailsResponse.data);
    });

    // needs photo references in request
    app.get("/api/placePhotos", async (req, res) => {
        console.log("photos api getting called");

        // temp photoreference
        const photoReference =
            "CmRaAAAAuLSi6p5jzXld2JJWQiaUNpA5922ai-LI7hsmIV3TW5oI9MPss1BgX-AWk01ixDJM_RtuFCwJH-HkNuNdMWIncsaz0lImEXbgLiHN36LRi4qHbL4lybj6Eexvx7BJkYWIEhDy9PNpJLkjCG8kjqSqSvU4GhRwjpfs9mu5_j6mX5hwIxi1SJG2wA";

        // https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CnRtAAAATLZNl354RwP_9UKbQ_5Psy40texXePv4oAlgP4qNEkdIrkyse7rPXYGd9D_Uj1rVsQdWT4oRz4QrYAJNpFX7rzqqMlZw2h2E2y5IKMUZ7ouD_SlcHxYq1yL4KbKUv3qtWgTK0A6QbGh87GB3sscrHRIQiG2RrmU_jF4tENr9wGS_YxoUSSDrYjWmrNfeEHSGSc3FyhNLlBU&key=YOUR_API_KEY

        const photoResponse = await axios.get(
            `${GOOGLE_PLACES_API_URL}/photo?maxwidth=400&photoreference=${photoReference}&key=${GOOGLE_PLACES_API_KEY}`,
        );
        res.send(photoResponse.data);
    });
};
