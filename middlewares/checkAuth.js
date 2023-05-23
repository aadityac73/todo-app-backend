const models = require('../models');
const jwt = require('jsonwebtoken');
const envVars = require('../config/envVars');

const checkAuth = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'auth failed' });
  }
  const checkToken = await models.UserLogger.findOne({ token });
  if (!checkToken) {
    return res.status(401).json({ message: 'auth failed' });
  }
  try {
    const decoded = jwt.verify(token, envVars.JWT_SECRET);
    req.userData = decoded;
    next();
  } catch (error) {
    await models.UserLogger.findOneAndRemove({ token });
    return res.status(401).json({ message: 'auth failed' });
  }
};

module.exports = checkAuth;
