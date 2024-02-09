const { isItCausedByClient } = require('../helpers/error-helper.js');

const errorHandler = (error, req, res, next) => {
  let status;

  if (isItCausedByClient(error)) {
    status = error.status || 400;
  
  } else {
    status = 500;
  }

  res.status(status).send(error.message);
}

module.exports = { errorHandler };