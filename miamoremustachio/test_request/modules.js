function isNumberValid(number) {
    return (isFinite(number) && number > 0) ? true : false;
}

function requestTask(taskNumber) {
    return fetch(`https://jsonplaceholder.typicode.com/todos/${taskNumber}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`${response.status}: ${response.statusText}`);
            };

            return response.json();
        })
}

function showList(taskObject) {
    for (const task of taskObject) {
        const checkmark = (task.completed) ? '✓' : '◯';
        console.log(`${task.id}. ${task.title} ${checkmark}`);
    };
}

function showError(error) {
    console.log(`${error.name}: ${error.message}`);
}

module.exports = {
    isNumberValid,
    requestTask,
    showList,
    showError,
};