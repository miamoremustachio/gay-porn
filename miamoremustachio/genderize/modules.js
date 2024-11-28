const API = 'https://api.genderize.io';

const START_MESSAGE = "Welcome to Genderize!\nWrite any name in url and program will tell you if it's male or female.";

function getResponseError(response) {
    return `${response.status}: ${response.statusText}`;
}

function getNameError(name) {
    return `The name "${name}" wasn't found in database :(`;
}

function getCapitalizedName(name) {
    return (name.at(0).toUpperCase() + name.slice(1).toLowerCase());
}

function request(name) {
    const url = `${API}?name=${name}`;
    
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(getResponseError(response));
            };

            return response.json();
    })
}

module.exports = {
    START_MESSAGE,
    getNameError,
    getCapitalizedName,
    request,
};