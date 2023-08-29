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
    return (Number.isInteger(pos) && 0 < pos && pos <= toDo.list.length) ? true : false;
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
    const taskObject = {};
    taskObject['task'] = task;
    taskObject['status'] = status;
    taskObject['priority'] = priority;

    return taskObject;
}

function findTaskByName(taskName) {
    return toDo.list.find((taskObject) => taskObject.task === taskName);
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

        const foundedTask = findTaskByName(task);
        foundedTask.status = status;
    },
    changePriority(task, priority) {
        if (validationIsFailed(isTaskExist, task)
        || validationIsFailed(isPriorityValid, priority))
        { return };

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

        if (isPositionValid(taskPos)) {
            this.list.splice(--taskPos, 1);

        } else if (isTaskExist(taskPos)) {
            this.list.splice(this.list.indexOf(taskPos), 1);

        } else {
            return console.error(ERROR.TASK_NOT_FOUND);
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

// ˭̡̞(◞˃ᆺ˂)◞ ₎₎=͟͟͞͞˳˚॰°ₒ৹⋆｡°.˚✩•₊⋆  ~~~TESTING!~~~  ⋆｡°✩ ₊.°.⋆•˚₊⋆.
toDo.add('foo');
// ✓ success
toDo.add('foo');
// ✗ error [task exist]
toDo.add();
// ✗ error [invalid task]
toDo.add('bar', 'mitzvah');
// ✗ error [invalid status]
toDo.add('bar', STATUS.DONE, 'OLEG');
// ✗ error [invalid priority]
toDo.add('bar', STATUS.DONE, PRIORITY.HIGH);
// ✓ success
toDo.showList();

toDo.changeStatus('find Grigory');
// ✗ error [task not found]
toDo.changeStatus('foo', 'bar');
// ✗ error [invalid status]
toDo.changeStatus('foo', STATUS.IN_PROGRESS);
// ✓ success
toDo.showList();

toDo.changePriority();
// ✗ error [task not found]
toDo.changePriority('foo', 'bar');
// ✗ error [invalid priority]
toDo.changePriority('foo', PRIORITY.HIGH);
// ✓ success
toDo.showList();

toDo.delete();
// ✓ successfully delete the last task
toDo.delete('start');
toDo.delete(1);
// ✓ successfully delete the first task
//   (with two different ways)
toDo.delete('foo');
// ✓ successfully delete the task by its name
toDo.showList();