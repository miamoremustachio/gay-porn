module.exports.setHeaders = res => res.setHeader('Content-Type', 'text/html; charset=utf-8');
module.exports.isFavicon = url => url === '/favicon.ico';
module.exports.getServerUrl = (host, port, path) => new URL(`${host}:${port}${path}`);
module.exports.getResponseErrorMessage = res => `${res.status}: ${res.statusText}`;
