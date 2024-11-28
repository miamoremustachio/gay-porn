const express = require('express');

const { tasks } = require('../services/task-services.js');
const { findTask } = require('../middlewares/searching/task-searching.js');
const { validateTask } = require('../middlewares/validation/task-validation.js');
const { checkUserId } = require('../middlewares/authorization.js');
const { FilteredDoc: Task } = require('../helpers/routes-helper.js');

const router = express.Router();

router.route('/')
  .get(async (req, res, next) => {
    const userId = req.headers.authorization;
    const filter = { user: userId, ...req.query };
    // #ToDo: add sorting variables
    
    try {      
      const tasksList = await tasks.getAll(filter);
  
      res.json(tasksList);
    } catch(error) {
      next(error);
    }
  })
  .post(validateTask, async (req, res, next) => {
    const userId = req.headers.authorization;
    const fields = { user: userId, ...req.body };

    try {
      const task = await tasks.create(new Task(fields, tasks));
      const taskPath = `${req.baseUrl}${req.path}${task.id}`;

      res.status(201).send(taskPath);
    } catch(error) {
      next(error);
    }
  });

router.route('/:id')
  .all(findTask, checkUserId)
  .get(async (req, res, next) => {
    const taskId = req.params.id;

    try {
      const task = await tasks.get(taskId);

      res.json(task);
    } catch(error) {
      next(error);
    }
  })
  .put(validateTask, async (req, res, next) => {
    const fields = req.body;
    const taskId = req.params.id;
    const update = new Task(fields, tasks);
    const options = { returnDocument: 'after' };
    
    try {
      const task = await tasks.update(taskId, update, options);

      res.json(task);
    } catch(error) {
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    const taskId = req.params.id;

    try {
      await tasks.delete(taskId);
      
      res.sendStatus(204);
    } catch(error) {
      next(error);
    }
  });

module.exports = { router };