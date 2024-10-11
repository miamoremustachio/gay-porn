const { client } = require('./client.js');

const database = client.db("todo");
const tasks = database.collection("tasks");

module.exports = { tasks };