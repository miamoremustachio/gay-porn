const TaskEntity = require('./task.entity');
const TaskValidator = require('./task.validator');

class TaskService {
  constructor(taskRepository = TaskEntity) {
    this.taskRepository = taskRepository;
    this.validator = new TaskValidator();
  }
  
  async createTask(userId, taskBody) {
    const task = await new this.taskRepository({ ...taskBody, userId }).save();

    return task;
  }

  async getTask(userId, taskId) {
    const task = await this.taskRepository.findById(taskId);

    this.validator.checkExistence(task, taskId);
    this.validator.checkAccess(task, userId);

    await task.populate('userId');
    
    const taskObj = task.toObject();
    taskObj['user'] = task.userId;
    delete taskObj.userId;

    return taskObj;
  }

  async getAllTasks(userId) {
    const tasks = await this.taskRepository.find({ userId });

    return tasks;
  }

  async updateTask(userId, taskId, fieldsToUpdate) {
    const queryParams = { _id: taskId, userId };
    const options = { runValidators: true };

    const task = await this.taskRepository.findOneAndUpdate(queryParams, fieldsToUpdate, options);

    this.validator.checkExistence(task, taskId);

    return task;
  }

  async deleteTask(userId, taskId) {
    const queryParams = { _id: taskId, userId };

    const task = await this.taskRepository.findOneAndDelete(queryParams);

    this.validator.checkExistence(task, taskId);
  }
}

module.exports = TaskService;
