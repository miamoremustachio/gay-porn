const { ERROR } = require('./modules/constants');
const { requestName } = require('./modules/helpers');

const { NAME_NOT_FOUND } = ERROR;

function genderize(name) {
  requestName(name)
    .then(data => {
      const name = data.name;
      const gender = data.gender;
      const probability = Math.trunc(data.probability * 100);
      
      if (!gender) {
        throw new Error(NAME_NOT_FOUND);
      }
      
      console.log(`The name ${name} is ${gender} with a probability of ${probability}%.`);
    })

    .catch(err => console.error(err.message));
}

genderize('Oleg');