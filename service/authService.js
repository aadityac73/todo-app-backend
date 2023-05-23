const models = require('../models');
const bcrypt = require('bcrypt');
const moment = require('moment');
const envVars = require('../config/envVars');
const jwt = require('jsonwebtoken');

exports.createUser = async (data) => {
  return await models.User.create(data);
};

exports.userLogin = async ({ username, password }) => {
  const user = await models.User.findOne({ email: username }).select(
    '+password'
  );
  if (!user) {
    return [{ message: 'Invalid username' }, null];
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return [{ message: 'Invalid password' }, null];
  }

  const { email, _id, mobileNumber, firstName, lastName } = user;

  const userData = {
    email,
    id: _id,
    mobileNumber,
    firstName,
    lastName
  };

  const expiresAt = moment().add(envVars.JWT_EXPIRY, 'hours');

  const token = jwt.sign(userData, envVars.JWT_SECRET, {
    expiresIn: `${envVars.JWT_EXPIRY}h`
  });

  await models.UserLogger.deleteMany({ userId: userData.id });

  await models.UserLogger.create({ userId: userData.id, token, expiresAt });

  const data = {
    token,
    expiresAt: moment(expiresAt).format('YYYY-MM-DDTHH:mm:ss'),
    userDetails: userData
  };
  return [null, data];
};

exports.userLogout = async (token) => {
  const user = await models.UserLogger.deleteOne({ token });
  return user.deleteCount !== 0;
};
