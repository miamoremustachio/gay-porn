const { version } = require('../../package.json');

module.exports.HOST = process.env.HOST || 'localhost';
module.exports.PORT = process.env.PORT || 3000;
module.exports.API_ENDPOINT = 'https://api.genderize.io';

module.exports.URL_PARAMS = {
  NAME: 'name',
};

module.exports.INFO = {
  WELCOME: `Welcome to Genderize app ver. ${version}.<br>To check the possible gender of your name, send a POST request with the "${this.URL_PARAMS.NAME}" param.`,
};

module.exports.ERROR = {
  NAME_NOT_FOUND: 'There is no such name in the database :(',
  MISSING_NAME_PARAM: `Missing URL param "${this.URL_PARAMS.NAME}".`,
};
