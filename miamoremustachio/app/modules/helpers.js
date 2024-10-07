const { FAVICON, ERROR } = require('./constants');

const isClientError = status => (status >= 400 && status < 500);
const isServerError = status => (status >= 500);

module.exports.isUrlValid = url => (url !== FAVICON);
module.exports.getNameFromUrl = url => url.slice(1);

const { REQUEST_CLIENT_ERROR, REQUEST_SERVER_ERROR } = ERROR;

module.exports.getResponseErrorMessage = function(status) {
  let errorMessage;

  if (isClientError(status)) {
    errorMessage = REQUEST_CLIENT_ERROR;
  }

  if (isServerError(status)) {
    errorMessage = REQUEST_SERVER_ERROR;
  }

  return errorMessage;
}