const addMinutes = require('date-fns/addMinutes');
const secondsToMinutes = require('date-fns/secondsToMinutes');
const fromUnixTime = require('date-fns/fromUnixTime');
const format = require('date-fns/format');

function getFormattedConditions(data) {
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

    return `Weather conditions in ${cityName} (${countryCode}): ${conditions}.`
    + `\nCurrent time: ${time}.`
    + `\nSunrise: ${sunrise},`
    + `\nSunset: ${sunset}.`;
}

module.exports = { getFormattedConditions };