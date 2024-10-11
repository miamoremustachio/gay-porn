const { PlanValidator } = require('../../validators/plan-validator.js');

const check = new PlanValidator();

const validatePlan = (req, res, next) => {
  const fields = req.body;

  try {
    check.all(fields);
  } catch(error) {
    next(error);
    return;
  }

  next();
}

module.exports = { validatePlan };