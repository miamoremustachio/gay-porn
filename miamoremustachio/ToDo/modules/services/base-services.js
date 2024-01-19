class BaseServices {
  constructor(model) {
    this.model = model;
  }

  create(doc) {
    return this.model.create(doc);
  }

  getPaths() {
    return Object.keys(this.model.schema.paths);
  }

  update(id, update, options) {
    return this.model.findByIdAndUpdate(id, update, options);
  }

  delete(id) {
    return this.model.findByIdAndDelete(id);
  }
}

module.exports = { BaseServices };