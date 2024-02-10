const { checkTask } = require('../../validators/task-validator.js');

const validateTask = (req, res, next) => {
  const fields = req.body;
    
    try {
      checkTask.all(fields);
    } catch(error) {
      next(error);
      return;
    }

    next();
}

module.exports = { validateTask };