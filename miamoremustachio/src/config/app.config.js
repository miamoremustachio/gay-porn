const { version } = require('../../package.json');

const APP_NAME = 'ToDo app';
const APP_VERSION = version;

const WELCOME_MESSAGE = `Welcome to the ${APP_NAME} version ${APP_VERSION}.`;

module.exports = {
  APP_NAME,
  WELCOME_MESSAGE,
};
