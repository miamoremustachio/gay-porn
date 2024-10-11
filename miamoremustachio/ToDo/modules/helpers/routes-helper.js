function FilteredDoc(fields, services) {
  const paths = services.getPaths();

  for (const field in fields) {
    if (paths.includes(field)) {
      this[field] = fields[field];
    }
  }

  if (fields.user) {
    this.user = fields.user;
  }
}

function getFinalResourceId(endpoint) {
  const startIndex = endpoint.lastIndexOf('/') + 1;
  const resourceId = endpoint.slice(startIndex);
  return resourceId;
}

module.exports = {
  FilteredDoc,
  getFinalResourceId,
};