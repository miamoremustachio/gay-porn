const { ERRORS } = require('./constants');

function isOperandValid(operand) {
  return Number.isFinite(operand);
}

module.exports.validateOperand = function(a, b) {
  if (isOperandValid(a) && isOperandValid(b)) {
    return true;
  
  } else {
    return console.error(ERRORS.INVALID_OPERAND);
  }
}