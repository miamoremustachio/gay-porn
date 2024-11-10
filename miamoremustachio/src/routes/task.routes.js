const express = require('express');

const { TaskController } = require('../modules/task');

const router = express.Router();
const taskController = new TaskController();

router.route('/')
  .get(taskController.getAllTasks.bind(taskController))
    
  .post(taskController.addTask.bind(taskController));

router.route('/:id')
  .get(taskController.getTask.bind(taskController))

  .put(taskController.updateTask.bind(taskController))

  .delete(taskController.deleteTask.bind(taskController));

module.exports = router;
