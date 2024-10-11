const express = require('express');

const {
  PORT,
  INFO_MESSAGES,
} = require('./modules/constants.js');

const { connectDB } = require('./modules/database/connection.js');
const { setHeaders } = require('./modules/CORS.js');
const { toDo } = require('./todo.js');
const { getAllTasks } = require('./modules/getting.js');

const {
  START_MESSAGE,
  SUCCESSFULLY_ADDED,
} = INFO_MESSAGES;

const app = express();

app.use(setHeaders);
app.use(express.json());

app.get('/', (req, res) => {
  res.send(START_MESSAGE);
});

app.route('/tasks')
  .get(async (req, res) => {
    const toDoList = await getAllTasks();
    res.json(toDoList);
  })
  .post((req, res) => {
    const task = req.body;
    
    try {
      toDo.add(task);
      res.status(201).send(SUCCESSFULLY_ADDED);
    } catch(error) {
      res.status(400).send(error.message);
    }
  });

async function start() {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });

  } catch(error) {
    console.log(error.message);
  }
}

start();