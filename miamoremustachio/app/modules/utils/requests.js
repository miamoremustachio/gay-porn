const { UNIT_USED } = require('../config');

const { getResponseErrorMessage } = require('./helpers');
const { getGMTOffsetString } = require('./time');
const { format, fromUnixTime, secondsToMinutes, addMinutes } = require('date-fns');
const { UTCDate } = require('@date-fns/utc');

function weatherRequest(url) {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(getResponseErrorMessage(response));
      }

      return response.json();
    })
    .then(data => {
      const name = data.name;
      const countryCode = data.sys.country;
      const weather = data.weather[0].main;
      const weatherDescription = data.weather[0].description;
      const temp = data.main.temp.toFixed(1);
      const tempFeelsLike = data.main.feels_like.toFixed(1);
      const unitSymbol = UNIT_USED.symbol;
      const sunriseLocal = fromUnixTime(data.sys.sunrise);
      const sunriseUTC = new UTCDate(sunriseLocal);
      const sunsetLocal = fromUnixTime(data.sys.sunset);
      const sunsetUTC = new UTCDate(sunsetLocal);
      const timezone = secondsToMinutes(data.timezone);
      const sunrise = addMinutes(sunriseUTC, timezone);
      const sunset = addMinutes(sunsetUTC, timezone);
      const GMTOffset = getGMTOffsetString(timezone);

      return `The weather condition for ${name} (${countryCode}) is ${weather} (${weatherDescription}).`
        + `<br/>Temperature: ${temp} &deg;${unitSymbol}, feels like ${tempFeelsLike} &deg;${unitSymbol}.`
        + `<br/>Sunrise: ${format(sunrise, 'p')},`
        + `<br/>Sunset: ${format(sunset, 'p')}`
        + `<br/><i>(${GMTOffset}).</i>`;
    });
}

module.exports = { weatherRequest };