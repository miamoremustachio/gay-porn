const express = require('express');

const { subtasks } = require('../services/subtask-services.js');
const { findTask } = require('../middlewares/task-searching.js');
const { findSubtask } = require('../middlewares/subtask-searching.js');
const { checkUserId } = require('../middlewares/authorization.js');
const { checkSubtask } = require('../helpers/subtask-validation.js');

const router = express.Router();

router.route('/:id/subtasks')
  .all(findTask, checkUserId)
  .get(async (req, res) => {
    const taskId = req.params.id;
    
    try {
      const subtasksList = await subtasks.getAll(taskId);

      res.json(subtasksList);
    } catch(error) {
      res.status(500).send(error.message);
    }
  })
  .post(async (req, res) => {
    const title = req.body.title;
    
    try {
      checkSubtask.title(title);
    } catch(error) {
      res.status(400).send(error.message);
      return;
    }

    const taskId = req.params.id;

    try {
      const subtask = await subtasks.create(taskId, req.body);
      const subtaskPath = `${req.originalUrl}/${subtask.id}`;
      
      res.status(201).send(subtaskPath);
    } catch(error) {
      res.status(500).send(error.message);
    }
  });

router.route('/:id/subtasks/:subtaskId')
  .all(findSubtask, checkUserId)
  .get(async (req, res) => {
    const taskId = req.params.id;
    const subtaskId = req.params.subtaskId;

    try {
      const subtask = await subtasks.get(taskId, subtaskId);

      res.json(subtask);
    } catch(error) {
      res.status(500).send(error.message);
    }
  })
  .put(async (req, res) => {
    const { title } = req.body;
    
    try {
      title ? checkSubtask.title(title) : null;
    } catch(error) {
      res.status(400).send(error.message);
      return;
    }
    
    const taskId = req.params.id;
    const subtaskId = req.params.subtaskId;
    
    try {
      const subtask = await subtasks.update(taskId, subtaskId, req.body);

      res.json(subtask);
    } catch(error) {
      res.status(500).send(error.message);
      console.log(error);
    }
  })
  .delete(async (req, res) => {
    const taskId = req.params.id;
    const subtaskId = req.params.subtaskId;

    try {
      await subtasks.delete(taskId, subtaskId);

      res.sendStatus(204);
    } catch(error) {
      res.status(500).send(error.message);
    }
  });

module.exports = { router };