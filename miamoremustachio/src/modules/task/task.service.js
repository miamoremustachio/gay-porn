const TaskEntity = require('./task.entity');
const TaskChecker = require('./task.checker');

class TaskService {
  constructor(taskRepository = TaskEntity) {
    this.taskRepository = taskRepository;
    this.checker = new TaskChecker();
  }
  
  async createTask(userId, taskBody) {
    const task = await new this.taskRepository({ ...taskBody, userId }).save();

    return task;
  }

  async getTask(userId, taskId) {
    const task = await this.taskRepository.findById(taskId);

    this.checker.checkExistence(task, taskId);
    this.checker.checkAccess(task, userId);

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
    const options = { new: true, runValidators: true };

    const task = await this.taskRepository.findOneAndUpdate(queryParams, fieldsToUpdate, options);

    this.checker.checkExistence(task, taskId);

    return task;
  }

  async deleteTask(userId, taskId) {
    const queryParams = { _id: taskId, userId };

    const task = await this.taskRepository.findOneAndDelete(queryParams);

    this.checker.checkExistence(task, taskId);
  }
}

module.exports = TaskService;
