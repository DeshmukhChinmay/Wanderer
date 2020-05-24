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

    /**
     * Getting the places data from Google Places API
     */
    app.get("/api/placeDetails/:placeID", async (req, res) => {
        const placeID = req.params.placeID;

        const detailsResponse = await axios.get(
            `${GOOGLE_PLACES_API_URL}/details/json?place_id=${placeID}&fields=name,photos,reviews&key=${GOOGLE_PLACES_API_KEY}`,
        );
        res.send(detailsResponse.data);
    });
};
