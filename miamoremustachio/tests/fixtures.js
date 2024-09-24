const { 
  MAX_TITLE_LENGTH,
  STATUSES,
} = require('../app/modules/constants');

const fixtures = {
  titles: {
    valid: [ 'foo', 'bar', 'baz' ],
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