const TaskService = require('./task.service');

class TaskController {
  constructor(taskService = new TaskService()) {
    this.taskService = taskService;
  }
  
  async addTask(req, res, next) {
    const body = req.body;
  
    try {
      const task = await this.taskService.addTask(body);
      
      res.status(201).send(task);
  
    } catch (err) {
      next(err);
    }
  }

  async getTask(req, res, next) {
    const taskId = req.params.id;

    try {
      const task = await this.taskService.getTask(taskId);

      res.json(task);

    } catch (err) {
      next(err);
    }
  }

  async getAllTasks(req, res, next) {
    const userId = req.get('Authorization');
    
    try {
      const tasks = await this.taskService.getAllTasks(userId);

      res.json(tasks);
    
    } catch (err) {
      next(err);
    }
  }

  async updateTask(req, res, next) {
    const taskId = req.params.id;
    const body = req.body;

    try {
      const task = await this.taskService.updateTask(taskId, body);

      res.send(task);

    } catch (err) {
      next(err);
    }
  }

  async deleteTask(req, res, next) {
    const taskId = req.params.id;

    try {
      await this.taskService.deleteTask(taskId);

      res.sendStatus(204);
    
    } catch (err) {
      next(err);
    }
  }
}

module.exports = TaskController;
