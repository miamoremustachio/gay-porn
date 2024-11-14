const { TaskEntity } = require('../task/index');
const SubtaskValidator = require('./subtask.validator');

class SubtaskService {
  constructor(taskRepository = TaskEntity) {
    this.parentRepository = taskRepository;
    this.validator = new SubtaskValidator();
  }

  async getParent(parentId, userId) {
    const parent = await this.parentRepository.findById(parentId);
    
    this.validator.checkExistence(parent, parentId);
    this.validator.checkAccess(parent, userId);

    return parent;
  }
  
  async addSubtask(parent, subtaskBody) {
    const task = parent;

    task.subtasks.push(subtaskBody);
    await task.save();

    const subtask = task.subtasks.at(-1);

    return subtask;
  }

  async getSubtask(parent, subtaskId) {
    const task = parent;
    const subtask = task.subtasks.id(subtaskId);

    this.validator.checkSubtaskExistence(subtask, subtaskId);

    return subtask;
  }

  async getAllSubtasks(parent) {
    const task = parent;
    const subtasks = task.subtasks;

    return subtasks;
  }

  async updateSubtask(parent, subtaskId, fieldsToUpdate) {
    const task = parent;
    const subtask = task.subtasks.find(subtask => subtask.id === subtaskId);

    this.validator.checkSubtaskExistence(subtask, subtaskId);

    subtask.set(fieldsToUpdate);

    await task.save();

    return subtask;
  }

  async deleteSubtask(parent, subtaskId) {
    const task = parent;
    const subtask = task.subtasks.find(subtask => subtask.id === subtaskId);

    this.validator.checkSubtaskExistence(subtask, subtaskId);

    subtask.deleteOne();

    await task.save();
  }
}

module.exports = SubtaskService;
