const { plans } = require('../../services/plan-services.js');
const { NotFoundError } = require('../../errors/not_found-error.js');

const findPlan = async (req, res, next) => {
  const planId = req.params.id;

  try {
    const plan = await plans.get(planId);
    
    if (!plan) {
      throw new NotFoundError();
    }

    plan.depopulate('tasks');
    res.locals.taskRefs = plan.tasks;
    res.locals.allowedId = plan.user.id;
    
    next();

  } catch(error) {
    next(error);
  }
}

module.exports = { findPlan };