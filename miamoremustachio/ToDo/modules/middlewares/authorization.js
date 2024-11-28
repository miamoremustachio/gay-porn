const checkUserId = (req, res, next) => {
  const userId = req.get('Authorization');
  const allowedId = res.locals.allowedId;
  
  if (userId !== allowedId) {
    return res.sendStatus(403);
  }

  next();
}

module.exports = { checkUserId };