const { API_HOST, GEOCODING_PATH, WEATHER_PATH } = require('./constants.js');
const { API_KEY } = require('./api_key.js');

function geocodingRequest(cityName) {
    const locationsLimit = '1';

    const geocodingEndpoint = new URL(API_HOST + GEOCODING_PATH);
    const params = geocodingEndpoint.searchParams;
    params.append('q', cityName);
    params.append('limit', locationsLimit);
    params.append('appid', API_KEY);

    return fetch(geocodingEndpoint)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`${response.status}: ${response.statusText}`);
            }
        })
        .then(data => {
            if (!data.length) {
                throw new Error(`Sorry, the place "${cityName}" wasn't found in database :(`);
            }

            return data;
        });
}

function weatherRequest(data) {
    const latitude = data[0].lat;
    const longitude = data[0].lon;
    const units = 'metric';

    const weatherEndpoint = new URL(API_HOST + WEATHER_PATH);
    const params = weatherEndpoint.searchParams;
    params.append('lat', latitude);
    params.append('lon', longitude);
    params.append('appid', API_KEY);
    params.append('units', units);

    return fetch(weatherEndpoint)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`${response.status}: ${response.statusText}`);
            }
        });
}

module.exports = { geocodingRequest, weatherRequest };