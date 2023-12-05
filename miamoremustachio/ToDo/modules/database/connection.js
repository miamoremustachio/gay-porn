const { DATABASE_URL } = require('../../config/app-config.js');

const mongoose = require('mongoose');

async function connectDatabase() {
  await mongoose.connect(DATABASE_URL);
  console.log('Database has successfully connected ✓');
}

module.exports = { connectDatabase };