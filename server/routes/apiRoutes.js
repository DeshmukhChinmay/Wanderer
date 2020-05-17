const applicationKeys = require("../config/applicationKeys");
const axios = require("axios");

const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/forecast";
const WEATHER_API_KEY = applicationKeys.weatherAPIKey;

module.exports = (app) => {
    app.get("/api/weather", async (req, res) => {
        console.log("This is getting called!!!!!!");

        // OpenWeatherAPI endpoint - api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={your api key}

        // Change this with the co-ords from the request
        const latitude = -36.84846;
        const longitude = 174.763336;

        // Extract the relevant data from the weather response
        const weatherResponse = await axios.get(
            `${WEATHER_API_URL}?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}`,
        );
        res.send(weatherResponse.data);
    });
};
