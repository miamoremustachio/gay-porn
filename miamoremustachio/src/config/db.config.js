require('dotenv').config();

const DATABASE_URI = process.env.DATABASE_URI;

const DATABASES = {
  TODO: 'todo',
};

const COLLECTIONS = {
  TASKS: 'tasks',
};

module.exports = {
  DATABASE_URI,
  DATABASES,
  COLLECTIONS,
};
