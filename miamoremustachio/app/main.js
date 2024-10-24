require('dotenv').config();

const http = require('http');

const { HOST, PORT, URL_PARAMS, INFO, ERROR } = require('./modules/config');
const { setHeaders, isFavicon, getServerUrl } = require('./modules/helpers');
const genderize = require('./modules/genderize');

const server = http.createServer().listen(PORT);

server.on('request', (req, res) => {
  setHeaders(res);

  if (isFavicon(req.url)) {
    res.writeHead(204).end();
    return;
  }

  const url = getServerUrl(HOST, PORT, req.url);

  if (!url.search) {
    res.end(INFO.WELCOME);
    return;
  }
 
  const name = url.searchParams.get(URL_PARAMS.NAME);

  if (!name) {
    res.end(ERROR.MISSING_NAME_PARAM);
    return;
  }

  const sendData = res.end.bind(res);

  genderize(name)
    .then(sendData)
    .catch(err => res.end(err.message));
});
