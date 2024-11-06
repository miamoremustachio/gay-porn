function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.statusCode || 500).json(err.response || err.message);
}

module.exports = errorHandler;
