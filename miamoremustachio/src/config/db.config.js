require('dotenv').config();

const DATABASE_URI = process.env.DATABASE_URI;

const DATABASES = {
  TODO: 'todo',
};

module.exports = {
  DATABASE_URI,
  DATABASES,
};
