const { API_ENDPOINT, URL_PARAMS } = require('./config');
const { getResponseErrorMessage: getErrorMessage } = require('./helpers');

const { NAME } = URL_PARAMS;

module.exports.requestGender = function (name) {
  const url = new URL(API_ENDPOINT);

  url.searchParams.set(NAME, name);
  
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(getErrorMessage(response));
      }

      return response.json();
    });
};
