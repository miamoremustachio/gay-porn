const { calc } = require('../app/main');

const { OPERATIONS } = require('../app/modules/constants');
const { ADD, SUBTRACT, MULTI } = OPERATIONS;

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