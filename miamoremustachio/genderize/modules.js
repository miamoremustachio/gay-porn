const API = 'https://api.genderize.io';

const ERROR = {
    INVALID_NAME: "Invalid name: only strings are allowed",
};

function getResponseError(response) {
    return `${response.status}: ${response.statusText}`;
}

function getNameError(name) {
    return `The name "${name}" wasn't found in database.`;
}

function isNameValid(name) {
    return (typeof name === 'string') ? true : false;
}

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

module.exports = {
    API,
    ERROR,
    getResponseError,
    getNameError,
    isNameValid,
    readline,
};