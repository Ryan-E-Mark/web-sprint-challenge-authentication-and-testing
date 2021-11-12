const { JWT_SECRET } = require('../secrets/index')
const jwt = require('jsonwebtoken')


module.exports = (req, res, next) => {
  const token = req.headers.authorization
  if (!token) {
    return next({status: 404, message: "token required"});
  }
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
  if (err) {
    return next({status: 404, message: "token invalid"});
  }
  req.decodedJwt = decoded;
  next();
  })
};
