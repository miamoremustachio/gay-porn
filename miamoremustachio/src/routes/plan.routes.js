const express = require('express');

const { authGuard } = require('../shared/middlewares');
const { PlanController } = require('../modules/plan');

const router = express.Router();
const planController = new PlanController();

router.use(authGuard);

router.route('/')
  .get(planController.getAllPlans.bind(planController))
  .post(planController.createPlan.bind(planController));

router.route('/:planId')
  .get(planController.getPlan.bind(planController))
  .put(planController.updatePlan.bind(planController))
  .delete(planController.deletePlan.bind(planController));

router.route('/:planId/addTask/:taskId')
  .post(planController.addTaskToPlan.bind(planController));

module.exports = router;
