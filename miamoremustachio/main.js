const {
    STATUS,
    PRIORITY,
    ERROR,
} = require('./modules/constants.js');

const {
    isTitleValid,
    isStatusValid,
    isPriorityValid,
    isPosition,
    isTaskExist,
    isTaskUnique,
    checkValidity,
} = require('./modules/checking_functions.js');

const {
    Task,
    Logger,
    findTask,
    showAddMessage,
    showChangeStatusMessage,
    showChangePriorityMessage,
    showDeleteMessage,
    showAllTasksWith,
} = require('./modules/additional_functions.js');

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
        showAddMessage(task);
    },
    changeStatus(title, status = STATUS.DONE) {
        try {
            checkValidity(isTaskExist, title, this.list);
            checkValidity(isStatusValid, status);
        } catch (error) {
            return console.error(error.message);
        };
        
        const task = findTask(title, this.list);
        task.setStatus(status);
        showChangeStatusMessage(task);
    },
    changePriority(title, priority = PRIORITY.HIGH) {
        try {
            checkValidity(isTaskExist, title, this.list);
            checkValidity(isPriorityValid, priority);
        } catch (error) {
            return console.error(error.message);
        };

        const task = findTask(title, this.list);
        task.setPriority(priority);
        showChangePriorityMessage(task);
    },
    delete(taskPos = 'end') {
        switch (taskPos) {
            case 'end':
                this.list.pop();
                return console.log(`Last task has successfully deleted.`);
            case 'start':
                this.list.shift();
                return console.log(`First task has successfully deleted.`);
        };

        try {
            if (isPosition(taskPos, this.list)) {
                const taskIndex = taskPos - 1;
                this.list.splice(taskIndex, 1);

            } else if (isTaskExist(taskPos, this.list)) {
                const sortedList = this.list.filter(task => task.title !== taskPos);
                this.list = sortedList;

            } else {
                throw new Error(ERROR.TASK_NOT_FOUND);
            };
        } catch (error) {
            return console.error(error.message);
        };

        showDeleteMessage(taskPos);
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
const taskAddingLogger = new Logger();
const statusChangingLogger = new Logger();
const priorityChangingLogger = new Logger();
const taskDeletingLogger = new Logger();

while (taskAddingLogger.resultsHistory.length != 5) {
    taskAddingLogger.start();
    for (let i = 0; i < 1000; i++) {
        const randomId = Math.random().toFixed(7);
        toDo.add(`task ${i} (id: ${randomId})`);
    };
    taskAddingLogger.end();

    statusChangingLogger.start();
    for (const task of toDo.list) {
        toDo.changeStatus(task.title);
    }
    statusChangingLogger.end();

    priorityChangingLogger.start();
    for (const task of toDo.list) {
        toDo.changePriority(task.title);
    }
    priorityChangingLogger.end();

    taskDeletingLogger.start();
    for (const task of toDo.list) {
        toDo.delete(task.title);
    }
    taskDeletingLogger.end();
}

taskAddingLogger.showResults(); // 286, 144, 117, 120, 116 ms (average: 156.6 ms)
statusChangingLogger.showResults(); // 382, 209, 250, 204, 207 ms (average: 250.4 ms)
priorityChangingLogger.showResults(); // 128, 111, 107, 104, 111 ms (average: 112.2 ms)
taskDeletingLogger.showResults(); // 119, 113, 119, 110, 105 ms (average: 113.2 ms)