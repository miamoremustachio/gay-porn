const mongoose = require('mongoose');

const { DATABASE_URI, DATABASES } = require('../config/db.config');

const connectionString = `${DATABASE_URI}/${DATABASES.TODO}`;

const dbTodo = {
  client: null,
  connect: async () => {
    this.client = await mongoose.connect(connectionString);
  },
  disconnect: async () => this.client && await this.client.disconnect(),
};

module.exports = dbTodo;
