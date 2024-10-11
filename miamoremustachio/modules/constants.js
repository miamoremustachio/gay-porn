const LOCAL_HOST = 'http://localhost';

const API_HOST = 'http://api.openweathermap.org';
const GEOCODING_PATH = '/geo/1.0/direct';
const WEATHER_PATH = '/data/2.5/weather';

const HELLO_MESSAGE = 'Welcome to Weather server!';
const START_MESSAGE = 'Write the name of any locacity in "city" parameter to know its current weather conditions';
const PARAM_EXAMPLE = '(example: "/?city=Tokyo").';

const ERROR = {
    'PARAM_MISSING': 'Request failed: URL parameter is missing. Use "city" parameter to get weather info',
    'PARAM_EXTRA': 'Request failed: too much parameters in URL. Use only "city" parameter',
};

module.exports = {
    LOCAL_HOST,
    API_HOST,
    GEOCODING_PATH,
    WEATHER_PATH,
    HELLO_MESSAGE,
    START_MESSAGE,
    PARAM_EXAMPLE,
    ERROR
};