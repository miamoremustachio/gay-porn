const express = require('express');

const { authGuard } = require('../shared/middlewares');
const { SubtaskController } = require('../modules/subtask');

const router = express.Router();
const subtaskController = new SubtaskController();

router.use(authGuard);

router.route('/:taskId/subtask')
  .all(subtaskController.getParent.bind(subtaskController))
  .get(subtaskController.getAllSubtasks.bind(subtaskController))

  .post(subtaskController.addSubtask.bind(subtaskController));

router.route('/:taskId/subtask/:subtaskId')
  .all(subtaskController.getParent.bind(subtaskController))
  .get(subtaskController.getSubtask.bind(subtaskController))
  .put(subtaskController.updateSubtask.bind(subtaskController))
  .delete(subtaskController.deleteSubtask.bind(subtaskController));

module.exports = router;
