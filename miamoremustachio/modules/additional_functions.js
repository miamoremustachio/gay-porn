function findTask(title, taskList) {
    return taskList.find(task => task.title === title);
}

function showAllTasksWith(status, taskList) {
    const sortedList = taskList.filter(task => task.status === status);

    if (!sortedList.length) { return console.log('-') };

    sortedList.forEach(task => {
        console.log(`\t${task.title} (priority: ${task.priority})`);
    });
}

module.exports = {
    findTask,
    showAllTasksWith
};