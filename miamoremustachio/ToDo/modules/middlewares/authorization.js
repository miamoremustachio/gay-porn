const checkUserId = (req, res, next) => {
  const userId = req.get('Authorization');
  const allowedId = res.locals.allowedId;
  
  if (userId !== allowedId) {
    res.sendStatus(403);
    return;
  }

  next();
}

module.exports = { checkUserId };