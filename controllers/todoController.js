const {
  createTodo,
  updateTodo,
  getSingleTodo,
  deleteTodo,
  getTodoList
} = require('../service/todoService');

exports.addTodo = async (req, res) => {
  await createTodo({
    userId: req.userData.id,
    description: req.body.description
  });
  return res.status(200).json({ message: 'Todo item created' });
};

exports.updateTodoDescription = async (req, res) => {
  const todo = await updateTodo({
    userId: req.userData.id,
    id: req.params.id,
    data: { description: req.body.description }
  });
  if (todo) {
    return res.status(200).json({ message: 'Todo description updated' });
  }
  return res.status(400).json({ message: 'Invalid todo item' });
};

exports.updateTodoStatus = async (req, res) => {
  const todo = await updateTodo({
    userId: req.userData.id,
    id: req.params.id,
    data: { completed: req.body.completed }
  });
  if (todo) {
    return res.status(200).json({ message: 'Todo status updated' });
  }
  return res.status(400).json({ message: 'Invalid todo item' });
};

exports.getTodoById = async (req, res) => {
  const todo = await getSingleTodo({
    id: req.params.id,
    userId: req.userData.id
  });
  return res.status(200).json(todo);
};

exports.deleteTodoById = async (req, res) => {
  const deleted = await deleteTodo({
    id: req.params.id,
    userId: req.userData.id
  });
  if (deleted) {
    return res.status(200).json({ message: 'Todo item deleted' });
  }
  return res.status(200).json({ message: 'Todo item does not exists' });
};

exports.getTodoListByUser = async (req, res) => {
  const todoList = await getTodoList({
    userId: req.userData.id,
    page_no: req.query.page_no,
    page_size: req.query.page_size
  });
  return res.status(200).json(todoList);
};
