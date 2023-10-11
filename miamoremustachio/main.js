const { API_KEY } = require('./modules/api_key.js');
const { HELLO_MESSAGE, START_MESSAGE } = require('./modules/constants.js');

const addMinutes = require('date-fns/addMinutes');
const addSeconds = require('date-fns/addSeconds');
const fromUnixTime = require('date-fns/fromUnixTime');
const format = require('date-fns/format');

const http = require('http');
const server = http.createServer().listen(3000);


server.on('request', (req, res) => {
    if (req.url === '/') {
        return res.end(HELLO_MESSAGE + START_MESSAGE);
    };

    if (req.url === '/favicon.ico') {
        return res.end();
    };

    const cityName = req.url.slice(1);
    
    geocodingRequest(cityName)
        .then(data => weatherRequest(data))
        .then(data => {
            const cityName = data.name;
            const countryCode = data.sys.country;
            const conditions = data.weather[0].description;

            const localOffset = new Date().getTimezoneOffset(); // in minutes
            const cityOffset = data.timezone; // in seconds

            const UTCTime = addMinutes(new Date(), localOffset);
            const cityTime = addSeconds(UTCTime, cityOffset);
            const time = format(cityTime, 'MMM do, p'); // Jan 1st, 12:00 AM

            const localSunrise = fromUnixTime(data.sys.sunrise);
            const UTCSunrise = addMinutes(localSunrise, localOffset);
            const citySunrise = addSeconds(UTCSunrise, cityOffset);
            const sunrise = format(citySunrise, 'p'); // 12:00 AM

            const localSunset = fromUnixTime(data.sys.sunset);
            const UTCSunset = addMinutes(localSunset, localOffset);
            const citySunset = addSeconds(UTCSunset, cityOffset);
            const sunset = format(citySunset, 'p'); // 12:00 AM

            res.end(`Weather conditions in ${cityName} (${countryCode}): ${conditions}; current time: ${time}; sunrise: ${sunrise}, sunset: ${sunset}.`);
        })
        .catch(error => res.end(error.message));
});


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
            };
        })
        .then(data => {
            if (!data.length) {
                throw new Error(`Sorry, the place "${cityName}" wasn't found in database :(`);
            };

            return data;
        })
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
            };
    })
}