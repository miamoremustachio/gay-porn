const express = require('express');

const {
  tasks,
  Task,
} = require('../services/task-services.js');
const { findTask } = require('../middlewares/task-searching.js');
const { checkUserId } = require('../middlewares/authorization.js');
const { checkTask } = require('../helpers/task-validation.js');

const router = express.Router();

router.route('/')
  .get(async (req, res) => {
    const userId = req.headers.authorization;
    const filter = { user: userId, ...req.query };
    
    try {      
      const tasksList = await tasks.getAll(filter);
  
      res.json(tasksList);
    } catch(error) {
      res.status(500).send(error.message);
    }
  })
  .post(async (req, res) => {
    const userId = req.headers.authorization;
    const { title, ...restFields } = req.body;
    const fields = { user: userId, title, ...restFields };

    try {
      checkTask.title(title);
      checkTask.all(restFields);
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
    const fields = req.body;

    try {
      checkTask.all(fields);
    } catch(error) {
      res.status(400).send(error.message);
      return;
    }

    const update = new Task(req.body);
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