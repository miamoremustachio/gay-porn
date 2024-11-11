const express = require('express');

const { APP_NAME } = require('./config/app.config');
const {
  cors,
  exceptionHandler,
  errorHandler,
  errorLogger,
} = require('./shared/middlewares');

const routes = require('./routes');
const { isDevelopment } = require('./shared/helpers/app.helper');

const app = express();

app.set('name', APP_NAME);

app.use(cors);
app.use(express.json());
app.use(routes);

if (isDevelopment(app)) {
  app.use(errorLogger);
}

app.use(exceptionHandler);
app.use(errorHandler);

module.exports = app;
