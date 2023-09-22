const {
    API,
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
    
readline.question("What is your name? ", name => {
    request(name)
    .then(data => {
        const name = getCapitalizedName(data.name);
        const gender = data.gender;
        const probability = (data.probability * 100);

        if (!gender) {
            throw new Error(getNameError(name));
        };
        
        console.log(`The name ${name} is ${gender} with a probability of ${probability}%`);
    })
    .catch(error => console.error(error.message));
});