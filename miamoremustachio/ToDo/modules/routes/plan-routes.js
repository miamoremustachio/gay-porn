const express = require('express');

const { plans } = require('../services/plan-services.js');
const { findPlan } = require('../middlewares/plan-searching.js');
const { checkUserId } = require('../middlewares/authorization.js');
const { FilteredDoc: Plan } = require('../helpers/routes-helper.js');

const router = express.Router();

router.route('/')
  .get(async (req, res, next) => {
    const userId = req.headers.authorization;
    const filter = { userId, ...req.query };

    try {
      const plansList = await plans.getAll(filter);

      res.json(plansList);
    } catch(error) {
      next(error);
    }
  })
  .post(async (req, res, next) => {
    const userId = req.headers.authorization;
    const fields = { user: userId, ...req.body };

    try {
      const plan = await plans.create(new Plan(fields, plans));
      const planPath = `${req.baseUrl}${req.path}${plan.id}`;

      res.status(201).send(planPath);
    } catch(error) {
      next(error);
    }
  })

router.route('/:id')
  .all(findPlan, checkUserId)
  .get(async (req, res, next) => {
    const planId = req.params.id;
    const filter = req.query;

    try {
      const plan = await plans.get(planId, filter);

      res.json(plan);
    } catch(error) {
      next(error);
    }
  })
  .put(async (req, res, next) => {
    const planId = req.params.id;
    const update = new Plan(req.body, plans);
    const options = { returnDocument: 'after' };

    try {
      const plan = await plans.update(planId, update, options);

      res.json(plan);
    } catch(error) {
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    const planId = req.params.id;

    try {
      await plans.delete(planId);

      res.sendStatus(204);
    } catch(error) {
      next(error);
    }
  });

module.exports = { router };