const { PORT } = require('./config/server.config');
const client = require('./db/client');
const app = require('./app');

async function run() {
  try {
    await client.connect()
      .then(console.log('☀️  Database has successfully connected.'));
    
    const appName = app.get('name');
    
    app.listen(PORT, () => {
      console.log(`🐎💨 The ${appName} is running on port ${PORT}.`);
    });
      
  } catch (err) {
    console.error(err);
      
    await client.close()
      .then(console.log('🌙 Database disconnected.'));
  }
}

run();
