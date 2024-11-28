const { DATABASE_URL } = require('../../config/app-config.js');

const mongoose = require('mongoose');

const database = {
  async connect() {
    await mongoose.connect(DATABASE_URL);
    console.log('Database has successfully connected ✓');
  },
  async disconnect() {
    await mongoose.disconnect();
    console.log('Database disconnected ✓');
  },
}

module.exports = { database };