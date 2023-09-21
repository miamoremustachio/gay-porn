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

function getToDoList(amountOfTasks) {
    try {
        if (!isNumberValid(amountOfTasks)) {
            throw new Error('Error: task number is invalid.');
        };

        const promises = [];

        for (let i = 1; i <= amountOfTasks; i++) {
            promises.push(requestTask(i));
        };

        Promise.all(promises)
            .then(values => { showList(values) });

    } catch(error) {
        console.error(error.message);
    };
}

getToDoList(10);