const SubtaskService = require('./subtask.service');
const { getAuthHeader } = require('../../shared/helpers/get-auth-header.helper');

class SubtaskController {
  constructor(subtaskService = new SubtaskService()) {
    this.subtaskService = subtaskService;
  }

  async getParent(req, res, next) {
    const userId = getAuthHeader(req);
    const parentId = req.params.taskId;

    try {
      const parent = await this.subtaskService.getParent(userId, parentId);
      
      res.locals.parent = parent;
      next();
    
    } catch (err) {
      next(err);
    }
  }
  
  async addSubtask(req, res, next) {
    const task = res.locals.parent;
    const body = req.body;

    try {
      const subtask = await this.subtaskService.addSubtask(task, body);
      
      res.status(201).json(subtask);
  
    } catch (err) {
      next(err);
    }
  }

  getSubtask(req, res, next) {
    const task = res.locals.parent;
    const subtaskId = req.params.subtaskId;

    try {
      const subtask = this.subtaskService.getSubtask(task, subtaskId);

      res.json(subtask);

    } catch (err) {
      next(err);
    }
  }

  getAllSubtasks(req, res, next) {
    const task = res.locals.parent;

    try {
      const subtasks = this.subtaskService.getAllSubtasks(task);

      res.json(subtasks);
    
    } catch (err) {
      next(err);
    }
  }

  async updateSubtask(req, res, next) {
    const task = res.locals.parent;
    const subtaskId = req.params.subtaskId;
    const body = req.body;

    try {
      const subtask = await this.subtaskService.updateSubtask(task, subtaskId, body);

      res.json(subtask);

    } catch (err) {
      next(err);
    }
  }

  async deleteSubtask(req, res, next) {
    const task = res.locals.parent;
    const subtaskId = req.params.subtaskId;

    try {
      await this.subtaskService.deleteSubtask(task, subtaskId);

      res.sendStatus(204);
    
    } catch (err) {
      next(err);
    }
  }
}

module.exports = SubtaskController;
