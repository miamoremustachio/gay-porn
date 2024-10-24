module.exports.HOST = process.env.HOST || 'http://localhost';
module.exports.PORT = process.env.PORT || 3000;
module.exports.API_ENDPOINT = 'https://jsonplaceholder.typicode.com/todos/';

module.exports.URL_PARAMS = {
  TASK_COUNT: 'taskCount',
};

module.exports.ERROR = {
  MISSING_PARAM: {
    TASK_COUNT: `Missing URL param: "${this.URL_PARAMS.TASK_COUNT}"`,
  },
};
