class BaseServices {
  constructor(model) {
    this.model = model;
  }

  create(doc) {
    return this.model.create(doc);
  }

  update(id, update, options) {
    return this.model.findByIdAndUpdate(id, update, options);
  }
  
  delete(id) {
    return this.model.findByIdAndDelete(id);
  }

  getPaths() {
    return Object.keys(this.model.schema.paths);
  }
}

module.exports = { BaseServices };