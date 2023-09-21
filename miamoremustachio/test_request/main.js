const {
    isNumberValid,
    requestTask,
    showList,
} = require('./modules');

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