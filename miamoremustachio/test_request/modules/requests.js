const BASE_URL = 'https://jsonplaceholder.typicode.com';

async function requestTask(taskNumber) {
    const path = `/todos/${taskNumber}`;
    const endpoint = new URL(path, BASE_URL);

    const response = await fetch(endpoint);

    if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
    }

    return await response.json();
}

function fillArrayWithPromises(array, amountOfTasks, taskNum = 1) {
    if (taskNum > amountOfTasks) {
        return;
    }

    array.push(requestTask(taskNum));

    fillArrayWithPromises(array, amountOfTasks, taskNum + 1);
}

module.exports = {
    fillArrayWithPromises,
};