function showErrorMessage(error) {
  console.error(`✗ ${error.name}: ${error.message}`);
}

module.exports = {
  showErrorMessage,
};