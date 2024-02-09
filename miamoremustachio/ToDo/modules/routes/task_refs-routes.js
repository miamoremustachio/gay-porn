const express = require('express');

const { taskRefs } = require('../services/task_refs-services.js');
const { findPlan } = require('../middlewares/searching/plan-searching.js');
const { findTaskRef } = require('../middlewares/searching/task_refs-searching.js');
const { checkUserId } = require('../middlewares/authorization.js');

const router = express.Router();

router.route('/:id/tasks')
  .all(findPlan, checkUserId)
  .post(async (req, res, next) => {
    const planId = req.params.id;

    try {
      const taskRefsList = new Set(req.body);
      const taskRef = await taskRefs.add(planId, taskRefsList);

      const taskRefPath = `${req.originalUrl}/${taskRef}`;

      res.send(taskRefPath);
    } catch(error) {
      next(error);
    }
  });

router.route('/:id/tasks/:taskId')
  .all(findPlan, findTaskRef, checkUserId)
  .get(async (req, res, next) => {
    const planId = req.params.id;
    const taskId = req.params.taskId;

    try {
      const taskRef = await taskRefs.get(planId, taskId);

      res.json(taskRef);
    } catch(error) {
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    const planId = req.params.id;
    const taskId = req.params.taskId;

    try {
      await taskRefs.delete(planId, taskId);

      res.sendStatus(204);
    } catch(error) {
      next(error);
    }
  });

module.exports = { router };