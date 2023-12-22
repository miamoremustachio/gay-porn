const express = require('express');

const { plans } = require('../services/plan-services.js');
const { findPlan } = require('../middlewares/plan-searching.js');
const { checkUserId } = require('../middlewares/authorization.js');
const {
  Plan,
  UpdatedPlan,
} = require('../helpers/plan-helper.js');

const router = express.Router();

router.route('/')
  .get(async (req, res) => {
    const userId = req.headers.authorization;
    const query = { userId };

    try {
      const plansList = await plans.getAll(query);

      res.json(plansList);
    } catch(error) {
      res.status(500).send(error.message);
    }
  })
  .post(async (req, res) => {
    const userId = req.headers.authorization;
    const fields = { userId, ...req.body };

    try {
      const plan = await plans.create(new Plan(fields));
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

      res.json(plan);
    } catch(error) {
      res.status(500).send(error.message);
    }
  })
  .put(async (req, res) => {
    const planId = req.params.id;
    const update = new UpdatedPlan(req.body);
    const options = { returnDocument: 'after' };

    try {
      const plan = await plans.update(planId, update, options);

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

module.exports = { router };