const express = require('express');

const { taskRefs } = require('../services/task_refs-services.js');
const { findPlan } = require('../middlewares/plan-searching.js');
const { findTaskRef } = require('../middlewares/task_refs-searching.js');
const { checkUserId } = require('../middlewares/authorization.js');

const router = express.Router();

router.route('/:id/tasks')
  .all(findPlan, checkUserId)
  .post(async (req, res) => {
    const planId = req.params.id;

    try {
      const uniqueTaskRefs = new Set(req.body);
      const taskRef = await taskRefs.add(planId, uniqueTaskRefs);

      const taskRefPath = `${req.originalUrl}/${taskRef}`;

      res.send(taskRefPath);
    } catch(error) {
      res.send(500).send(error.message);
    }
  });

router.route('/:id/tasks/:taskId')
  .all(findPlan, findTaskRef, checkUserId)
  .get(async (req, res) => {
    const planId = req.params.id;
    const taskId = req.params.taskId;

    try {
      const taskRef = await taskRefs.get(planId, taskId);

      res.json(taskRef);
    } catch(error) {
      res.status(500).send(error.message);
    }
  })
  .delete(async (req, res) => {
    const planId = req.params.id;
    const taskId = req.params.taskId;

    try {
      await taskRefs.delete(planId, taskId);

      res.sendStatus(204);
    } catch(error) {
      res.status(500).send(error.message);
    }
  });

module.exports = { router };