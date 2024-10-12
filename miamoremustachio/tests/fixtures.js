const { 
  MIN_TITLE_LENGTH,
  MAX_TITLE_LENGTH,
  STATUSES,
} = require('../app/modules/constants');

const fixtures = {
  titles: {
    valid: [ 'a'.repeat(MIN_TITLE_LENGTH + 1), 'a'.repeat(MAX_TITLE_LENGTH - 1), 'oleg' ],
    invalid: [ 1, null, 'a'.repeat(MAX_TITLE_LENGTH) ],
  },
  statuses: {
    valid: STATUSES.DONE, 
    invalid: 'a',
  },
  ids: {
    valid: [ 1, 2, 3 ],
    invalid: [ '1', '2', '3' ],
  },
};

module.exports = { fixtures };