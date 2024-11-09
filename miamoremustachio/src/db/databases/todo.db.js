const { DATABASES } = require('../../config/db.config');
const client = require('../client');

const todo = client.db(DATABASES.TODO);

module.exports = todo;
