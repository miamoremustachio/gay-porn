const { HOST, PORT } = require('../config');

const isFavicon = path => path === '/favicon.ico';
const isPathEmpty = path => path === '/';
const isSearchParamsEmpty = searchParams => !searchParams.size;
const setHeaders = res => res.setHeader('Content-Type', 'text/html; charset=utf-8');
const getAppUrl = path => new URL(`${HOST}:${PORT}${path}`);
const getResponseErrorMessage = res => `${res.status}: ${res.statusText}`;

module.exports = {
  isFavicon,
  isPathEmpty,
  isSearchParamsEmpty,
  setHeaders,
  getAppUrl,
  getResponseErrorMessage,
};
