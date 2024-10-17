const { format, addMinutes } = require('date-fns');
const { UTCDate } = require('@date-fns/utc');

function getGMTOffsetString(timezone) {
  
  const offsetDate = addMinutes(new UTCDate(0), Math.abs(timezone));
  const offsetTime = format(offsetDate, 'HH:mm');
  const sign = (timezone > 0) ? '+' : '-';

  return `GMT${sign}${offsetTime}`;
}

module.exports = { getGMTOffsetString };