const { MongoClient } = require('mongodb');

const { DATABASE_URI } = require('../config/db.config');

const client = new MongoClient(DATABASE_URI);

module.exports = client;
