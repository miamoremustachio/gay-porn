const { INIT_QUESTION, ERROR } = require('./modules/constants');
const { readline, requestName } = require('./modules/helpers');

const { NAME_NOT_FOUND } = ERROR;

const askQuestion = () => readline.question(INIT_QUESTION, genderize);

function genderize(name) {
  requestName(name)
    .then(data => {
      if (!data.gender) {
        throw new Error(NAME_NOT_FOUND);
      }

      const name = data.name;
      const gender = data.gender;
      const probability = Math.trunc(data.probability * 100);
      
      console.log(`The name ${name} is ${gender} with a probability of ${probability}%.`);
    })

    .catch(err => console.error(err.message))

    .finally(askQuestion);
}

askQuestion();