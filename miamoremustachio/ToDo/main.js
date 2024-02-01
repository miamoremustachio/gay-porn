const { connectDatabase } = require('./modules/database/connection.js');
const { app } = require('./app.js');
const { PORT } = require('./config/app-config.js');

connectDatabase()
  .then(() => app.listen(PORT))
  .then(() => console.log(`Server is listening on port ${PORT}`))
  .catch(error => console.error(error));