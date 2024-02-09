const mongoose = require('mongoose');

const { ClientError } = require('../errors/client-error.js');

const errorHandler = (error, req, res, next) => {
  let status;

  if (error instanceof ClientError || error instanceof SyntaxError) {
    status = error.status || 400;
  
  } else if (error instanceof mongoose.Error.ValidationError) {
    status = 400;

  } else {
    status = 500;
  }

  res.status(status).send(error.message);
  return;
}

module.exports = { errorHandler };