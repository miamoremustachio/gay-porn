const express = require('express');

const { HTTP_HEADERS } = require('../../config/server.config');
const { taskService } = require('../services');
const { FilteredTask: Task } = require('../helpers/tasks.helper');

const { LOCATION } = HTTP_HEADERS;

const router = express.Router();

router.route('/')
  .get(async (req, res, next) => {
    try {
      const tasksList = await taskService.getAll();

      res.json(tasksList);
    
    } catch (err) {
      next(err);
    }
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
  .get(async (req, res, next) => {
    const taskId = req.params.id;

    try {
      const task = await taskService.get(taskId);

      res.json(task);

    } catch (err) {
      next(err);
    }
  })
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
  .delete(async (req, res, next) => {
    const taskId = req.params.id;

    try {
      await taskService.delete(taskId);

      res.sendStatus(204);

    } catch (err) {
      next(err);
    }
  });

module.exports = router;
