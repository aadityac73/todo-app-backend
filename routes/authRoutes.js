const route = require('express').Router();
const { register, login, logout } = require('../controllers/authController');
const { wrapper } = require('../util/errorWrap');
const checkAuth = require('../middlewares/checkAuth');
const Validation = require('../validations/authValidations');
const validationError = require('../middlewares/validationError');

route.post('/signup', Validation.register, validationError, wrapper(register));
route.post('/login', Validation.login, validationError, wrapper(login));
route.post('/logout', checkAuth, wrapper(logout));

module.exports = route;
