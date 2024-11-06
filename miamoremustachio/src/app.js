const express = require('express');

const { APP_NAME } = require('./config/app.config');
const { cors, errorHandler, errorLogger } = require('./modules/middlewares');
const routes = require('./modules/routes');
const { isDevelopment } = require('./modules/helpers/server.helper');

const app = express();

app.set('name', APP_NAME);

app.use(cors);
app.use(express.json());
app.use('/', routes);

if (isDevelopment(app)) {
  app.use(errorLogger);
}

app.use(errorHandler);

module.exports = app;
