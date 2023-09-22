const {
    API,
    EXIT_COMMAND,
    getResponseError,
    getNameError,
    getCapitalizedName,
    readline,
} = require('./modules');


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

function askName() {
    readline.question("What is your name? ", name => {
        if (name === EXIT_COMMAND) {
            return readline.close();
        };

        request(name)
        .then(data => {
            const name = getCapitalizedName(data.name);
            const gender = data.gender;
            const probability = (Math.trunc(data.probability * 100));

            if (!gender) {
                throw new Error(getNameError(name));
            };
            
            console.log(`The name ${name} is ${gender} with a probability of ${probability}%`);
        })
        .catch(error => console.error(error.message))
        .finally(() => {
            console.log(`* (type <${EXIT_COMMAND}> to exit)`);
            askName();
        });
    });
}

askName();