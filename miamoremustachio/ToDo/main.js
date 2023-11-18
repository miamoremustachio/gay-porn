require('dotenv').config();

const express = require('express');

const { setHeaders } = require('./modules/CORS.js');
const { PORT, START_MESSAGE } = require('./modules/constants.js');
const { getAllTasks, getTask } = require('./modules/getting.js');
const { tasks } = require('./modules/database/collections.js');
const { toDo } = require('./todo.js');
const { checkId } = require('./modules/checking.js');
const { connectDatabase } = require('./modules/database/connection.js');

const app = express();

app.use(setHeaders);
app.use(express.json());

app.get('/', (req, res) => {
  res.send(START_MESSAGE);
});

app.route('/tasks')
  .get(async (req, res) => {
    const tasksList = await getAllTasks(tasks);

    res.json(tasksList);
  })
  .post(async (req, res) => {
    const task = req.body;
    
    try {
      const result = await toDo.add(task);
      res.status(201).send(result);
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

    const task = { ...taskProperties, id };

    try {
      const result = await toDo.edit(task);
      res.send(result);
    } catch(error) {
      res.status(400).send(error.message);
    }
  })
  .delete(async (req, res) => {
    const id = req.params.id;

    const result = await toDo.delete(id);
    res.send(result);
  })

async function start() {
  try {
    await connectDatabase();

    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });

  } catch(error) {
    console.log(error.message);
  }
}

start();