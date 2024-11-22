const TaskService = require('./task.service');
const Binder = require('../../shared/helpers/bind.helper');
const { getAuthHeader } = require('../../shared/helpers/get-auth-header.helper');

class TaskController {
  constructor(taskService = new TaskService()) {
    this.taskService = taskService;

    new Binder().bind(this);
  }
  
  async createTask(req, res, next) {
    const userId = getAuthHeader(req);
    const body = req.body;
  
    try {
      const task = await this.taskService.createTask(userId, body);
      
      res.status(201).json(task);
  
    } catch (err) {
      next(err);
    }
  }

  async getTask(req, res, next) {
    const userId = getAuthHeader(req);
    const taskId = req.params.taskId;

    try {
      const task = await this.taskService.getTask(userId, taskId);

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
    const userId = getAuthHeader(req);
    const taskId = req.params.taskId;
    const body = req.body;

    try {
      const task = await this.taskService.updateTask(userId, taskId, body);

      res.json(task);

    } catch (err) {
      next(err);
    }
  }

  async deleteTask(req, res, next) {
    const userId = getAuthHeader(req);
    const taskId = req.params.taskId;

    try {
      await this.taskService.deleteTask(userId, taskId);

      res.sendStatus(204);
    
    } catch (err) {
      next(err);
    }
  }
}

module.exports = TaskController;
