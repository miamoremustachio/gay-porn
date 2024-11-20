const { getReasonPhrase } = require('http-status-codes');

function DefaultResponse(statusCode) {
  this.message = getReasonPhrase(statusCode);
  this.statusCode = statusCode;
}

module.exports = { DefaultResponse };
