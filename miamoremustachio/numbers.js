// The most used Math methods:
const randomExample = Math.random(); // returns random number between 0 and 1
console.log(randomExample); // ?

const minExample = Math.min(true, 5); // returns minimal number
console.log(minExample); // 1

const maxExample = Math.max(1, '5'); // returns maximum number
console.log(maxExample); // 5

const exponentiationExample = Math.pow('hehe', null); // returns the number raised to the power
console.log(exponentiationExample); // 1                (equivalent to ** operator)


// rounding methods:
// ↓↓↓ floor ↓↓↓
console.log( Math.floor(2.1) ); // 2
console.log( Math.floor(2.9) ); // 2

// ↑↑↑ ceil ↑↑↑
console.log( Math.ceil(2.1) ); // 3
console.log( Math.ceil(2.9) ); // 3

// ◯ circle ◯ 
console.log( Math.round(2.5) ); // 3
console.log( Math.round(2.4) ); // 2
// BUT:
console.log( Math.round(-2.5) ); // -2
console.log( Math.round(-2.51) ); // -3

// ✁ trunc ✃
console.log( Math.trunc(-2.345) ); // -2
console.log( Math.trunc(0.1) ); // 0


// toFixed:
const num = 1.58;
console.log( num.toFixed() ); // '2'
console.log( num.toFixed(1) ); // '1.6'
console.log( num.toFixed(5) ); // '1.58000'
// always returns STRING!
console.log( (1.35).toFixed(1) ); // '1.4'
console.log( (6.35).toFixed(1) ); // '6.3'


// isNaN:
console.log( isNaN('Oleg') ); // true
console.log( isNaN('') ); // false
console.log( NaN === NaN ); // false (NaN is never equal to itself)

// isFinite:
console.log( isFinite(true) ); // true
console.log( isFinite('true') ); // false
console.log( isFinite(Infinity) ); // false

// for checking without conversion:
console.log( Number.isNaN('NaN') ); // false
console.log( Number.isFinite('42') ); // false


// → parseInt ←
console.log( parseInt('1.2.3') ); // 1
console.log( parseInt('0001') ); // 1

// 〜 parseFloat 〜
console.log( parseFloat('1.2.3')); // 1.2
console.log( parseFloat('1,2,3') ); // 1


// short form for zeros:
console.log( 1e3 ); // 1000
console.log( 1.2e3 ); // 1200
console.log( 1e000 ); // 1