const express = require('express');

const { authGuard } = require('../shared/middlewares');
const { TaskController } = require('../modules/task');

const router = express.Router();
const taskController = new TaskController();

router.use(authGuard);

router.route('/')
  .get(taskController.getAllTasks.bind(taskController))
  .post(taskController.createTask.bind(taskController));

router.route('/:taskId')
  .get(taskController.getTask.bind(taskController))
  .put(taskController.updateTask.bind(taskController))
  .delete(taskController.deleteTask.bind(taskController));

module.exports = router;
