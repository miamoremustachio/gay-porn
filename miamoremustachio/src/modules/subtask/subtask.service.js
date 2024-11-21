const { TaskEntity } = require('../task/index');
const SubtaskValidator = require('./subtask.validator');

class SubtaskService {
  constructor(taskRepository = TaskEntity) {
    this.parentRepository = taskRepository;
    this.validator = new SubtaskValidator();
  }

  async getParent(userId, parentId) {
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

  getSubtask(parent, subtaskId) {
    const subtask = parent.subtasks.id(subtaskId);

    this.validator.checkSubtaskExistence(subtask, subtaskId);

    return subtask;
  }

  getAllSubtasks(parent) {
    const subtasks = parent.subtasks;

    return subtasks;
  }

  async updateSubtask(parent, subtaskId, fieldsToUpdate) {
    const subtask = this.getSubtask(parent, subtaskId);

    subtask.set(fieldsToUpdate);

    await parent.save();

    return subtask;
  }

  async deleteSubtask(parent, subtaskId) {
    const subtask = this.getSubtask(parent, subtaskId);

    subtask.deleteOne();

    await parent.save();
  }
}

module.exports = SubtaskService;
