const TaskEntity = require('./task.entity');
const { NotFoundException } = require('../../shared/exceptions');

class TaskService {
  constructor(taskRepository = TaskEntity) {
    this.taskRepository = taskRepository;
  }
  
  async addTask(taskBody) {
    const task = await new this.taskRepository(taskBody).save();

    return task;
  }

  async getTask(taskId) {
    const task = await this.taskRepository.findById(taskId);

    if (!task) {
      throw new NotFoundException(`Task #${taskId} not found.`);
    }

    await task.populate('userId');
    
    const taskObj = task.toObject();
    taskObj['user'] = task.userId;
    delete taskObj.userId;

    return taskObj;
  }

  async getAllTasks() {
    const tasks = await this.taskRepository.find();

    return tasks;
  }

  async updateTask(taskId, fieldsToUpdate) {
    const task = await this.taskRepository.findByIdAndUpdate(taskId, fieldsToUpdate, { runValidators: true });

    if (!task) {
      throw new NotFoundException(`Task #${taskId} not found.`);
    }

    return task;
  }

  async deleteTask(taskId) {
    const task = await this.taskRepository.findByIdAndDelete(taskId);

    if (!task) {
      throw new NotFoundException(`Task #${taskId} not found.`);
    }
  }
}

module.exports = TaskService;
