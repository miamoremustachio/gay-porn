const { SERVER_URL, ERROR } = require('./constants');
const { stdin: input, stdout: output } = require('process');

module.exports.readline = require('readline').createInterface({ input, output });

const isClientError = (status) => (status >= 400 && status < 500);
const isServerError = (status) => (status >= 500);

const { REQUEST_CLIENT_ERROR, REQUEST_SERVER_ERROR } = ERROR;

const getResponseErrorMessage = function(status) {
  let errorMessage;

  if (isClientError(status)) {
    errorMessage = REQUEST_CLIENT_ERROR;
  }

  if (isServerError(status)) {
    errorMessage = REQUEST_SERVER_ERROR;
  }

  return errorMessage;
}

module.exports.requestName = function(name) {
  return fetch(`${SERVER_URL}?name=${name}`)
    .then(response => {
      if (!response.ok) {
        const errorMessage = getResponseErrorMessage(response.status);
        throw new Error(errorMessage);
      }

      return response.json();
    })
}