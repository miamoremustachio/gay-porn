const PlanService = require('./plan.service');
const { getAuthHeader } = require('../../shared/helpers/get-auth-header.helper');

class PlanController {
  constructor(planService = new PlanService()) {
    this.planService = planService;
  }
  
  async addPlan(req, res, next) {
    const userId = getAuthHeader(req);
    const body = req.body;
  
    try {
      const plan = await this.planService.createPlan(userId, body);
      
      res.status(201).send(plan);
  
    } catch (err) {
      next(err);
    }
  }

  async addTaskToPlan(req, res, next) {
    const userId = getAuthHeader(req);
    const planId = req.params.planId;
    const taskId = req.params.taskId;
    
    try {
      await this.planService.addTaskToPlan(userId, planId, taskId);

      res.send();
      
    } catch (err) {
      next(err);
    }
  }

  async getPlan(req, res, next) {
    const planId = req.params.planId;
    const userId = getAuthHeader(req);

    try {
      const plan = await this.planService.getPlan(planId, userId);

      res.json(plan);

    } catch (err) {
      next(err);
    }
  }

  async getAllPlans(req, res, next) {
    const userId = getAuthHeader(req);
    
    try {
      const plans = await this.planService.getAllPlans(userId);

      res.json(plans);
    
    } catch (err) {
      next(err);
    }
  }

  async updatePlan(req, res, next) {
    const planId = req.params.planId;
    const userId = getAuthHeader(req);
    const body = req.body;

    try {
      const plan = await this.planService.updatePlan(planId, userId, body);

      res.json(plan);

    } catch (err) {
      next(err);
    }
  }

  async deletePlan(req, res, next) {
    const planId = req.params.planId;
    const userId = getAuthHeader(req);

    try {
      await this.planService.deletePlan(planId, userId);

      res.sendStatus(204);
    
    } catch (err) {
      next(err);
    }
  }
}

module.exports = PlanController;
