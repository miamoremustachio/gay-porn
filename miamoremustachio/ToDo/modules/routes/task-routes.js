const express = require('express');

const { tasks } = require('../services/task-services.js');
const { findTask } = require('../middlewares/task-searching.js');
const { checkUserId } = require('../middlewares/authorization.js');
const {
  checkTitle,
  checkTaskProperties,
  Task,
  UpdatedTask,
} = require('../helpers/task-helper.js');

const router = express.Router();

router.route('/')
  .get(async (req, res) => {
    const userId = req.headers.authorization;
    const query = { user: userId, ...req.query };
    
    try {      
      const tasksList = await tasks.getAll(query);
  
      res.json(tasksList);
    } catch(error) {
      res.status(500).send(error.message);
    }
  })
  .post(async (req, res) => {
    const userId = req.headers.authorization;
    const { title, ...restProperties } = req.body;
    const fields = { userId, title, ...restProperties };

    try {
      checkTitle(title);
      checkTaskProperties(restProperties);
    } catch(error) {
      res.status(400).send(error.message);
      return;
    }

    try {
      const task = await tasks.create(new Task(fields));
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

    try {
      const task = await tasks.get(taskId);

      res.json(task);
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

    const update = new UpdatedTask(req.body);
    const options = { returnDocument: 'after' };
    
    try {
      const task = await tasks.update(taskId, update, options);

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