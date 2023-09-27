function findTaskBy(title, taskList) {
    return taskList.find(taskObject => taskObject.task === title);
}

function findTaskIndex(title, taskList) {
    return taskList.findIndex(taskObject => taskObject.task === title);
}

function showAllTasksWith(status, taskList) {
    const sortedList = taskList.filter(taskObject => taskObject.status === status);

    if (!sortedList.length) { return console.log('-') };

    sortedList.forEach(taskObject => {
        console.log(`\t${taskObject.task} (priority: ${taskObject.priority})`);
    });
}

module.exports = {
    findTaskBy,
    findTaskIndex,
    showAllTasksWith
};