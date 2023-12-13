const express = require('express');

const { plans } = require('../services/plan-services.js');
const { findPlan } = require('../middlewares/plan-searching.js');
const { checkUserId } = require('../middlewares/authorization.js');

const router = express.Router();

router.route('/:id/tasks')
// #ToDo: apply middlewares to all router
  .all(findPlan, checkUserId)
  .post(async (req, res) => {
    const planId = req.params.id;

    try {
      const plan = await plans.get(planId);
      const tasksList = plan.tasks;

      plans.addTask(tasksList, req.body);

      await plans.save(plan);

      const taskPath = `${req.originalUrl}/${planId}`;

      res.send(taskPath);
    } catch(error) {
      res.send(500).send(error.message);
    }
  });

router.route('/:id/tasks/:taskId')
  .all(findPlan, checkUserId)
  .get(async (req, res) => {
    const planId = req.params.id;
    const taskId = req.params.taskId;

    try {
      const plan = await plans.get(planId);
      const tasksList = plan.tasks;
      const task = plans.getTask(tasksList, taskId);

      res.json(task);
    } catch(error) {
      res.status(500).send(error.message);
    }
  })
  .delete(async (req, res) => {
    const planId = req.params.id;
    const taskId = req.params.taskId;

    try {
      const plan = await plans.get(planId);
      plan.tasks = plans.deleteTask(plan.tasks, taskId);
      
      await plans.save(plan);

      res.sendStatus(204);
    } catch(error) {
      res.status(500).send(error.message);
    }
  });

module.exports = { router };