const { UserValidator } = require('../../validators/user-validator.js');

const check = new UserValidator();

const validateUser = (req, res, next) => {
  const fields = req.body;
  
  try {
    check.all(fields);
  } catch(error) {
    next(error);
    return;
  }

  next();
}

module.exports = { validateUser };