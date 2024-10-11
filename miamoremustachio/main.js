const { HELLO_MESSAGE, START_MESSAGE } = require('./modules/constants.js');
const { geocodingRequest, weatherRequest } = require('./modules/request_functions.js');

const addMinutes = require('date-fns/addMinutes');
const secondsToMinutes = require('date-fns/secondsToMinutes');
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
            const cityOffset = secondsToMinutes(data.timezone); // in minutes
            const totalOffset = localOffset + cityOffset;

            const cityTime = addMinutes(new Date(), totalOffset);
            const time = format(cityTime, 'MMM do, p'); // Jan 1st, 12:00 AM

            const localSunrise = fromUnixTime(data.sys.sunrise);
            const citySunrise = addMinutes(localSunrise, totalOffset);
            const sunrise = format(citySunrise, 'p'); // 12:00 AM

            const localSunset = fromUnixTime(data.sys.sunset);
            const citySunset = addMinutes(localSunset, totalOffset);
            const sunset = format(citySunset, 'p'); // 12:00 AM

            res.end(`Weather conditions in ${cityName} (${countryCode}): ${conditions}; current time: ${time}; sunrise: ${sunrise}, sunset: ${sunset}.`);
        })
        .catch(error => res.end(error.message));
});