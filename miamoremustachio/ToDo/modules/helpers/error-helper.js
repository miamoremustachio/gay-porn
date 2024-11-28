const mongoose = require('mongoose');

const { ClientError } = require('../errors/client-error.js');
const CastError = mongoose.Error.CastError;
const ValidationError = mongoose.Error.ValidationError;

const clientSideErrors = [
  ClientError,
  SyntaxError,
  CastError,
  ValidationError,
];

function isItCausedByClient(error) {
  for (const ClientErrorClass of clientSideErrors) {
    if (error instanceof ClientErrorClass) {
      return true;
    }
  }

  return false;
}

module.exports = { isItCausedByClient };