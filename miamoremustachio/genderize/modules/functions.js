function getResponseError(response) {
    return `${response.status}: ${response.statusText}`;
}

function getNameError(name) {
    return `The name "${name}" wasn't found in database.`;
}

function getCapitalizedName(name) {
    return (name.at(0).toUpperCase() + name.slice(1));
}

async function request(name) {
    const API = 'https://api.genderize.io';
    const endpoint = new URL(API);
    endpoint.searchParams.set('name', name);
    
    const response = await fetch(endpoint);
    
    if (!response.ok) {
        throw new Error(getResponseError(response));
    }

    const data = await response.json();
    return data;
}

module.exports = {
    getNameError,
    getCapitalizedName,
    request,
};