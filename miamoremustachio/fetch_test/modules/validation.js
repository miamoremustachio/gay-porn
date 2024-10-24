const { URL_PARAMS, ERROR } = require('./config');

const { TASK_COUNT } = URL_PARAMS;

const validationLayer = {
  [TASK_COUNT]: {
    fn: taskCount => isFinite(Number(taskCount)) && Number(taskCount) > 0,
    errorMessage: ERROR.TASK_COUNT_PARAM.INVALID,
  },
};

module.exports.isTaskCountParamValid = validationLayer[TASK_COUNT].fn;
