const { ERROR } = require('./config');
const { requestGender } = require('./requests');

const validateGender = data => {
  if (!data.gender) {
    throw new Error(ERROR.NAME_NOT_FOUND);
  }

  return data;
};

const getResponseMessage = data => {
  const { name, gender, probability } = data;
  const probabilityPct = Math.trunc(probability * 100);

  return `♡ The name ${name} is ${gender} with a probability of ${probabilityPct}%.`;
};

module.exports = name => {
  return requestGender(name)
    .then(validateGender)
    .then(getResponseMessage);
};
