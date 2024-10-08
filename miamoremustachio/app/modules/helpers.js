const { SERVER_URL } = require('./constants');
const { stdin: input, stdout: output } = require('process');

module.exports.readline = require('readline').createInterface({ input, output });

const getResponseErrorMessage = (response) => `${response.status}: ${response.statusText}.`; 

module.exports.requestName = function(name) {
  return fetch(`${SERVER_URL}?name=${name}`)
    .then(response => {
      if (!response.ok) {
        const errorMessage = getResponseErrorMessage(response);
        throw new Error(errorMessage);
      }

      return response.json();
    })
}