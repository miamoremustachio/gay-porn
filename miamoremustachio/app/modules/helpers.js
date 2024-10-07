const { FAVICON } = require('./constants');

module.exports.isUrlValid = url => (url !== FAVICON);
module.exports.getNameFromUrl = url => url.slice(1);
module.exports.getResponseErrorMessage = res => `${res.status}: ${res.statusText}`;