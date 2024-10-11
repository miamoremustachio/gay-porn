const { MongoClient } = require('mongodb');

const url = process.env.DATABASE_URL;
const client = new MongoClient(url);

module.exports = { client };