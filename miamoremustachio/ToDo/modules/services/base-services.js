class BaseServices {
  constructor(model) {
    this.model = model;
  }

  get(id) {
    return this.model.findById(id);
  }

  getAll(filter) {
    return this.model.find(filter);
  }

  getPaths() {
    return Object.keys(this.model.schema.paths);
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
}

module.exports = { BaseServices };