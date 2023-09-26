const {
    STATUS,
    PRIORITY,
    TASK_LENGTH,
    ERROR,
    TASKS
} = require('./constants.js');

const isTaskValid = (task) => {
    if (typeof task === 'string'
        && task.length >= TASK_LENGTH.MIN
        && task.length <= TASK_LENGTH.MAX)
        { return true };
}

const isStatusValid = (status) => {
    switch (status) {
        case STATUS.TODO:
        case STATUS.IN_PROGRESS:
        case STATUS.DONE:
            return true;
    };
};

const isPriorityValid = (priority) => {
    switch (priority) {
        case PRIORITY.LOW:
        case PRIORITY.HIGH:
            return true;
    };
};

const isPositionValid = (pos) => {
    if (Number.isInteger(pos) && 0 < pos && pos <= TASKS.length) { 
        return true;
    };
}

const isTaskExist = (taskName) => {
    if (TASKS.find(taskObject => taskObject.task === taskName)) {
        return true;
    };
};

const isTaskUnique = (taskName) => {
    return (!isTaskExist(taskName));
};


function checkValidity(checkingFunction, checkingValue) {
    const validationResultIsOk = checkingFunction(checkingValue);

    if (validationResultIsOk) { return false };

    switch (checkingFunction) {
        case isTaskValid:
            throw new Error(ERROR.INVALID_TASK);
        case isStatusValid:
            throw new Error(ERROR.INVALID_STATUS);
        case isPriorityValid:
            throw new Error(ERROR.INVALID_PRIORITY);
        case isTaskUnique:
            throw new Error(ERROR.TASK_EXIST);
        case isTaskExist:
            throw new Error(ERROR.TASK_NOT_FOUND);
    };
}

module.exports = {
    isTaskValid,
    isStatusValid,
    isPriorityValid,
    isPositionValid,
    isTaskExist,
    isTaskUnique,
    checkValidity
};