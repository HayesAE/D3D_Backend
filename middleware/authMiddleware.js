const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(403).send("No token");

  try {
    const decoded = jwt.verify(auth.split(' ')[1], process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).send("Invalid token");
  }
};