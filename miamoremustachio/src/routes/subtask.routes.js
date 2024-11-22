const express = require('express');

const { authGuard } = require('../shared/middlewares');
const { SubtaskController } = require('../modules/subtask');

const router = express.Router();
const subtaskController = new SubtaskController();

router.use(authGuard);

router.route('/:taskId/subtask')
  .all(subtaskController.getParent)
  .get(subtaskController.getAllSubtasks)
  .post(subtaskController.addSubtask);

router.route('/:taskId/subtask/:subtaskId')
  .all(subtaskController.getParent)
  .get(subtaskController.getSubtask)
  .put(subtaskController.updateSubtask)
  .delete(subtaskController.deleteSubtask);

module.exports = router;
