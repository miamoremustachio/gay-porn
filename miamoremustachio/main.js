const {
    STATUS,
    PRIORITY,
    ERROR
} = require('./modules/constants.js');

const {
    isTitleValid,
    isStatusValid,
    isPriorityValid,
    isPosition,
    isTaskExist,
    isTaskUnique,
    checkValidity
} = require('./modules/checking_functions.js');

const {
    findTask,
    showAllTasksWith
} = require('./modules/additional_functions.js');

function Task(title) {
    this.title = title;
    this.status = STATUS.TODO;
    this.priority = PRIORITY.LOW;
    this.setStatus = function(status) { this.status = status };
    this.setPriority = function(priority) { this.priority = priority };
}

const toDo = {
    list: [
        new Task('watch documentary about hedgehogs'),
        new Task('become super-schmuper devemloper'),
        new Task('get rid of 150,346 bookmarks in Chrome'),
    ],
    add(title, status, priority) {
        try {
            checkValidity(isTitleValid, title);
            checkValidity(isTaskUnique, title, this.list);
            if (status) { checkValidity(isStatusValid, status) };
            if (priority) { checkValidity(isPriorityValid, priority) };
        } catch (error) {
            return console.error(error.message);
        };

        const task = new Task(title);

        if (status) { task.setStatus(status) };
        if (priority) { task.setPriority(priority) };

        this.list.push(task);
    },
    changeStatus(title, status) {
        try {
            checkValidity(isTaskExist, title, this.list);
            checkValidity(isStatusValid, status);
        } catch (error) {
            return console.error(error.message);
        };
        
        const task = findTask(title, this.list);
        task.setStatus(status);
    },
    changePriority(title, priority) {
        try { 
            checkValidity(isTaskExist, title, this.list);
            checkValidity(isPriorityValid, priority);
        } catch (error) {
            return console.error(error.message);
        };

        const task = findTask(title, this.list);
        task.setPriority(priority);
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
            if (isPosition(taskPos, this.list)) {
                const taskIndex = --taskPos;
                this.list.splice(taskIndex, 1);

            } else if (isTaskExist(taskPos, this.list)) {
                const sortedList = this.list.filter(task => task.title !== taskPos);
                this.list = sortedList;

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