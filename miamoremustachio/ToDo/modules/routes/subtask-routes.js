const express = require('express');

const { subtasks } = require('../services/subtask-services.js');
const { findTask } = require('../middlewares/task-searching.js');
const { findSubtask } = require('../middlewares/subtask-searching.js');
const { checkUserId } = require('../middlewares/authorization.js');
const { checkSubtaskFields } = require('../middlewares/subtask-validation.js');

const router = express.Router();

router.route('/:id/subtasks')
  .all(findTask, checkUserId)
  .get(async (req, res, next) => {
    const taskId = req.params.id;
    
    try {
      const subtasksList = await subtasks.getAll(taskId);

      res.json(subtasksList);
    } catch(error) {
      next(error);
    }
  })
  .post(checkSubtaskFields, async (req, res, next) => {
    const taskId = req.params.id;

    try {
      const subtask = await subtasks.create(taskId, req.body);
      const subtaskPath = `${req.originalUrl}/${subtask.id}`;
      
      res.status(201).send(subtaskPath);
    } catch(error) {
      next(error);
    }
  });

router.route('/:id/subtasks/:subtaskId')
  .all(findSubtask, checkUserId)
  .get(async (req, res, next) => {
    const taskId = req.params.id;
    const subtaskId = req.params.subtaskId;

    try {
      const subtask = await subtasks.get(taskId, subtaskId);

      res.json(subtask);
    } catch(error) {
      next(error);
    }
  })
  .put(checkSubtaskFields, async (req, res, next) => {    
    const taskId = req.params.id;
    const subtaskId = req.params.subtaskId;
    
    try {
      const subtask = await subtasks.update(taskId, subtaskId, req.body);

      res.json(subtask);
    } catch(error) {
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    const taskId = req.params.id;
    const subtaskId = req.params.subtaskId;

    try {
      await subtasks.delete(taskId, subtaskId);

      res.sendStatus(204);
    } catch(error) {
      next(error);
    }
  });

module.exports = { router };