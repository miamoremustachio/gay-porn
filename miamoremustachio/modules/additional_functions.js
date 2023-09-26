const {
    TASKS
} = require('./constants.js');

function findTaskByName(taskName) {
    return TASKS.find((taskObject) => taskObject.task === taskName);
}

function showAllTasksWith(status) {
    const sortedList = TASKS.filter(taskObject => taskObject.status === status);

    if (!sortedList.length) { return console.log('-') };

    sortedList.forEach(taskObject => {
        console.log(`\t${taskObject.task} (priority: ${taskObject.priority})`);
    });
}

module.exports = {
    findTaskByName,
    showAllTasksWith
};