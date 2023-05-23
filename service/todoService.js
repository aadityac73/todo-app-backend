const models = require('../models');

exports.createTodo = async ({ description, userId }) => {
  return await models.Todo.create({ description, userId });
};

exports.updateTodo = async ({ data, userId, id }) => {
  const todo = await models.Todo.findOneAndUpdate({ _id: id, userId }, data);
  return todo;
};

exports.deleteTodo = async ({ id, userId }) => {
  const todo = await models.Todo.deleteOne({ _id: id, userId });
  return todo.deleteCount !== 0;
};

exports.getSingleTodo = async ({ id, userId }) => {
  return await models.Todo.findOne({ _id: id, userId });
};

exports.getTodoList = async ({ userId, page_no = 1, page_size = 10 }) => {
  return await models.Todo.find({ userId })
    .limit(Number(page_size))
    .skip(Number(page_size) * (Number(page_no) - 1))
    .sort({ updatedAt: 'desc' });
};
