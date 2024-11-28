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

// testing! ( ノ ^o^)ノ :・ﾟ*・ﾟ✧
// errors:
calc(); calc(null); calc(NaN); // [invalid operators]
calc('add', 'oleg'); // [invalid argument (oleg is not a number, he's just dude)]
calc('add', Infinity); // [invalid argument (Infinite is NoT FiNiTE - you don't say!)]

// single arguments:
calc(OPERATION.ADD, 4); // 4
calc(OPERATION.SUBTRACT, 8); // 8
calc(OPERATION.MULTIPLY, 15); // 15
calc(OPERATION.DIVIDE, 16); // 16
calc(OPERATION.RAISE, 23); // 23
calc(OPERATION.FIND_AVERAGE, 42); // 42

calc(OPERATION.ADD, 1, 2, 3); // 6
calc(OPERATION.ADD, -1, -2, -3); // -6

calc(OPERATION.SUBTRACT, 3, 2, 1); // 0
calc(OPERATION.SUBTRACT, -1, -2); // 1

calc(OPERATION.MULTIPLY, 6, 8); // 48
calc(OPERATION.MULTIPLY, -1, -2); // 2
calc(OPERATION.MULTIPLY, -1, -2, -3); // -6

calc(OPERATION.DIVIDE, 1, 3); // 0.3333333333333333
calc(OPERATION.DIVIDE, 15, -3); // -5
calc(OPERATION.DIVIDE, 8, 4, 2); // 1

calc(OPERATION.RAISE, 3, 2); // 9
calc(OPERATION.RAISE, 3, 2, 2); // 81

calc(OPERATION.FIND_AVERAGE, 1, 2, 3); // 2
calc(OPERATION.FIND_AVERAGE, -1, -2, -3); // -2