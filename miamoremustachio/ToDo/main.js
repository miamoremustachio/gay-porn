require('dotenv').config();

const express = require('express');

const { setHeaders } = require('./modules/middlewares/CORS.js');
const {
  PORT,
  STATUSES,
  PRIORITIES,
  START_MESSAGE,
} = require('./modules/helpers/constants.js');
const { TO_DO } = STATUSES;
const { LOW } = PRIORITIES;
const {
  checkTitle,
  checkProperties,
} = require('./modules/helpers/checking.js');
const { Task } = require('./modules/models/task.js');
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
      res.status(400).send(error.message);
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

      res.status(201).send(`Task id: ${task.id}`);
    } catch(error) {
      res.status(400).send(error.message);
    }
  });

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