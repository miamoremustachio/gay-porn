const { MongoClient } = require('mongodb');

const url = 'mongodb://127.0.0.1:27017/todo';
const client = new MongoClient(url);

module.exports = { client };