const {
    TASKS,
    STATUS,
    PRIORITY,
    ERROR
} = require('./modules/constants.js');

const {
    isTaskValid,
    isStatusValid,
    isPriorityValid,
    isPositionValid,
    isTaskExist,
    isTaskUnique,
    checkValidity
} = require('./modules/checking_functions.js');

const {
    findTaskByName,
    showAllTasksWith
} = require('./modules/additional_functions.js');

function Task(title, status, priority) {
    this.task = title;
    this.status = status;
    this.priority = priority;
}

const toDo = {
    list: TASKS,
    add(title, status = STATUS.TODO, priority = PRIORITY.LOW) {
        try {
            checkValidity(isTaskValid, title);
            checkValidity(isStatusValid, status);
            checkValidity(isPriorityValid, priority);
            checkValidity(isTaskUnique, title);
        } catch (error) {
            return console.error(error.message);
        };

        const taskObject = new Task(title, status, priority);
        this.list.push(taskObject);
    },
    changeStatus(title, status) {
        try { 
            checkValidity(isTaskExist, title);
            checkValidity(isStatusValid, status);
        } catch (error) {
            return console.error(error.message);
        };
        
        const foundedTask = findTaskByName(title);
        foundedTask.status = status;
    },
    changePriority(title, priority) {
        try { 
            checkValidity(isTaskExist, title);
            checkValidity(isPriorityValid, priority);
        } catch (error) {
            return console.error(error.message);
        };

        const foundedTask = findTaskByName(title);
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
                const taskIndex = this.list.findIndex(task => task.title === taskPos);
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