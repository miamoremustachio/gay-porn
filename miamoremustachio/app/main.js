const { ERROR } = require('./modules/constants');
const { closeReadline, requestName } = require('./modules/helpers');

const { NAME_NOT_FOUND } = ERROR;

function genderize(name) {
  return requestName(name)
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

    .finally(closeReadline);
}

module.exports = { genderize };