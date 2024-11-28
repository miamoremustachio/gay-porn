function getFinalResourceId(endpoint) {
  const startIndex = endpoint.lastIndexOf('/') + 1;
  const resourceId = endpoint.slice(startIndex);
  return resourceId;
}

module.exports = { getFinalResourceId };