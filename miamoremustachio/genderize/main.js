const {
    API,
    ERROR,
    getResponseError,
    getNameError,
    isNameValid,
    readline,
} = require('./modules');

readline.question("What is your name? ", name => {
    try {
        request(name);
    } catch(error) {
        console.error(error.message);
    };
})

function request(name) {
    if (!isNameValid(name)) {
        throw new Error(ERROR.INVALID_NAME);
    };

    const url = `${API}?name=${name}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(getResponseError(response));
            };

            return response.json();
        })
        .then(data => {
            if (!data.count) {
                throw new Error(getNameError(data.name));
            };

            const probability = `${data.probability * 100}`;
            console.log(`The name ${data.name} is ${data.gender} with a probability of ${probability}%`);
        })
        .catch(error => console.error(error.message))
}