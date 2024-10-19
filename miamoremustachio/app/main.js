const http = require('http');

const { PORT, API_URL } = require('./modules/config');
const { ERROR, INFO } = require('./modules/utils/messages');
const { weatherRequest } = require('./modules/utils/requests');
const {
  isFavicon,
  isPathEmpty,
  isSearchParamsEmpty,
  getAppUrl,
  setHeaders,
} = require('./modules/utils/helpers');

const server = http.createServer().listen(PORT);

server.on('request', async (req, res) => {
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

  const requestUrl = new URL(API_URL);

  try {
    const data = await weatherRequest(requestUrl, cityName);

    res.end(data);
  } catch (err) {
    res.end(err.message);
  }
});
