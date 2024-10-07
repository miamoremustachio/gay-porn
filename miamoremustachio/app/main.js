const { PORT, WELCOME_MESSAGE, ERROR } = require('./modules/constants');
const { isUrlValid, getNameFromUrl } = require('./modules/helpers');
const { requestName } = require('./modules/requests');
const http = require('http');

const { NAME_NOT_FOUND } = ERROR;

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

function genderize(name) {
  return requestName(name)
    .then(data => {
      if (!data.gender) {
        throw new Error(NAME_NOT_FOUND);
      }

      const name = data.name;
      const gender = data.gender;
      const probability = Math.trunc(data.probability * 100);
      
      const responseMessage = `The name ${name} is ${gender} with a probability of ${probability}%.`;
      
      return responseMessage;
    });
}