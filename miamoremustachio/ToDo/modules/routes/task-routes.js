const express = require('express');

const { tasks } = require('../services/task-services.js');
const { users } = require('../services/user-services.js');
const { findTask } = require('../middlewares/task-searching.js');
const { checkUserId } = require('../middlewares/authorization.js');
const { Query } = require('../helpers/task-helper.js');
const {
  checkTitle,
  checkProperties,
} = require('../helpers/checking.js');

const router = express.Router();

router.route('/')
  .get(async (req, res) => {
    const userId = req.get('Authorization');
    const query = { userId, ...req.query };
    
    try {      
      const tasksList = await tasks.getAll(query);
  
      res.json(tasksList);
    } catch(error) {
      res.status(400).send(error.message);
    }
  })
  .post(async (req, res) => {
    const userId = req.get('Authorization');
    const { title, ...restProperties } = req.body;

    try {
      checkTitle(title);
      checkProperties(restProperties);

      const task = await tasks.create({ userId, ...req.body });

      const taskPath = `${req.baseUrl}${req.path}${task.id}`;

      res.status(201).send(taskPath);
    } catch(error) {
      res.status(400).send(error.message);
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
      checkProperties(req.body);

      const query = new Query(req.body);
      const options = { returnDocument: "after" };
      const result = await tasks.update(taskId, query, options);

      res.send(result);
    } catch(error) {
      res.status(400).send(error.message);
    }
  })
  .delete(async (req, res) => {
    const taskId = req.params.id;

    try {
      const result = await tasks.delete(taskId);
      
      res.send(result);
    } catch(error) {
      res.status(500).send(error.message);
    }
  });

router.route('/:id/subtasks')
  .all(findTask, checkUserId)
  .get(async (req, res) => {
    const taskId = req.params.id;
    
    try {
      const task = await tasks.get(taskId);
      const subtasksList = task.subtasks;

      res.json(subtasksList);
    } catch(error) {
      res.send(500).send(error.message);
    }
  })
  .post(async (req, res) => {
    const taskId = req.params.id;
    const { title, ...restProperties } = req.body;

    try {
      checkTitle(title);
      checkProperties(restProperties);

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
      checkProperties(req.body);

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
  })

module.exports = { router };