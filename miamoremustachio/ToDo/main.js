require('dotenv').config();

const express = require('express');

const {
  PORT,
  INFO_MESSAGES,
} = require('./modules/constants.js');

const { connectDB } = require('./modules/database/connection.js');
const { setHeaders } = require('./modules/CORS.js');
const { toDo } = require('./todo.js');
const { checkId } = require('./modules/checking.js');
const { getAllTasks, getTask } = require('./modules/getting.js');

const {
  START_MESSAGE,
  SUCCESSFULLY_ADDED,
  SUCCESSFULLY_UPDATED,
  SUCCESSFULLY_DELETED,
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

app.route('/tasks/:id')
  .all((req, res, next) => {
    const id = req.params.id;
    
    try {
      checkId(id, toDo.list);
    } catch(error) {
      return res.status(404).send(error.message);
    }

    next();
  })
  .get((req, res) => {
    const id = req.params.id;

    const task = getTask(id, toDo.list);
    res.json(task);
  })
  .put((req, res) => {
    const id = req.params.id;
    const { title, status, priority } = req.body;

    const task = { id, title, status, priority };

    try {
      toDo.edit(task);
    } catch(error) {
      return res.status(400).send(error.message);
    }

    res.send(SUCCESSFULLY_UPDATED);
  })
  .delete((req, res) => {
    const id = req.params.id;

    toDo.delete(id);
    res.send(SUCCESSFULLY_DELETED);
  })

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