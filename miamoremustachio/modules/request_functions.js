const { API_KEY } = require('./api_key.js');

function geocodingRequest(cityName) {
    const geocodingApi = 'http://api.openweathermap.org/geo/1.0/direct';
    const locationsLimit = '1';
    const geocodingEndpoint = `${geocodingApi}?q=${cityName}&limit=${locationsLimit}&appid=${API_KEY}`;

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

    const weatherApi = 'http://api.openweathermap.org/data/2.5/weather';
    const units = 'metric';
    const weatherEndpoint = `${weatherApi}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=${units}`;
    
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