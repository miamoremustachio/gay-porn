const express = require('express');

const { authGuard } = require('../shared/middlewares');
const { SubtaskController, SubtaskValidator } = require('../modules/subtask');

const router = express.Router();
const subtaskController = new SubtaskController();
const subtaskValidator = new SubtaskValidator();
const { validateBody } = subtaskValidator;

router.use(authGuard);

router.route('/:taskId/subtask')
  .all(subtaskController.getParent)
  .get(subtaskController.getAllSubtasks)
  .post(validateBody(), subtaskController.addSubtask);

router.route('/:taskId/subtask/:subtaskId')
  .all(subtaskController.getParent)
  .get(subtaskController.getSubtask)
  .put(validateBody(), subtaskController.updateSubtask)
  .delete(subtaskController.deleteSubtask);

module.exports = router;
