const { client } = require('./client.js');

async function connectDatabase() {
  await client.connect();
  console.log('Database has successfully connected ✓');
}

module.exports = { connectDatabase };