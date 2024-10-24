module.exports.HOST = process.env.HOST || 'http://localhost';
module.exports.PORT = process.env.PORT || 3000;
module.exports.API_ENDPOINT = 'https://jsonplaceholder.typicode.com/todos/';

module.exports.URL_PARAMS = {
  TASK_COUNT: 'taskCount',
};

module.exports.ERROR = {
  TASK_COUNT_PARAM: {
    MISSING: `Missing URL param: "${this.URL_PARAMS.TASK_COUNT}".`,
    INVALID: `Invalid URL param "${this.URL_PARAMS.TASK_COUNT}": a finite number expected.`,
  },
};
