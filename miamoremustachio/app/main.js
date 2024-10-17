const { PORT, SERVER_URL, API_KEY, UNIT_USED, PARAM_NAME } = require('./modules/config');
const { ERROR, INFO } = require('./modules/utils/messages');
const { weatherRequest } = require('./modules/utils/requests');
const {
  isFavicon,
  isPathEmpty,
  isSearchParamsEmpty,
  getAppUrl,
  setHeaders,
} = require('./modules/utils/helpers');

const http = require('http');

const server = http.createServer().listen(PORT);

server.on('request', (req, res) => {
  setHeaders(res);

  const url = getAppUrl(req.url);

  if (isFavicon(url.pathname)) {
    res.writeHead(204).end();
    return;
  }

  const path = url.pathname;
  const params = url.searchParams;

  if (isPathEmpty(path) && isSearchParamsEmpty(params)) {
    res.end(INFO.WELCOME);
    return;
  }

  const cityName = params.get('city');

  if (!cityName) {
    res.end(ERROR.MISSING_CITY_NAME);
    return;
  }

  const weatherRequestUrl = new URL(SERVER_URL);
  weatherRequestUrl.searchParams.set(PARAM_NAME.CITY_NAME, cityName);
  weatherRequestUrl.searchParams.set(PARAM_NAME.API_KEY, API_KEY);
  weatherRequestUrl.searchParams.set(PARAM_NAME.UNITS, UNIT_USED.param);

  const sendData = res.end.bind(res);

  weatherRequest(weatherRequestUrl)
    .then(sendData)
    .catch(err => res.end(err.message));
});