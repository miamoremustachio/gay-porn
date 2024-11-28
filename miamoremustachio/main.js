const {
    LOCAL_HOST,
    HELLO_MESSAGE,
    START_MESSAGE,
    PARAM_EXAMPLE,
    ERROR
} = require('./modules/constants.js');

const {
    geocodingRequest,
    weatherRequest
} = require('./modules/request_functions.js');

const { getFormattedConditions } = require('./modules/extra_functions.js');

const http = require('http');
const server = http.createServer().listen(3000);


server.on('request', (req, res) => {
    const url = new URL(LOCAL_HOST + req.url);
    const cityName = url.searchParams.get('city');

    if (url.pathname === '/favicon.ico') {
        return res.end();
    }

    if (url.pathname === '/' && !url.search) {
        return res.end(`${HELLO_MESSAGE} \n${START_MESSAGE} \n${PARAM_EXAMPLE}`);
    }

    if (!cityName) {
        return res.end(`${ERROR.PARAM_MISSING} \n${PARAM_EXAMPLE}`);
    }

    if (url.searchParams.size > 1) {
        return res.end(`${ERROR.PARAM_EXTRA} \n${PARAM_EXAMPLE}`);
    }
    
    async function getData(cityName) {
        try {
            const geocodingData = await geocodingRequest(cityName);
            const weatherData = await weatherRequest(geocodingData);
            const conditionsString = getFormattedConditions(weatherData);

            res.end(conditionsString);
        } catch(error) {
            res.end(error.message);
        }
    }
    
    getData(cityName);
});