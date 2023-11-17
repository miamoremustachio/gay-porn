require('dotenv').config();

const express = require('express');

const {
  PORT,
  INFO_MESSAGES,
} = require('./modules/constants.js');

const { connectDB } = require('./modules/database/connection.js');
const { tasks } = require('./modules/database/collections.js');
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
    const toDoList = await getAllTasks(tasks);

    res.json(toDoList);
  })
  .post(async (req, res) => {
    const task = req.body;
    
    try {
      await toDo.add(task);
      res.status(201).send(SUCCESSFULLY_ADDED);
    } catch(error) {
      res.status(400).send(error.message);
    }
  });

app.route('/tasks/:id')
  .all(async (req, res, next) => {
    const id = req.params.id;
    
    try {
      await checkId(tasks, id);
    } catch(error) {
      return res.status(404).send(error.message);
    }

    next();
  })
  .get(async (req, res) => {
    const id = req.params.id;
    const task = await getTask(tasks, id);

    res.json(task);
  })
  .put(async (req, res) => {
    const id = req.params.id;
    const taskProperties = req.body;

    const task = {...taskProperties, id };

    try {
      await toDo.edit(task);
      res.send(SUCCESSFULLY_UPDATED);
    } catch(error) {
      res.status(400).send(error.message);
    }
  })
  .delete(async (req, res) => {
    const id = req.params.id;

    await toDo.delete(id);
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