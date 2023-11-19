const { ObjectId } = require('mongodb');

const { tasks } = require('./database/collections.js');

const toDo = {
  collection: tasks,
  add(task) {
    return this.collection.insertOne(task);
  },
  get(id) {
    return this.collection.findOne({ _id: new ObjectId(id) });
  },
  getAll() {
    return this.collection.find().toArray();
  },
  edit(task) {
    const { id, ...restProperties } = task;

    return this.collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: restProperties }
    );
  },
  delete(id) {
    return this.collection.deleteOne({ _id: new ObjectId(id) });
  }
}

module.exports = { toDo };