const {
    STATUS,
    PRIORITY,
    TASK_LENGTH,
    ERROR,
} = require('./constants.js');

const isTitleValid = (title) => {
    if (typeof title === 'string'
        && title.length >= TASK_LENGTH.MIN
        && title.length <= TASK_LENGTH.MAX) {
        return true;
    } else {
        return false;
    };
}

const isStatusValid = (status) => {
    switch (status) {
        case STATUS.TODO:
        case STATUS.IN_PROGRESS:
        case STATUS.DONE:
            return true;
        default:
            return false;
    };
}

const isPriorityValid = (priority) => {
    switch (priority) {
        case PRIORITY.LOW:
        case PRIORITY.HIGH:
            return true;
        default:
            return false;
    };
}

const isTaskExist = (title, taskList) => {
    return (taskList.find(task => task.title === title)) ? true : false;
}

const isTaskUnique = (title, taskList) => {
    return (!isTaskExist(title, taskList));
}

const isPosition = (arg, taskList) => {
    return (Number.isInteger(arg) && 0 < arg && arg <= taskList.length) ? true : false;
}

function checkValidity(checkingFunction, checkingValue, list) {
    const validationResultIsOk = checkingFunction(checkingValue, list);

    if (validationResultIsOk) { return };

    switch (checkingFunction) {
        case isTitleValid:
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
    isTitleValid,
    isStatusValid,
    isPriorityValid,
    isTaskExist,
    isTaskUnique,
    isPosition,
    checkValidity
};