function FilteredDoc(fields, services) {
  // #ToDo: move path-getting into routes
  // (replace 'services' param to 'paths')

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

module.exports = { FilteredDoc };