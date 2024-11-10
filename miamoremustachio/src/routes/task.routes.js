const express = require('express');

const { authGuard } = require('../shared/middlewares');
const { TaskController } = require('../modules/task');

const router = express.Router();
const taskController = new TaskController();

router.route('/')
  .get(authGuard, taskController.getAllTasks.bind(taskController))
    
  .post(taskController.addTask.bind(taskController));

router.route('/:id')
  .get(authGuard, taskController.getTask.bind(taskController))

  .put(authGuard, taskController.updateTask.bind(taskController))

  .delete(authGuard, taskController.deleteTask.bind(taskController));

module.exports = router;
