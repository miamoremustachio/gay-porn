const {
    fillArrayWithPromises,
} = require('./modules/requests.js');

const {
    isNumberValid,
    showList,
    showError,
} = require('./modules/extra.js');

async function getToDoList(amountOfTasks) {
    try {
        if (!isNumberValid(amountOfTasks)) {
            throw new Error('Invalid argument.');
        }

        const promises = [];

        fillArrayWithPromises(promises, amountOfTasks);

        const tasks = await Promise.all(promises);

        showList(tasks);

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