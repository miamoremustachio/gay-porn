const { PARAM_NAME, API_KEY, UNIT_USED } = require('../config');
const { INFO } = require('./messages');
const { getResponseErrorMessage } = require('./helpers');
const { getFormattedData } = require('./time_formatting');

function setParams(url, cityName) {
  url.searchParams.set(PARAM_NAME.CITY_NAME, cityName);
  url.searchParams.set(PARAM_NAME.API_KEY, API_KEY);
  url.searchParams.set(PARAM_NAME.UNITS, UNIT_USED.param);
}

function weatherRequest(url, cityName) {
  setParams(url, cityName);

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(getResponseErrorMessage(response));
      }

      return response.json();
    })
    .then(data => {
      const formattedData = getFormattedData(data);

      return INFO.WEATHER_CONDITION(formattedData);
    });
}

module.exports = { weatherRequest };