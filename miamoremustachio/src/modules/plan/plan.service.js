const PlanEntity = require('./plan.entity');
const PlanValidator = require('./plan.validator');
const TaskService = require('../task/task.service');

class PlanService {
  constructor(planRepository = PlanEntity, taskService = new TaskService()) {
    this.planRepository = planRepository;
    this.taskService = taskService;
    this.validator = new PlanValidator();
  }
  
  async createPlan(userId, planBody) {
    const plan = await new this.planRepository({ ...planBody, userId }).save();

    return plan;
  }

  async addTaskToPlan(userId, planId, taskId) {
    const task = await this.taskService.getTask(taskId, userId);

    const result = await this.planRepository.updateOne({ _id: planId }, { $addToSet: { tasks: task._id } });
    await this.taskService.updateTask(taskId, userId, { planId });

    return result;
  }

  async getPlan(planId, userId) {
    const plan = await this.planRepository.findOne({ _id: planId, userId });

    this.validator.checkExistence(plan, planId);

    await plan.populate('tasks');
    
    return plan;
  }

  async getAllPlans(userId) {
    const plans = await this.planRepository.find({ userId });

    return plans;
  }

  async updatePlan(planId, userId, fieldsToUpdate) {
    const queryParams = { _id: planId, userId };
    const options = { runValidators: true };

    await this.planRepository.findOneAndUpdate(queryParams, fieldsToUpdate, options);

    return this.getPlan(planId, userId);
  }

  async deletePlan(planId, userId) {
    const queryParams = { _id: planId, userId };

    const plan = await this.planRepository.findOneAndDelete(queryParams);

    this.validator.checkExistence(plan, planId);
  }
}

module.exports = PlanService;
