const { PORT } = require('./config/server.config');
const app = require('./app');

const appName = app.get('name');

app.listen(PORT, () => {
  console.log(`🐎💨 The ${appName} is running on port ${PORT}.`);
});
