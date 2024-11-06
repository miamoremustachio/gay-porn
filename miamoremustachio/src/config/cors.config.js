const { HOST } = require('./server.config');

const ALLOWED_ORIGINS = HOST;

const ALLOWED_HEADERS = [
  'Content-Type',
  'Authorization',
];

module.exports = {
  ALLOWED_ORIGINS,
  ALLOWED_HEADERS,
};
