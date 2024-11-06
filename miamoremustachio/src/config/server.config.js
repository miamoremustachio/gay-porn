require('dotenv').config();

const NODE_ENV = process.env.NODE_ENV;
const HOST = process.env.HOST || 'http://localhost';
const PORT = process.env.PORT || 3000;

module.exports = {
  NODE_ENV,
  HOST,
  PORT,
};
