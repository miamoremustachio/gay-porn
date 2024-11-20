const express = require('express');

const { authGuard } = require('../shared/middlewares');
const { PlanController } = require('../modules/plan');

const router = express.Router();
const planController = new PlanController();

router.route('/')
  .get(authGuard, planController.getAllPlans.bind(planController))
  .post(authGuard, planController.addPlan.bind(planController));

router.route('/:planId')
  .get(authGuard, planController.getPlan.bind(planController))
  .put(authGuard, planController.updatePlan.bind(planController))
  .delete(authGuard, planController.deletePlan.bind(planController));

router.route('/:planId/addTask/:taskId')
  .post(authGuard, planController.addTaskToPlan.bind(planController));

module.exports = router;
