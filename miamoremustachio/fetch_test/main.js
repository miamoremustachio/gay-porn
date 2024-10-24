require('dotenv').config();

const http = require('http');

const { HOST, PORT, URL_PARAMS, ERROR } = require('./modules/config');
const { isFavicon, getServerUrl, getFilteredTodo } = require('./modules/helpers');
const { isTaskCountParamValid } = require('./modules/validation');
const { requestTodo } = require('./modules/requests');

const server = http.createServer().listen(PORT);

server.on('request', (req, res) => {
  if (isFavicon(req.url)) {
    res.writeHead(204).end();
    return;
  }

  const url = getServerUrl(HOST, PORT, req.url);
  const taskCount = url.searchParams.get(URL_PARAMS.TASK_COUNT);

  if (!taskCount) {
    res.end(ERROR.TASK_COUNT_PARAM.MISSING);
    return;
  }

  if (!isTaskCountParamValid(taskCount)) {
    res.end(ERROR.TASK_COUNT_PARAM.INVALID);
    return;
  }

  const sendResponse = res.end.bind(res);

  requestTodo(taskCount)
    .then(getFilteredTodo)
    .then(JSON.stringify)
    .then(sendResponse)
    .catch(err => res.end(err.message));
});
