const { client } = require('./client.js');

async function connectDB() {
  await client.connect();
  console.log('Database has successfully connected.');
}

module.exports = { connectDB };