const {
    STATUS,
    PRIORITY,
    ERROR,
} = require('./constants.js');

function Task(title) {
    this.title = title;
    this.status = STATUS.TODO;
    this.priority = PRIORITY.LOW;
    this.creationTime = new Date();
    this.completionTime;
    this.setStatus = function(status) { this.status = status };
    this.setPriority = function(priority) { this.priority = priority };
}

function Logger() {
    this.resultsHistory = [];
    this.start = function() {
        this.lastStartTime = new Date();
        this.lastEndTime = undefined;
    };
    this.end = function() {
        this.lastEndTime = new Date();
        this.lastResult = (this.lastEndTime - this.lastStartTime);

        this.resultsHistory.push(this.lastResult);
        const executionNumber = this.resultsHistory.length;
        console.log(`${executionNumber}: Code execution time was ${this.lastResult} ms.`);
    };
    this.showResults = function() {
        if (this.lastResult === undefined) {
            return console.error(ERROR.LOGGER_NOT_ENDED);
        };

        const results = this.resultsHistory.join(', ');
        const resultsAmount = this.resultsHistory.length;
        const resultsSum = this.resultsHistory.reduce((sum, currentResult) => sum + currentResult);
        const averageTime = resultsSum / resultsAmount;

        console.log(`Logger was started ${resultsAmount} time(s) with those results:`);
        console.log(`${results} ms.`);
        console.log(`(average code execution time is ${averageTime} ms)`);
    };
}

function findTask(title, taskList) {
    return taskList.find(task => task.title === title);
}

function showAddMessage(task) {
    console.log(`✓ "${task.title}" has successfully added to the list.`);
}

function showChangeStatusMessage(task) {
    console.log(`✓ "${task.title}" is ${task.status}.`);

    if (task.status === STATUS.DONE) {
        task.completionTime = new Date();
        const timestamp = (task.completionTime - task.creationTime);

        console.log(`  Task was completed in ${getSplittedTimeString(timestamp)}`);
    };
}

function showChangePriorityMessage(task) {
    console.log(`✓ Priority of "${task.title}" is ${task.priority}.`);
}

function showDeleteMessage(task) {
    switch (typeof task) {
        case 'number':
            return console.log(`Task number ${task} has successfully deleted.`);
        case 'string':
            return console.log(`"${task}" has successfully deleted.`);
    };
}

function showAllTasksWith(status, taskList) {
    const sortedList = taskList.filter(task => task.status === status);

    if (!sortedList.length) { return console.log('\t-') };

    let checkMark;
    switch (status) {
        case STATUS.TODO:
            checkMark = '◯';
            break;
        case STATUS.IN_PROGRESS:
            checkMark = '◕';
            break;
        case STATUS.DONE:
            checkMark = '⬤';
    };

    sortedList.forEach(task => {
        console.log(`\t${checkMark}  ${task.title} (priority: ${task.priority})`);
    });
}

function getSplittedTimeString(milliseconds) {
    const seconds = Math.trunc(milliseconds / 1000);
    const minutes = Math.trunc(seconds / 60);
    const hours = Math.trunc(minutes / 60);
    const days = Math.trunc(hours / 24);

    if (days) {
        return `${days} days and ${hours} hours.`;
    
    } else if (hours) {
        return `${hours} hours and ${minutes} min.`;

    } else if (minutes) {
        return `${minutes} min and ${seconds} sec.`;

    } else if (seconds) {
        return `${seconds} sec and ${milliseconds} ms.`;
    } else {
        return `${milliseconds} ms.`;
    };
}

module.exports = {
    Task,
    Logger,
    findTask,
    showAddMessage,
    showChangeStatusMessage,
    showChangePriorityMessage,
    showDeleteMessage,
    showAllTasksWith,
};