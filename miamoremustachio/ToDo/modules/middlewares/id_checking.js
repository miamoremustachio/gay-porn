const { Task } = require('../models/task.js');
const { ERROR_MESSAGES } = require('../helpers/constants.js');
const { TASK_NOT_FOUND } = ERROR_MESSAGES;

const checkId = async (req, res, next) => {
  const id = req.params.id;
  
  try {
    const task = await Task.findById(id);

    if (!task) {
      throw new Error(TASK_NOT_FOUND);
    }
  } catch(error) {
    return res.status(404).send(error.message);
  }

  next();
}

module.exports = { checkId };