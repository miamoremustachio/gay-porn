const express = require('express');

const { tasks } = require('../services/task-services.js');
const { findTask } = require('../middlewares/task-searching.js');
const { checkUserId } = require('../middlewares/authorization.js');
const { checkTitle } = require('../helpers/task-helper.js');
const { checkSubtaskProperties } = require('../helpers/subtask-helper.js');

const router = express.Router();

router.route('/:id/subtasks')
  .all(findTask, checkUserId)
  .get(async (req, res) => {
    const taskId = req.params.id;
    
    try {
      const task = await tasks.get(taskId);
      const subtasksList = task.subtasks;

      res.json(subtasksList);
    } catch(error) {
      res.status(500).send(error.message);
    }
  })
  .post(async (req, res) => {
    const taskId = req.params.id;
    const { title, ...restProperties } = req.body;

    try {
      checkTitle(title);
      checkSubtaskProperties(restProperties);

      const task = await tasks.get(taskId);
      
      task.subtasks.push(req.body);
      const subtask = task.subtasks.at(-1);

      await task.save();

      const subtaskPath = `${req.originalUrl}/${subtask.id}`;
      
      res.send(subtaskPath);
    } catch(error) {
      res.status(400).send(error.message);
    }
  });

router.route('/:id/subtasks/:subtaskId')
  .all(findTask, checkUserId)
  .get(async (req, res) => {
    const taskId = req.params.id;
    const subtaskId = req.params.subtaskId;

    try {
      const task = await tasks.get(taskId);
      const subtask = task.subtasks.id(subtaskId);

      res.json(subtask);
    } catch(error) {
      res.status(500).send(error.message);
    }
  })
  .put(async (req, res) => {
    const taskId = req.params.id;
    const subtaskId = req.params.subtaskId;

    try {
      checkSubtaskProperties(req.body);

      const task = await tasks.get(taskId);
      const subtask = task.subtasks.id(subtaskId);
      
      subtask.title = req.body.title || subtask.title;
      subtask.status = req.body.status || subtask.status;

      task.save();

      res.json(subtask);
    } catch(error) {
      res.status(400).send(error.message);
    }
  })
  .delete(async (req, res) => {
    const taskId = req.params.id;
    const subtaskId = req.params.subtaskId;

    try {
      const task = await tasks.get(taskId);
      const subtask = task.subtasks.id(subtaskId);

      subtask.deleteOne();

      task.save();

      res.json(subtask);
    } catch(error) {
      res.status(500).send(error.message);
    }
  });

module.exports = { router };