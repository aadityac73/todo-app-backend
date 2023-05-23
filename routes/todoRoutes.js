const route = require('express').Router();
const { wrapper } = require('../util/errorWrap');
const checkAuth = require('../middlewares/checkAuth');
const {
  addTodo,
  getTodoById,
  updateTodoDescription,
  updateTodoStatus,
  deleteTodoById,
  getTodoListByUser
} = require('../controllers/todoController');
const Validation = require('../validations/todoValidation');
const validationError = require('../middlewares/validationError');

route.post(
  '/',
  Validation.createTodo,
  validationError,
  checkAuth,
  wrapper(addTodo)
);
route.get('/', checkAuth, wrapper(getTodoListByUser));
route.get('/:id', checkAuth, wrapper(getTodoById));
route.put(
  '/:id',
  Validation.createTodo,
  validationError,
  checkAuth,
  wrapper(updateTodoDescription)
);
route.patch(
  '/:id',
  Validation.updateStatus,
  validationError,
  checkAuth,
  wrapper(updateTodoStatus)
);
route.delete('/:id', checkAuth, wrapper(deleteTodoById));

module.exports = route;
