require('dotenv').config();

const express = require('express');

const {
  PORT,
  START_MESSAGE,
} = require('./modules/helpers/constants.js');
const { setHeaders } = require('./modules/middlewares/CORS.js');
const { findTask } = require('./modules/middlewares/find_task.js');
const { findUser } = require('./modules/middlewares/find_user.js');
const { checkUserId } = require('./modules/middlewares/authorization.js');
const { Task } = require('./modules/models/task.js');
const { User } = require('./modules/models/user.js');
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
    const userId = req.get('Authorization');
    const query = { userId, ...req.query };
    
    try {      
      const tasksList = await Task.find(query);
  
      res.json(tasksList);
    } catch(error) {
      res.status(400).send(error.message);
    }
  })
  .post(async (req, res) => {
    const userId = req.get('Authorization');
    const { title, ...restProperties } = req.body;

    try {
      checkTitle(title);
      checkProperties(restProperties);

      const task = new Task({ userId, ...req.body });

      await task.save();

      const taskPath = `${req.path}/${task.id}`;

      res.status(201).send(taskPath);
    } catch(error) {
      res.status(400).send(error.message);
    }
  });

app.route('/tasks/:id')
  .all(findTask, checkUserId)
  .get(async (req, res) => {
    const taskId = req.params.id;
    const userId = req.get('Authorization');

    try {
      const task = await Task.findById(taskId);
      const user = await User.findById(userId);

      const taskObject = task.toObject();
      taskObject.user = user;
      delete taskObject.userId;

      res.json(taskObject);
    } catch(error) {
      res.status(500).send(error.message);
    }
  })
  .put(async (req, res) => {
    const taskId = req.params.id;

    try {
      checkProperties(req.body);

      const query = new Query(req.body);
      const options = { returnDocument: "after" };
      const result = await Task.findByIdAndUpdate(taskId, query, options);

      res.send(result);
    } catch(error) {
      res.status(400).send(error.message);
    }
  })
  .delete(async (req, res) => {
    const taskId = req.params.id;

    try {
      const result = await Task.findByIdAndDelete(taskId);
      
      res.send(result);
    } catch(error) {
      res.status(500).send(error.message);
    }
  })

app.route('/users')
  .get(async (req, res) => {
    try {
      const usersList = await User.find();

      res.json(usersList);
    } catch(error) {
      res.status(500).send(error.message);
    }
  })
  .post(async (req, res) => {
    const userProperties = req.body;

    try {
      const user = new User(userProperties);

      await user.save();

      const userPath = `${req.path}/${user.id}`;

      res.send(userPath);
    } catch(error) {
      res.status(500).send(error.message);
    }
  });

app.route('/users/:id')
  .all(findUser, checkUserId)
  .get(async (req, res) => {
    const id = req.params.id;

    try {
      const user = await User.findById(id);
      
      res.json(user);
    } catch(error) {
      res.status(500).send(error.message);
    }
  })
  .put(async (req, res) => {
    const id = req.params.id;
    const query = req.body;
    const options = { returnDocument: "after" };

    try {
      const result = await User.findByIdAndUpdate(id, query, options);

      res.send(result);
    } catch(error) {
      res.status(500).send(error.message);
    }
  })
  .delete(async (req, res) => {
    const id = req.params.id;

    try {
      const result = await User.findByIdAndDelete(id);

      res.send(result);
    } catch(error) {
      res.status(500).send(error.message);
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