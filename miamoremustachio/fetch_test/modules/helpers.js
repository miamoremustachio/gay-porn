module.exports.isFavicon = url => url === '/favicon.ico';
module.exports.getServerUrl = (host, port, path) => new URL(`${host}:${port}${path}`);
module.exports.getResponseErrorMessage = res => `${res.status}: ${res.statusText}`;
module.exports.getFilteredTodo = tasksArray => tasksArray.map(({ userId, ...task }) => task);
