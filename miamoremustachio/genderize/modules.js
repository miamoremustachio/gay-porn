const API = 'https://api.genderize.io';

const EXIT_COMMAND = 'exit';

function getResponseError(response) {
    return `${response.status}: ${response.statusText}`;
}

function getNameError(name) {
    return `The name "${name}" wasn't found in database.`;
}

function getCapitalizedName(name) {
    return (name.at(0).toUpperCase() + name.slice(1));
}

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

module.exports = {
    API,
    EXIT_COMMAND,
    getResponseError,
    getNameError,
    getCapitalizedName,
    readline,
};