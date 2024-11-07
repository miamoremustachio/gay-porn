const express = require('express');
const taskService = require('../services/tasks.service');
const { FilteredTask: Task } = require('../helpers/tasks.helper');

const router = express.Router();

router.route('/')
  .get((req, res) => {
    res.send(taskService.list);
  })
    
  .post(async (req, res, next) => {
    const task = new Task(req.body);

    try {
      await taskService.add(task);

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
