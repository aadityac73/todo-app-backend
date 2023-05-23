const { body } = require('express-validator');
const { isSingleName, isValidMobileNumber } = require('../util/common');
const models = require('../models');

const checkName = (val, param) => {
  if (val.includes(' ')) {
    return Promise.reject(`White spaces are not allowed in ${param}`);
  } else if (!isSingleName(val)) {
    return Promise.reject(`Numeric characters are not allowed in ${param}`);
  }
  return true;
};

const checkPassword = (val) => {
  const re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%&-]).{8,}/;
  if (!re.test(val)) {
    return Promise.reject('please check password format');
  }
  return true;
};

exports.login = [
  body('username')
    .not()
    .isEmpty()
    .withMessage('username is required')
    .normalizeEmail()
    .isEmail()
    .withMessage('username should be a valid email'),

  body('password')
    .not()
    .isEmpty()
    .withMessage('password is required')
    .custom(checkPassword)
];

exports.register = [
  body('firstName')
    .not()
    .isEmpty()
    .withMessage('firstName is required')
    .custom((val) => checkName(val, 'firstName')),

  body('lastName')
    .not()
    .isEmpty()
    .withMessage('lastName is required')
    .custom((val) => checkName(val, 'lastName')),

  body('email')
    .not()
    .isEmpty()
    .withMessage('email is required')
    .normalizeEmail()
    .isEmail()
    .withMessage('please enter a valid email')
    .custom(async (val) => {
      const user = await models.User.findOne({ email: val });
      if (user) {
        return Promise.reject('user with given email is already exist!');
      }
      return true;
    }),

  body('mobileNumber')
    .not()
    .isEmpty()
    .withMessage('mobileNumber is required')
    .custom(async (val) => {
      if (!isValidMobileNumber(val)) {
        return Promise.reject('Please enter a valid mobileNumber');
      }
      const user = await models.User.findOne({ mobileNumber: val });
      if (user) {
        return Promise.reject('user with given mobileNumber is already exist!');
      }
      return true;
    }),

  body('password')
    .not()
    .isEmpty()
    .withMessage('password is required')
    .custom(checkPassword)
];
