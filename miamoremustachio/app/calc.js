const ADD = 'add';
const SUBTRACT = 'subtract';
const MULTI = 'multi';

const INVALID_OPERATION = 'Error: Invalid operation.';
const INVALID_OPERAND = 'Error: Invalid operand.';

function isOperandValid(operand) {
  return Number.isFinite(operand);
}

function validate(a, b) {
  if (isOperandValid(a) && isOperandValid(b)) {
    return true;
  
  } else {
    return console.error(INVALID_OPERAND);
  }
}

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;

function calc(operation, a, b) {
  const validationPassed = validate(a, b);
  
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

// tests:
console.log( calc(ADD, 1, 2) ); // ✓
console.log( calc(SUBTRACT, 3, 4) ); // ✓
console.log( calc(MULTI, 5, 6) ); // ✓

console.log( calc(ADD, 7, 8, 9) ); // ✓ (ignores third operand)

console.log( calc('foo', 1, 2) ); // ✘
console.log( calc('foo', 'bar', 'baz') ); // ✘
console.log( calc(ADD, '1', '2') ); // ✘
console.log( calc(ADD, 'bar', 'baz') ); // ✘
console.log( calc(ADD, NaN, undefined) ); // ✘
console.log( calc(MULTI, 1, 'a') ); // ✘
console.log( calc(MULTI, 1) ); // ✘