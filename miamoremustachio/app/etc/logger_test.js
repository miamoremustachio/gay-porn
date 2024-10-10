const { genderize } = require('../main');
const { Logger } = require('../modules/logger');

const logger = new Logger();

logger.start();

genderize('oleg')
  .then(logger.end)
  .then(logger.log)
  .finally(logger.clear);