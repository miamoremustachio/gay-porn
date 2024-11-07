const express = require('express');

const { HTTP_HEADERS } = require('../../config/server.config');
const { taskService } = require('../services');
const { FilteredTask: Task } = require('../helpers/tasks.helper');

const { LOCATION } = HTTP_HEADERS;

const router = express.Router();

router.route('/')
  .get((req, res) => {
    res.send(taskService.list);
  })
    
  .post(async (req, res, next) => {
    const task = new Task(req.body);

    try {
      const taskPath = await taskService.add(task);

      res.setHeader(LOCATION, taskPath);
      res.sendStatus(201);
      
    } catch (err) {
      next(err);
    }
  });

router.route('/:id')
  .put((req, res, next) => {
    const taskId = Number(req.params.id);
    const newTask = new Task(req.body);

    try {
      taskService.change(taskId, newTask);

      res.send(newTask);

    } catch (err) {
      next(err);
    }
  })
  .delete((req, res, next) => {
    const taskId = Number(req.params.id);

    try {
      taskService.delete(taskId);

      res.sendStatus(204);

    } catch (err) {
      next(err);
    }
  });

module.exports = router;
