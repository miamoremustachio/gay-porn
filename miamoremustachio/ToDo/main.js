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
    const query = req.query;
    
    try {
      checkProperties(query);
      
      const tasksList = await Task.find(query);
  
      res.json(tasksList);
    } catch(error) {
      res.status(400).send(error.message);
    }
  })
  .post(async (req, res) => {
    const { title, ...restProperties } = req.body;

    try {
      checkTitle(title);
      checkProperties(restProperties);

      const task = new Task({
        title: title,
        status: req.body.status || TO_DO,
        priority: req.body.priority || LOW,
      });

      await task.save();

      const taskPath = `${req.path}/${task.id}`;

      res.status(201).send(taskPath);
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

    try {
      checkProperties(req.body);

      const query = new Query(req.body);
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