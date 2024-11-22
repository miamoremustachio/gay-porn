const express = require('express');

const { authGuard } = require('../shared/middlewares');
const { TaskController } = require('../modules/task');

const router = express.Router();
const taskController = new TaskController();

router.use(authGuard);

router.route('/')
  .get(taskController.getAllTasks)
  .post(taskController.createTask);

router.route('/:taskId')
  .get(taskController.getTask)
  .put(taskController.updateTask)
  .delete(taskController.deleteTask);

module.exports = router;
