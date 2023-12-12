const express = require('express');

const { plans } = require('../services/plan-services.js');
const { findPlan } = require('../middlewares/plan-searching.js');
const { checkUserId } = require('../middlewares/authorization.js');

const router = express.Router();

router.route('/')
  .get(async (req, res) => {
    // #ToDo: test this ebanina:
    // const userId = req.headers.authorization;
    const userId = req.get('Authorization');
    const query = { user: userId };

    try {
      const plansList = await plans.getAll(query);

      res.json(plansList);
    } catch(error) {
      res.status(500).send(error.message);
    }
  })
  .post(async (req, res) => {
    const userId = req.get('Authorization');

    try {
      const plan = await plans.create({ user: userId, ...req.body });
      const planPath = `${req.baseUrl}${req.path}${plan.id}`;

      res.send(planPath);
    } catch(error) {
      res.status(500).send(error.message);
    }
  })

router.route('/:id')
  .all(findPlan, checkUserId)
  .get(async (req, res) => {
    const planId = req.params.id;

    try {
      const plan = await plans.get(planId);
      plan.tasks

      res.json(plan);
    } catch(error) {
      res.status(500).send(error.message);
    }
  })
  .put(async (req, res) => {
    const planId = req.params.id;
    // #ToDo: add query filter
    const query = req.body;
    const options = { returnDocument: "after" };

    try {
      const plan = await plans.update(planId, query, options);

      res.json(plan);
    } catch(error) {
      res.status(500).send(error.message);
    }
  })
  .delete(async (req, res) => {
    const planId = req.params.id;

    try {
      await plans.delete(planId);

      res.sendStatus(204);
    } catch(error) {
      res.status(500).send(error.message);
    }
  });

router.route('/:id/tasks')
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