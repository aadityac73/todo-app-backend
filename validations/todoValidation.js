const { body } = require('express-validator');

exports.createTodo = [
  body('description').not().isEmpty().withMessage('description is required')
];

exports.updateStatus = [
  body('completed').not().isEmpty().withMessage('completed is required')
];
