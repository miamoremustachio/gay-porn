const {
    EXIT_COMMAND,
} = require('./modules/constants.js');

const {
    getNameError,
    getCapitalizedName,
    request,
} = require('./modules/functions.js');

const { 
    stdin: input,
    stdout: output,
} = require('node:process');

const readline = require('node:readline/promises')
    .createInterface({ input, output });


async function askName() {
    const inputName = await readline.question("What is your name? ");

    if (inputName === EXIT_COMMAND) {
        return readline.close();
    }

    try {
        const data = await request(inputName);
        const name = getCapitalizedName(data.name);
        const gender = data.gender;
        const probability = (Math.trunc(data.probability * 100));

        if (!gender) {
            throw new Error(getNameError(name));
        }
        
        console.log(`The name ${name} is ${gender} with a probability of ${probability}%`);

    } catch(error) {
        console.error(error.message);
    }

    console.log(`* (type <${EXIT_COMMAND}> to exit)`);
    askName();
}

askName();