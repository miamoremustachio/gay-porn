const {
    STATUS,
    PRIORITY,
    TASK_LENGTH,
    ERROR,
} = require('./constants.js');

const isTitleValid = (task) => {
    if (typeof task === 'string'
        && task.length >= TASK_LENGTH.MIN
        && task.length <= TASK_LENGTH.MAX) {
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

const isPositionValid = (pos, taskList) => {
    return (Number.isInteger(pos) && 0 < pos && pos <= taskList.length) ? true : false;
}

const isTaskExist = (title, taskList) => {
    return (taskList.find(taskObject => taskObject.task === title)) ? true : false;
}

const isTaskUnique = (title, taskList) => {
    return (!isTaskExist(title, taskList));
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
    isPositionValid,
    isTaskExist,
    isTaskUnique,
    checkValidity
};