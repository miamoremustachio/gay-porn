const TaskEntity = require('./task.entity');
const TaskValidator = require('./task.validator');

class TaskService {
  constructor(taskRepository = TaskEntity) {
    this.taskRepository = taskRepository;
    this.validator = new TaskValidator();
  }
  
  async addTask(userId, taskBody) {
    const task = await new this.taskRepository({ userId, ...taskBody }).save();

    return task;
  }

  async getTask(taskId, userId) {
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

  async updateTask(taskId, userId, fieldsToUpdate) {
    const query = { _id: taskId, userId };
    const options = { runValidators: true };

    const task = await this.taskRepository.findOneAndUpdate(query, fieldsToUpdate, options);

    this.validator.checkExistence(task, taskId);

    return this.getTask(taskId, userId);
  }

  async deleteTask(taskId, userId) {
    const query = { _id: taskId, userId };

    const task = await this.taskRepository.findOneAndDelete(query);

    this.validator.checkExistence(task, taskId);
  }
}

module.exports = TaskService;
