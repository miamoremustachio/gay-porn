const { ObjectId } = require('mongodb');

async function isDocumentExists(collection, id) {
  const document = await collection.findOne({ _id: new ObjectId(id) });
  return document ? true : false;
}

module.exports = { isDocumentExists };