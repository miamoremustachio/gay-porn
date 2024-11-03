const cors = require('cors');

const {
  ALLOWED_ORIGINS,
  ALLOWED_HEADERS,
} = require('../../config/cors.config');

module.exports = cors({
  origin: ALLOWED_ORIGINS,
  allowedHeaders: ALLOWED_HEADERS,
  credentials: true,
});
