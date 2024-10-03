const { calc } = require('../app/main');

const { OPERATIONS, ERRORS } = require('../app/modules/constants');

const { ADD, SUBTRACT, MULTI } = OPERATIONS;
const { INVALID_OPERATION, INVALID_OPERAND } = ERRORS;

describe('operations', () => {
  test('valid', () => {
    let result1;
    let result2;
    let result3;
    
    try {
      result1 = calc(ADD, 1, 2);
      result2 = calc(SUBTRACT, 1, 2);
      result3 = calc(MULTI, 1, 2);
    
    } catch (err) {        
      console.error(err.message);
    } 
      
    expect(result1).toBe(1 + 2);
    expect(result2).toBe(1 - 2);
    expect(result3).toBe(1 * 2);
  });

  test('invalid', () => {
    let result1;
    let errorMessage1;
    
    try {
      result1 = calc('foo', 1, 2);
      
    } catch(err) {
      console.error(err.message);
      errorMessage1 = err.message;
    }
    
    expect(result1).toBeUndefined();
    expect(errorMessage1).toBe(INVALID_OPERATION);
  });
});

describe('operands', () => {
  test('valid', () => {
    let result1;
    let result2;
    let result3;
    
    try {
      result1 = calc(ADD, 1, 2);
      result2 = calc(SUBTRACT, 1, 2);
      result3 = calc(MULTI, 1, 2);
    
    } catch (err) {        
      console.error(err.message);
    } 
      
    expect(result1).toBe(1 + 2);
    expect(result2).toBe(1 - 2);
    expect(result3).toBe(1 * 2);
  });

  test('invalid', () => {
    let result1;
    let result2;
    let result3;
    let result4;

    let errorMessage1;
    let errorMessage2;
    let errorMessage3;
    let errorMessage4;
    
    try {
      result1 = calc(ADD, '1', '2');
      
    } catch (err) {
      console.error(err.message);
      errorMessage1 = err.message;
    }

    try {
      result2 = calc(ADD, NaN, undefined);
      
    } catch (err) {
      console.error(err.message);
      errorMessage2 = err.message;
    }

    try {
      result3 = calc(MULTI, 1, 'a');
      
    } catch (err) {
      console.error(err.message);
      errorMessage3 = err.message;
    }

    try {
      result4 = calc(MULTI, 1);
      
    } catch (err) {
      console.error(err.message);
      errorMessage4 = err.message;
    }

    expect(result1).toBeUndefined();
    expect(result2).toBeUndefined();
    expect(result3).toBeUndefined();
    expect(result4).toBeUndefined();
    expect(errorMessage1).toBe(INVALID_OPERAND);
    expect(errorMessage2).toBe(INVALID_OPERAND);
    expect(errorMessage3).toBe(INVALID_OPERAND);
    expect(errorMessage4).toBe(INVALID_OPERAND);
  });
});