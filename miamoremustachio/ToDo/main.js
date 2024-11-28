const { database } = require('./modules/database/connection.js');
const { app } = require('./app.js');

const port = app.get('port');

database.connect()
  .then(() => app.listen(port))
  .then(() => console.log(`Server is listening on port ${port}`))
  .catch(error => console.error(error));