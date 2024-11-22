const express = require('express');

const { authGuard } = require('../shared/middlewares');
const { TaskController, TaskValidator } = require('../modules/task');

const router = express.Router();
const taskController = new TaskController();
const taskValidator = new TaskValidator();
const { validateBody } = taskValidator;

router.use(authGuard);

router.route('/')
  .get(taskController.getAllTasks)
  .post(validateBody(), taskController.createTask);

router.route('/:taskId')
  .get(taskController.getTask)
  .put(validateBody(), taskController.updateTask)
  .delete(taskController.deleteTask);

module.exports = router;
