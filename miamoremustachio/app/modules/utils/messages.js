const { HOST, PORT, PARAM_NAME } = require('../config');
const { CITY_NAME } = PARAM_NAME;

const packageInfo = require('../../../package.json');
const appVersion = packageInfo.version;

const urlExample = new URL(`${HOST}:${PORT}/?${CITY_NAME}=%your_city_name%`);

const ERROR = {
  MISSING_CITY_NAME: `URL must contain a "${CITY_NAME}" param with city name provided.`,
};

const INFO = {
  WELCOME: `Welcome to Weather Server, ver. ${appVersion}.\nTo get current weather condition for your city, send URL request to this address:\n${urlExample}`,
};

module.exports = {
  ERROR,
  INFO,
};