const cors = require('cors');

const { HOST } = require('../../config/server.config');

const ALLOWED_ORIGINS = HOST;

const ALLOWED_HEADERS = [
  'Content-Type',
  'Authorization',
];

module.exports = cors({
  origin: ALLOWED_ORIGINS,
  allowedHeaders: ALLOWED_HEADERS,
  credentials: true,
});
