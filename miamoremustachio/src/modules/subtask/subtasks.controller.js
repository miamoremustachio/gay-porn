const SubtaskService = require('./subtask.service');

class SubtaskController {
  constructor(subtaskService = new SubtaskService()) {
    this.subtaskService = subtaskService;
  }

  async getParent(req, res, next) {
    const parentId = req.params.taskId;
    const userId = req.get('Authorization');

    try {
      const parent = await this.subtaskService.getParent(parentId, userId);
      
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
      
      res.status(201).send(subtask);
  
    } catch (err) {
      next(err);
    }
  }

  async getSubtask(req, res, next) {
    const task = res.locals.parent;
    const subtaskId = req.params.subtaskId;

    try {
      const subtask = await this.subtaskService.getSubtask(task, subtaskId);

      res.json(subtask);

    } catch (err) {
      next(err);
    }
  }

  async getAllSubtasks(req, res, next) {
    const task = res.locals.parent;

    try {
      const subtasks = await this.subtaskService.getAllSubtasks(task);

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

      res.send(subtask);

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
