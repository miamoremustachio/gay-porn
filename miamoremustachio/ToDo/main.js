require('dotenv').config();

const express = require('express');

const { setHeaders } = require('./modules/middlewares/CORS.js');
const { PORT, START_MESSAGE } = require('./modules/helpers/constants.js');
const { toDo } = require('./modules/todo.js');
const { checkId, checkTitle, checkProperties } = require('./modules/helpers/checking.js');
const { Task, UpdatedTask } = require('./modules/helpers/constructors.js');
const { connectDatabase } = require('./modules/database/connection.js');

const app = express();

app.use(setHeaders);
app.use(express.json());

app.get('/', (req, res) => {
  res.send(START_MESSAGE);
});

app.route('/tasks')
  .get(async (req, res) => {
    const tasksList = await toDo.getAll();

    res.json(tasksList);
  })
  .post(async (req, res) => {
    const { title, ...restProperties } = req.body;
    
    try {
      checkTitle(title);
      checkProperties(restProperties);

      const task = new Task(req.body);
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
      await checkId(toDo.collection, id);
    } catch(error) {
      return res.status(404).send(error.message);
    }

    next();
  })
  .get(async (req, res) => {
    const id = req.params.id;
    const task = await toDo.get(id);
    
    res.json(task);
  })
  .put(async (req, res) => {
    const id = req.params.id;
    const taskProperties = req.body;
    
    try {
      checkProperties(taskProperties);

      const task = new UpdatedTask({ id, ...taskProperties });
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