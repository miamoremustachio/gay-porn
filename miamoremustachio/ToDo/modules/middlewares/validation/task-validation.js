const { TaskValidator } = require('../../validators/task-validator.js');

const check = new TaskValidator();

const validateTask = (req, res, next) => {
  const fields = req.body;
    
    try {
      check.all(fields);
    } catch(error) {
      next(error);
      return;
    }

    next();
}

module.exports = { validateTask };