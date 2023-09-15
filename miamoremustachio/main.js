const {
    OPERATION,
    checkOperationValidity,
    checkNumbersValidity,
    showOperationsList,
    getResult
} = require('./modules.js');

function calc(operation, ...numbers) {
    try {
        checkOperationValidity(operation);
        checkNumbersValidity(numbers);

        let result = numbers.reduce((sum, currentNumber) => {
            return getResult(operation, sum, currentNumber);
        });

        if (operation === OPERATION.FIND_AVERAGE) {
            result = result / numbers.length;
        };
    
        console.log(result);

    } catch(error) {
        console.error(error.message);
    };
}