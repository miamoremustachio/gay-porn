const {
  PORT,
  INFO_MESSAGES,
} = require('./modules/constants.js');

const { toDo } = require('./todo.js');
const express = require('express');

const {
  START_MESSAGE,
  SUCCESSFULLY_ADDED,
} = INFO_MESSAGES;

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send(START_MESSAGE);
});

app.get('/tasks', (req, res) => {
  res.json(toDo.list);
});

app.post('/tasks', (req, res) => {
  try {
    const task = req.body;

    toDo.add(task);
    res.send(SUCCESSFULLY_ADDED);

    console.log(toDo.list);
  } catch(error) {
    res.status(400).send(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});