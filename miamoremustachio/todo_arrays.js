const STATUS = {
    TODO: 'to do',
    IN_PROGRESS: 'in progress',
    DONE: 'done'
};

const PRIORITY = {
    LOW: 'low',
    HIGH: 'high'
};

const ERROR = {
    INVALID_TASK: "Invalid task format: only strings are allowed.",
    INVALID_STATUS: `Incorrect status: you can use only '${STATUS.TODO}', '${STATUS.IN_PROGRESS}' and '${STATUS.DONE}'.`,
    INVALID_PRIORITY: `Incorrect priority: you can use only '${PRIORITY.LOW}' or '${PRIORITY.HIGH}'.`,
    TASK_EXIST: "Task you want to add is already in list.",
    TASK_NOT_FOUND: "Task wasn't found in list.",
};

const isTaskValid = (task) => typeof task === 'string' ? true : false;

const isStatusValid = (status) => {
    switch (status) {
        case STATUS.TODO:
        case STATUS.IN_PROGRESS:
        case STATUS.DONE:
            return true;
        default:
            return false;
    };
};

const isPriorityValid = (priority) => {
    switch (priority) {
        case PRIORITY.LOW:
        case PRIORITY.HIGH:
            return true;
        default:
            return false;
    };
};

const isPositionValid = (pos) => {
    return (Number.isInteger(pos) && 0 < pos && pos < toDo.list.length) ? true : false;
}

const isTaskUnique = (taskName) => {
    if (toDo.list.find(taskObject => taskObject.task === taskName)) {
        return false;
    } else {
        return true;
    };
};

const isTaskExist = (taskName) => { return (!isTaskUnique(taskName)) };

function getTaskObject(task, status, priority) {
    return { 'task': `${task}`, 'status': `${status}`, 'priority': `${priority}` }
}

function validationIsFailed(checkingFunction, checkingValue) {
    if (checkingFunction(checkingValue)) { return false };

    switch (checkingFunction) {
        case isTaskValid:
            console.error(ERROR.INVALID_TASK);
            break;
        case isStatusValid:
            console.error(ERROR.INVALID_STATUS);
            break;
        case isPriorityValid:
            console.error(ERROR.INVALID_PRIORITY);
            break;
        case isTaskUnique:
            console.error(ERROR.TASK_EXIST);
            break;
        case isTaskExist:
            console.error(ERROR.TASK_NOT_FOUND);
            break;
    };

    return true;
}

function showAllTaskWith(status) {
    const sortedList = toDo.list.filter(taskObject => taskObject.status === status);

    if (!sortedList.length) { return console.log('-') };

    sortedList.forEach(taskObject => {
        console.log(`\t${taskObject.task} (priority: ${taskObject.priority})`);
    });
}


const toDo = {
    list: [
        { task: 'become super-schmuper devemloper', status: STATUS.IN_PROGRESS, priority: PRIORITY.LOW },
        { task: 'watch documentary about hedgehogs', status: STATUS.TODO, priority: PRIORITY.LOW },
        { task: 'get rid of 150,346 bookmarks in Chrome', status: STATUS.TODO, priority: PRIORITY.HIGH },
    ],
    add(task, status = STATUS.TODO, priority = PRIORITY.LOW) {
        if (validationIsFailed(isTaskValid, task)
        || validationIsFailed(isStatusValid, status)
        || validationIsFailed(isPriorityValid, priority)
        || validationIsFailed(isTaskUnique, task)) 
        { return };

        const taskObject = getTaskObject(task, status, priority);
        this.list.push(taskObject);
    },
    changeStatus(task, status) {
        if (validationIsFailed(isTaskExist, task)
        || validationIsFailed(isStatusValid, status))
        { return };

        const foundedTask = toDo.list.find((taskObject) => taskObject.task === task);
        foundedTask.status = status;
    },
    changePriority(task, priority) {
        if (validationIsFailed(isTaskExist, task)
        || validationIsFailed(isPriorityValid, priority))
        { return };

        const foundedTask = toDo.list.find((taskObject) => taskObject.task === task);
        foundedTask.priority = priority;
    },
    delete(taskPos = 'end') {
        switch (taskPos) {
            case 'end':
                toDo.list.pop();
                return;
            case 'start':
                toDo.list.shift();
                return;
        };

        if (isPositionValid(taskPos)) {
            toDo.list.splice(--taskPos, 1);

        } else if (isTaskExist(taskPos)) {
            toDo.list.splice(toDo.list.indexOf(taskPos), 1);

        } else {
            return console.error(ERROR.TASK_NOT_FOUND);
        };
    },
    showList() {
        console.log('To do:');
            showAllTaskWith(STATUS.TODO);
        console.log('In progress:');
            showAllTaskWith(STATUS.IN_PROGRESS);
        console.log('Done:');
            showAllTaskWith(STATUS.DONE);
    }
};