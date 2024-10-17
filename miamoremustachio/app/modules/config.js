require('dotenv').config();

const HOST = process.env.HOST || 'http://localhost';
const PORT = process.env.PORT || 3000;
const SERVER_URL = "https://api.openweathermap.org/data/2.5/weather"
const API_KEY = process.env.API_KEY;

const UNITS = {
  STANDARD: {
    param: 'standard',
    symbol: 'K',
  },
  METRIC: {
    param: 'metric',
    symbol: 'C',
  },
  IMPERIAL: {
    param: 'imperial',
    symbol: 'F',
  },
};

const UNIT_USED = UNITS.METRIC;

const PARAM_NAME = {
  API_KEY: 'appid',
  CITY_NAME: 'q',
  UNITS: 'units',
};

module.exports = {
  HOST,
  PORT,
  SERVER_URL,
  API_KEY,
  UNITS,
  UNIT_USED,
  PARAM_NAME,
};