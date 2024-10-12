const { SERVER_URL } = require('./constants');
const { getResponseErrorMessage: getErrorMessage } = require('./helpers');

module.exports.requestName = function(name) {
  return fetch(`${SERVER_URL}?name=${name}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(getErrorMessage(response));
      }

      return response.json();
    });
}