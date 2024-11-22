const { PORT } = require('./config/server.config');
const db = require('./db/todo.db');
const app = require('./app');

async function run() {
  try {
    await db.connect()
      .then(console.log('☀️  Database has successfully connected.'));

    const appName = app.get('name');
    
    app.listen(PORT, () => {
      console.log(`🐎💨 The ${appName} is running on port ${PORT}.`);
    });

  } catch (err) {
    console.error(err);
      
    await db.disconnect()
      .then(console.log('🌙 Database disconnected.'));
  }
}

run();
