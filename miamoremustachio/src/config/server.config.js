require('dotenv').config();

const { ReasonPhrases } = require('http-status-codes');
  
const NODE_ENV = process.env.NODE_ENV;
const HOST = process.env.HOST || 'http://localhost';
const PORT = process.env.PORT || 3000;

const HTTP_REASON_PHRASE = ReasonPhrases;

const HTTP_HEADERS = {
  LOCATION: 'Location',
};

module.exports = {
  NODE_ENV,
  HOST,
  PORT,
  HTTP_REASON_PHRASE,
  HTTP_HEADERS,
};
