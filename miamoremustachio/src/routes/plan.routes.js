const express = require('express');

const { authGuard } = require('../shared/middlewares');
const { PlanController } = require('../modules/plan');

const router = express.Router();
const planController = new PlanController();

router.use(authGuard);

router.route('/')
  .get(planController.getAllPlans)
  .post(planController.createPlan);

router.route('/:planId')
  .get(planController.getPlan)
  .put(planController.updatePlan)
  .delete(planController.deletePlan);

router.route('/:planId/addTask/:taskId')
  .post(planController.addTask);

router.route('/:planId/numberOfTasks')
  .get(planController.getNumberOfTasks);

module.exports = router;
