const STATUS = {
    TODO: 'to do',
    IN_PROGRESS: 'in progress',
    DONE: 'done'
};

const PRIORITY = {
    LOW: 'low',
    HIGH: 'high'
};

const TASK_LENGTH = {
    MIN: 3,
    MAX: 30
}

const ERROR = {
    INVALID_TASK: `Invalid task format: only strings between ${TASK_LENGTH.MIN} and ${TASK_LENGTH.MAX} characters are allowed.`,
    INVALID_STATUS: `Incorrect status: you can use only '${STATUS.TODO}', '${STATUS.IN_PROGRESS}' and '${STATUS.DONE}'.`,
    INVALID_PRIORITY: `Incorrect priority: you can use only '${PRIORITY.LOW}' or '${PRIORITY.HIGH}'.`,
    TASK_EXIST: "Task you want to add is already in list.",
    TASK_NOT_FOUND: "Task wasn't found in list.",
};

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
    if (Number.isInteger(pos) && 0 < pos && pos <= toDo.list.length) { 
        return true;
    };
}

const isTaskExist = (taskName) => {
    if (toDo.list.find(taskObject => taskObject.task === taskName)) {
        return true;
    };
};

const isTaskUnique = (taskName) => {
    return (!isTaskExist(taskName));
};

function getTaskObject(task, status, priority) {
    const taskObject = {};
    taskObject['task'] = task;
    taskObject['status'] = status;
    taskObject['priority'] = priority;

    return taskObject;
}

function findTaskByName(taskName) {
    return toDo.list.find((taskObject) => taskObject.task === taskName);
}

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

function showAllTasksWith(status) {
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
        try {
            checkValidity(isTaskValid, task);
            checkValidity(isStatusValid, status);
            checkValidity(isPriorityValid, priority);
            checkValidity(isTaskUnique, task);
        } catch (error) {
            console.error(error.message);
        };

        const taskObject = getTaskObject(task, status, priority);
        this.list.push(taskObject);
    },
    changeStatus(task, status) {
        try { 
            checkValidity(isTaskExist, task);
            checkValidity(isStatusValid, status);
        } catch (error) {
            return console.error(error.message);
        };
        
        const foundedTask = findTaskByName(task);
        foundedTask.status = status;
    },
    changePriority(task, priority) {
        try { 
            checkValidity(isTaskExist, task);
            checkValidity(isPriorityValid, priority);
        } catch (error) {
            return console.error(error.message);
        };

        const foundedTask = findTaskByName(task);
        foundedTask.priority = priority;
    },
    delete(taskPos = 'end') {
        switch (taskPos) {
            case 'end':
                this.list.pop();
                return;
            case 'start':
                this.list.shift();
                return;
        };

        try {
            if (isPositionValid(taskPos)) {
                this.list.splice(--taskPos, 1);

            } else if (isTaskExist(taskPos)) {
                const taskIndex = this.list.indexOf(taskPos);
                this.list.splice(taskIndex, 1);

            } else {
                throw new Error(ERROR.TASK_NOT_FOUND);
            };
        } catch (error) {
            console.error(error.message);
        };
    },
    showList() {
        console.log('To do:');
            showAllTasksWith(STATUS.TODO);
        console.log('In progress:');
            showAllTasksWith(STATUS.IN_PROGRESS);
        console.log('Done:');
            showAllTasksWith(STATUS.DONE);
    }
};