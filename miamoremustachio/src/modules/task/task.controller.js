const TaskService = require('./task.service');
const { getAuthHeader } = require('../../shared/helpers/get-auth-header.helper');

class TaskController {
  constructor(taskService = new TaskService()) {
    this.taskService = taskService;
  }
  
  async addTask(req, res, next) {
    const userId = getAuthHeader(req);
    const body = req.body;
  
    try {
      const task = await this.taskService.addTask(userId, body);
      
      res.status(201).send(task);
  
    } catch (err) {
      next(err);
    }
  }

  async getTask(req, res, next) {
    const taskId = req.params.taskId;
    const userId = getAuthHeader(req);

    try {
      const task = await this.taskService.getTask(taskId, userId);

      res.json(task);

    } catch (err) {
      next(err);
    }
  }

  async getAllTasks(req, res, next) {
    const userId = getAuthHeader(req);
    
    try {
      const tasks = await this.taskService.getAllTasks(userId);

      res.json(tasks);
    
    } catch (err) {
      next(err);
    }
  }

  async updateTask(req, res, next) {
    const taskId = req.params.taskId;
    const userId = getAuthHeader(req);
    const body = req.body;

    try {
      const task = await this.taskService.updateTask(taskId, userId, body);

      res.send(task);

    } catch (err) {
      next(err);
    }
  }

  async deleteTask(req, res, next) {
    const taskId = req.params.taskId;
    const userId = getAuthHeader(req);

    try {
      await this.taskService.deleteTask(taskId, userId);

      res.sendStatus(204);
    
    } catch (err) {
      next(err);
    }
  }
}

module.exports = TaskController;
