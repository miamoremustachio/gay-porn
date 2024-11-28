const mongoose = require('mongoose');

async function connectDatabase() {
  const url = process.env.DATABASE_URL;
  
  await mongoose.connect(url);
  console.log('Database has successfully connected ✓');
}

module.exports = { connectDatabase };