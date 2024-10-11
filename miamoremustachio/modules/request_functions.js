const { API_HOST, GEOCODING_PATH, WEATHER_PATH } = require('./constants.js');
const { API_KEY } = require('./api_key.js');

async function geocodingRequest(cityName) {
    const locationsLimit = '1';

    const geocodingEndpoint = new URL(API_HOST + GEOCODING_PATH);
    const params = geocodingEndpoint.searchParams;
    params.set('q', cityName);
    params.set('limit', locationsLimit);
    params.set('appid', API_KEY);

    const response = await fetch(geocodingEndpoint);

    if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.length) {
        throw new Error(`Sorry, the place "${cityName}" wasn't found in database :(`);
    }

    return data;
}

async function weatherRequest(geocodingData) {
    const latitude = geocodingData[0].lat;
    const longitude = geocodingData[0].lon;
    const units = 'metric';

    const weatherEndpoint = new URL(API_HOST + WEATHER_PATH);
    const params = weatherEndpoint.searchParams;
    params.set('lat', latitude);
    params.set('lon', longitude);
    params.set('appid', API_KEY);
    params.set('units', units);

    const response = await fetch(weatherEndpoint);

    if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
    }

    return await response.json();
}

module.exports = { geocodingRequest, weatherRequest };