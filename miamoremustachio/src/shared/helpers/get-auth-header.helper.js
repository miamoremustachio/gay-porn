const getAuthHeader = req => req.get('Authorization');

module.exports = { getAuthHeader };
