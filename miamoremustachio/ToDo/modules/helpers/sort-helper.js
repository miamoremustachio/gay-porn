const DEFAULT_SORT_ORDER = 'ascending';

function SortField(field, order) {
  this[field] = order || DEFAULT_SORT_ORDER;
}

module.exports = { SortField };