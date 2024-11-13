const TaskEntity = require('./task.entity');
const { checkTaskExistence, checkAccess } = require('./task.validation');

class TaskService {
  constructor(taskRepository = TaskEntity) {
    this.taskRepository = taskRepository;
  }
  
  async addTask(taskBody, userId) {
    const task = await new this.taskRepository({ ...taskBody, userId }).save();

    return task;
  }

  async getTask(taskId, userId) {
    const task = await this.taskRepository.findById(taskId);

    checkTaskExistence(task, taskId);
    checkAccess(task, userId);

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

    checkTaskExistence(task, taskId);

    return this.getTask(taskId, userId);
  }

  async deleteTask(taskId, userId) {
    const query = { _id: taskId, userId };

    const task = await this.taskRepository.findOneAndDelete(query);

    checkTaskExistence(task, taskId);
  }
}

module.exports = TaskService;
