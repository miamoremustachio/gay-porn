const { ObjectId } = require('mongoose').Types;

const PlanEntity = require('./plan.entity');
const PlanChecker = require('./plan.checker');
const TaskService = require('../task/task.service');

class PlanService {
  constructor(planRepository = PlanEntity, taskService = new TaskService()) {
    this.planRepository = planRepository;
    this.taskService = taskService;
    this.checker = new PlanChecker();
  }
  
  async createPlan(userId, planBody) {
    const plan = await new this.planRepository({ ...planBody, userId }).save();

    return plan;
  }

  async addTask(userId, planId, taskId) {
    const task = await this.taskService.getTask(userId, taskId);

    const queryParams = { _id: planId, userId };
    const fieldsToUpdate = { $addToSet: { tasks: task._id } };

    const result = await this.planRepository.updateOne(queryParams, fieldsToUpdate);

    if (result.modifiedCount) {
      await this.taskService.updateTask(userId, taskId, { planId });
    }

    return result;
  }

  async getPlan(userId, planId) {
    const queryParams = { _id: planId, userId };
    const plan = await this.planRepository.findOne(queryParams);

    this.checker.checkExistence(plan, planId);

    await plan.populate('tasks');
    
    return plan;
  }

  async getAllPlans(userId) {
    const plans = await this.planRepository.find({ userId });

    return plans;
  }

  async getNumberOfTasks(userId, planId) {
    const matchFilter = {
      _id: ObjectId.createFromHexString(planId),
      userId: ObjectId.createFromHexString(userId),
    };

    const projection = {
      title: '$title',
      numberOfTasks: { $size: '$tasks' },
    };

    const plan = await this.planRepository.aggregate()
      .match(matchFilter)
      .project(projection)
      .exec();

      return plan;
  }

  async updatePlan(userId, planId, fieldsToUpdate) {
    const queryParams = { _id: planId, userId };
    const options = { runValidators: true };

    await this.planRepository.findOneAndUpdate(queryParams, fieldsToUpdate, options);

    return this.getPlan(userId, planId);
  }

  async deletePlan(userId, planId) {
    const queryParams = { _id: planId, userId };

    const plan = await this.planRepository.findOneAndDelete(queryParams);

    this.checker.checkExistence(plan, planId);
  }
}

module.exports = PlanService;
