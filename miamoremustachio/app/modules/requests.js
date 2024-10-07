const { SERVER_URL } = require('./constants');
const { getResponseErrorMessage } = require('./helpers');

module.exports.requestName = function(name) {
  return fetch(`${SERVER_URL}?name=${name}`)
    .then(response => {
      if (!response.ok) {
        const errorMessage = getResponseErrorMessage(response.status);
        throw new Error(errorMessage);
      }

      return response.json();
    });
}