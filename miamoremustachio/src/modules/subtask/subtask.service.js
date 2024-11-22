const { TaskEntity } = require('../task/index');
const SubtaskChecker = require('./subtask.checker');

class SubtaskService {
  constructor(taskRepository = TaskEntity) {
    this.parentRepository = taskRepository;
    this.checker = new SubtaskChecker();
  }

  async getParent(userId, parentId) {
    const parent = await this.parentRepository.findById(parentId);
    
    this.checker.checkExistence(parent, parentId);
    this.checker.checkAccess(parent, userId);

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

    this.checker.checkSubtaskExistence(subtask, subtaskId);

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
