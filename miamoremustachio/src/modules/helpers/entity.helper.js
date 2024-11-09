const { ObjectId } = require('mongodb');

const getId = insertionResult => insertionResult.insertedId.toJSON();

function SearchByIdFilter(id) {
  this._id = ObjectId.createFromHexString(id);
}

function ReturnDocumentOption(value) {
  this.returnDocument = value;
}

module.exports = {
  getId,
  SearchByIdFilter,
  ReturnDocumentOption,
};
