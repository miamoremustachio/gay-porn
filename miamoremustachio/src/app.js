const express = require('express');

const { APP_NAME } = require('./config/app.config');
const routes = require('./modules/routes');

const app = express();

app.set('name', APP_NAME);

app.use(express.json());
app.use('/', routes);

module.exports = app;
