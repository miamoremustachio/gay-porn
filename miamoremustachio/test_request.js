function requestTask(taskNumber) {
    return fetch(`https://jsonplaceholder.typicode.com/todos/${taskNumber}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`${response.status}: ${response.statusText}`);
            };

            return response.json();
        })
        .then(data => data);
}

function showToDoList(amountOfTasks) {
    try {
        if (!isFinite(amountOfTasks) || amountOfTasks <= 0) {
            throw new Error('Error: task number is invalid.');
        };

        const promises = [];

        for (let i = 1; i <= amountOfTasks; i++) {
            promises.push(requestTask(i));
        };

        Promise.all(promises)
            .then(values => {
                for (const task of values) {
                    const checkmark = (task.completed) ? '✓' : '◯';
                    console.log(`${task.id}. ${task.title} ${checkmark}`);
                };
            });

    } catch(error) {
        console.error(error.message);
    };
}

showToDoList(10);