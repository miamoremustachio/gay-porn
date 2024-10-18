const {
  format,
  fromUnixTime,
  secondsToMinutes,
  addMinutes,
} = require('date-fns');
const { UTCDate } = require('@date-fns/utc');

const { TIME_FORMAT, UNIT_USED } = require('../config');

function getGMTOffsetString(timezone) {
  const offsetDate = addMinutes(new UTCDate(0), Math.abs(timezone));
  const offsetTime = format(offsetDate, 'HH:mm');
  const sign = (timezone >= 0) ? '+' : '-';

  return `GMT${sign}${offsetTime}`;
}

function getFormattedData(data) {
  return {
    name: data.name,
    countryCode: data.sys.country,
    weather: data.weather[0].main,
    weatherDescription: data.weather[0].description,
    temp: data.main.temp.toFixed(1),
    tempFeelsLike: data.main.feels_like.toFixed(1),
    unitSymbol: UNIT_USED.symbol,
    sunriseLocal: fromUnixTime(data.sys.sunrise),
    get sunriseUTC() {
      return new UTCDate(this.sunriseLocal);
    },
    sunsetLocal: fromUnixTime(data.sys.sunset),
    get sunsetUTC() {
      return new UTCDate(this.sunsetLocal);
    },
    timezone: secondsToMinutes(data.timezone),
    get sunriseOffset() {
      return addMinutes(this.sunriseUTC, this.timezone);
    },
    get sunsetOffset() {
      return addMinutes(this.sunsetUTC, this.timezone);
    },
    get sunrise() {
      return format(this.sunriseOffset, TIME_FORMAT.SUNRISE);
    },
    get sunset() {
      return format(this.sunsetOffset, TIME_FORMAT.SUNSET);
    },
    get GMTOffset() {
      return getGMTOffsetString(this.timezone);
    },
  };
}

module.exports = { getFormattedData };
