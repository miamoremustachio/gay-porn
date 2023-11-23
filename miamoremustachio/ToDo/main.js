require('dotenv').config();

const express = require('express');

const {
  PORT,
  STATUSES,
  PRIORITIES,
  START_MESSAGE,
} = require('./modules/helpers/constants.js');
const { TO_DO } = STATUSES;
const { LOW } = PRIORITIES;
const { setHeaders } = require('./modules/middlewares/CORS.js');
const { checkId } = require('./modules/middlewares/id_checking.js');
const { Task } = require('./modules/models/task.js');
const { Query } = require('./modules/helpers/constructors.js');
const {
  checkTitle,
  checkProperties,
} = require('./modules/helpers/checking.js');
const { connectDatabase } = require('./modules/database/connection.js');

const app = express();

app.use(setHeaders);
app.use(express.json());

app.get('/', (req, res) => {
  res.send(START_MESSAGE);
});

app.route('/tasks')
  .get(async (req, res) => {

    try {
      const tasksList = await Task.find();
  
      res.json(tasksList);
    } catch(error) {
      res.status(500).send(error.message);
    }
  })
  .post(async (req, res) => {
    const { title, status, priority } = req.body;

    try {
      checkTitle(title);
      checkProperties({ status, priority });

      const task = new Task({
        title: title,
        status: status || TO_DO,
        priority: priority || LOW,
      });

      await task.save();

      // #ToDo: send URL
      res.status(201).send(`Task id: ${task.id}`);
    } catch(error) {
      res.status(400).send(error.message);
    }
  });

app.route('/tasks/:id')
  .all(checkId)
  .get(async (req, res) => {
    const id = req.params.id;

    try {
      const task = await Task.findById(id);

      res.json(task);
    } catch(error) {
      res.status(500).send(error.message);
    }
  })
  .put(async (req, res) => {
    const id = req.params.id;
    const taskProperties = req.body;

    try {
      checkProperties(taskProperties);

      const query = new Query(taskProperties);
      const options = { returnDocument: "after" };
      const result = await Task.findByIdAndUpdate(id, query, options);

      res.send(result);
    } catch(error) {
      res.status(400).send(error.message);
    }
  })
  .delete(async (req, res) => {
    const id = req.params.id;

    try {
      const result = await Task.findByIdAndDelete(id);
      
      res.send(result);
    } catch(error) {
      res.status(500).send(error.message);
    }
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