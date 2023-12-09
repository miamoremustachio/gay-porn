const express = require('express');

const { tasks } = require('../services/task-services.js');
const { users } = require('../services/user-services.js');
const { findTask } = require('../middlewares/task-searching.js');
const { checkUserId } = require('../middlewares/authorization.js');
const {
  checkTitle,
  checkTaskProperties,
  Query,
} = require('../helpers/task-helper.js');

const router = express.Router();

router.route('/')
  .get(async (req, res) => {
    const userId = req.get('Authorization');
    const query = { userId, ...req.query };
    
    try {      
      const tasksList = await tasks.getAll(query);
  
      res.json(tasksList);
    } catch(error) {
      res.status(500).send(error.message);
    }
  })
  .post(async (req, res) => {
    const userId = req.get('Authorization');
    const { title, ...restProperties } = req.body;

    try {
      checkTitle(title);
      checkTaskProperties(restProperties);
    } catch(error) {
      res.status(400).send(error.message);
      return;
    }

    try {
      const task = await tasks.create({ userId, ...req.body });
      const taskPath = `${req.baseUrl}${req.path}${task.id}`;

      res.status(201).send(taskPath);
    } catch(error) {
      res.status(500).send(error.message);
    }
  });

router.route('/:id')
  .all(findTask, checkUserId)
  .get(async (req, res) => {
    const taskId = req.params.id;
    const userId = req.get('Authorization');

    try {
      const task = await tasks.get(taskId);
      const user = await users.get(userId);

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
      checkTaskProperties(req.body);
    } catch(error) {
      res.status(400).send(error.message);
      return;
    }

    try {
      const query = new Query(req.body);
      const options = { returnDocument: "after" };
      const task = await tasks.update(taskId, query, options);

      res.json(task);
    } catch(error) {
      res.status(500).send(error.message);
    }
  })
  .delete(async (req, res) => {
    const taskId = req.params.id;

    try {
      await tasks.delete(taskId);
      
      res.sendStatus(204);
    } catch(error) {
      res.status(500).send(error.message);
    }
  });

module.exports = { router };