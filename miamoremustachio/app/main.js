require('dotenv').config();

const http = require('http');

const { PORT, WELCOME_MESSAGE, ERROR } = require('./modules/constants');
const { isUrlValid, getNameFromUrl } = require('./modules/helpers');
const { requestGender } = require('./modules/requests');

const { NAME_NOT_FOUND } = ERROR;

function genderize(requestedName) {
  return requestGender(requestedName)
    .then(data => {
      if (!data.gender) {
        throw new Error(NAME_NOT_FOUND);
      }

      const { name, gender, probability } = data;
      const probabilityPct = Math.trunc(probability * 100);

      const responseMessage = `The name ${name} is ${gender} with a probability of ${probabilityPct}%.`;
      
      return responseMessage;
    });
}

const server = http.createServer().listen(PORT);

server.on('request', (req, res) => {
  if (!isUrlValid(req.url)) return;

  if (req.url === '/') {
    res.end(WELCOME_MESSAGE);
    return;
  }
 
  const name = getNameFromUrl(req.url);

  genderize(name)
    .then(response => res.end(response))
    .catch(err => res.end(err.message));
});
