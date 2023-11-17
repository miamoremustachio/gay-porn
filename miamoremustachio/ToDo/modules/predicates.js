const { ObjectId } = require('mongodb');

async function isTaskExists(collection, id) {
  const taskFound = await collection.findOne({ _id: new ObjectId(id) });
  return taskFound ? true : false;
}

module.exports = { isTaskExists };