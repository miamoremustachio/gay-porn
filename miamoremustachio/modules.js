const ERROR = {
    INVALID_OPERATION: "Invalid operator: use showOperationsList() to see the list of available operators.",
    INVALID_NUMBER: "Invalid argument: only finite numbers are allowed.",
};

const OPERATION = {
    ADD: 'add',
    SUBTRACT: 'subtract',
    MULTIPLY: 'multiply',
    DIVIDE: 'divide',
    RAISE: 'raise',
    FIND_AVERAGE: 'find average value',
};

function checkOperationValidity(operation) {
    const availableOperations = Object.values(OPERATION);
    const operationNotFound = !availableOperations.includes(operation);

    if (operationNotFound) {
        throw new Error(ERROR.INVALID_OPERATION);
    };
}

function checkNumbersValidity(numbers) {
    for (const num of numbers) {
        if (!isFinite(num)) {
            throw new Error(ERROR.INVALID_NUMBER);
        };
    };
}

function showOperationsList() {
    console.log("Available operations:");
    for (const operation in OPERATION) {
        console.log(`* ${operation}`);
    };
}

function getResult(operation, a, b) {
    switch (operation) {
        case OPERATION.ADD:
        case OPERATION.FIND_AVERAGE:
            return (a + b);
        case OPERATION.SUBTRACT:
            return (a - b);
        case OPERATION.MULTIPLY:
            return (a * b);
        case OPERATION.DIVIDE:
            return (a / b);
        case OPERATION.RAISE:
            return (a ** b);
    };
}

module.exports = {
    OPERATION,
    checkOperationValidity,
    checkNumbersValidity,
    showOperationsList,
    getResult,
};