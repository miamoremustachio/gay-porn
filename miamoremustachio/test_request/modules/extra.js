function isNumberValid(number) {
    return (isFinite(number) && number > 0) ? true : false;
}

function showList(tasksArray, taskIndex = 0) {
    if (taskIndex === tasksArray.length) {
        return;
    }

    const task = tasksArray[taskIndex];
    const checkmark = (task.completed) ? '✓' : '◯';

    console.log(`${task.id}. ${task.title} ${checkmark}`);

    showList(tasksArray, taskIndex + 1);
}

function showError(error) {
    console.log(`${error.name}: ${error.message}`);
}

module.exports = {
    isNumberValid,
    showList,
    showError,
};