const {
    isNumberValid,
    requestTask,
    showList,
    showError,
} = require('./modules');

function getToDoList(amountOfTasks) {
    try {
        if (!isNumberValid(amountOfTasks)) {
            throw new Error('Invalid argument.');
        };

        const promises = [];

        for (let i = 1; i <= amountOfTasks; i++) {
            promises.push(requestTask(i));
        };

        Promise.all(promises)
            .then(values => { showList(values) });

    } catch(err) {
        showError(err);
    };
}

// testing:
getToDoList(); // [invalid argument]
getToDoList(0); // [invalid argument]
getToDoList(-1); // [invalid argument]
getToDoList('Oleg'); // [invalid argument]
getToDoList(10); // YAY!