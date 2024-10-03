const { validateOperand } = require('./modules/helpers');
const { OPERATIONS, ERRORS } = require('./modules/constants');
const { add, subtract, multiply } = require('./modules/operations');

const { ADD, SUBTRACT, MULTI } = OPERATIONS;
const { INVALID_OPERATION } = ERRORS;

module.exports.calc = function(operation, a, b) {
  const validationPassed = validateOperand(a, b);
  
  if (!validationPassed) return;
  
  switch (operation) {
    case ADD:
      return add(a, b);
    
    case SUBTRACT:
      return subtract(a, b);

    case MULTI:
      return multiply(a, b);

    default:
      console.error(INVALID_OPERATION);
  }
}