const {
    STATUS,
    PRIORITY,
    ERROR
} = require('./modules/constants.js');

const {
    isTitleValid,
    isStatusValid,
    isPriorityValid,
    isPositionValid,
    isTaskExist,
    isTaskUnique,
    checkValidity
} = require('./modules/checking_functions.js');

const {
    findTaskBy,
    findTaskIndex,
    showAllTasksWith
} = require('./modules/additional_functions.js');

function Task(title, status, priority) {
    this.task = title;
    this.status = status;
    this.priority = priority;
}

const toDo = {
    list: [
        { task: 'become super-schmuper devemloper', status: STATUS.IN_PROGRESS, priority: PRIORITY.LOW },
        { task: 'watch documentary about hedgehogs', status: STATUS.TODO, priority: PRIORITY.LOW },
        { task: 'get rid of 150,346 bookmarks in Chrome', status: STATUS.TODO, priority: PRIORITY.HIGH },
    ],
    add(title, status = STATUS.TODO, priority = PRIORITY.LOW)
        {
        try {
            checkValidity(isTitleValid, title);
            checkValidity(isStatusValid, status);
            checkValidity(isPriorityValid, priority);
            checkValidity(isTaskUnique, title, this.list);
        } catch (error) {
            return console.error(error.message);
        };

        const taskObject = new Task(title, status, priority);
        this.list.push(taskObject);
    },
    changeStatus(title, status) {
        try {
            checkValidity(isTaskExist, title, this.list);
            checkValidity(isStatusValid, status);
        } catch (error) {
            return console.error(error.message);
        };
        
        const foundedTask = findTaskBy(title, this.list);
        foundedTask.status = status;
    },
    changePriority(title, priority) {
        try { 
            checkValidity(isTaskExist, title, this.list);
            checkValidity(isPriorityValid, priority);
        } catch (error) {
            return console.error(error.message);
        };

        const foundedTask = findTaskBy(title, this.list);
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
            if (isPositionValid(taskPos, this.list)) {
                this.list.splice(--taskPos, 1);

            } else if (isTaskExist(taskPos, this.list)) {
                const taskIndex = findTaskIndex(taskPos, this.list);
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
            showAllTasksWith(STATUS.TODO, this.list);
        console.log('In progress:');
            showAllTasksWith(STATUS.IN_PROGRESS, this.list);
        console.log('Done:');
            showAllTasksWith(STATUS.DONE, this.list);
    }
};

//testing:
toDo.add(); // [invalid task]
toDo.add('foo', 'bar'); // [incorrect status]
toDo.add('foo', STATUS.TODO, 123); // [incorrect priority]
toDo.add('foo'); // YAY!
toDo.add('foo'); // [task exist]
toDo.showList();


toDo.changeStatus(); // [task not found]
toDo.changeStatus('foo', undefined); // [incorrect status]
toDo.changeStatus('foo', STATUS.DONE); // YAY!!
toDo.showList();

toDo.changePriority(null); // [task not found]
toDo.changePriority('foo', NaN); // [incorrect priority]
toDo.changePriority('foo', PRIORITY.HIGH); // YAY!!!
toDo.showList();

toDo.delete(); // delete last task
toDo.delete('start'); // delete first task
toDo.delete(1); // delete first task again
toDo.delete('bar'); // [task not found]
toDo.delete('get rid of 150,346 bookmarks in Chrome');
toDo.showList(); // e m p t y . . .