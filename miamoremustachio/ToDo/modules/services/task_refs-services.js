const { plans } = require('./plan-services.js');

class Services {
  constructor(collection) {
    this.collection = collection;
  }

  async add(planId, taskRefs) {
    const plan = await this.collection.get(planId);
    
    plan.tasks.push(...taskRefs);
    await plan.save();
  
    const lastTaskRef = plan.tasks.at(-1);
    return lastTaskRef._id;
  }

  async get(planId, taskId) {
    const plan = await this.collection.get(planId);
    const task = plan.tasks.find(task => taskId === task._id.toString());
  
    return task;
  }

  async delete(planId, taskId) {
    const plan = await this.collection.get(planId);
  
    plan.tasks = plan.tasks.filter(task => taskId !== task._id.toString());
    await plan.save();
  }
}

const taskRefs = new Services(plans);

module.exports = { taskRefs };