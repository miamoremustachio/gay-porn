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
    getTaskObject,
    findTaskByName,
    showAllTasksWith
} = require('./modules/additional_functions.js');


const toDo = {
    list: TASKS,
    add(task, status = STATUS.TODO, priority = PRIORITY.LOW) {
        try {
            checkValidity(isTaskValid, task);
            checkValidity(isStatusValid, status);
            checkValidity(isPriorityValid, priority);
            checkValidity(isTaskUnique, task);
        } catch (error) {
            return console.error(error.message);
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
                const taskIndex = this.list.findIndex(task => task.task === taskPos);
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