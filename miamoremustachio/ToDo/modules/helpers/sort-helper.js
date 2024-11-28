const { DEFAULT_SORT_ORDER } = require('./constants.js');

function SortField(field, order) {
  this[field] = order || DEFAULT_SORT_ORDER;
}

module.exports = { SortField };