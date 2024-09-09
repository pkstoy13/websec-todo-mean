const Todo = require("../models/Todo");

// Get all todos
const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Create a new todo
const createTodo = async (req, res) => {
  const { title } = req.body;
  try {
    const newTodo = new Todo({
      title,
    });
    const savedTodo = await newTodo.save();
    res.json(savedTodo);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getTodos,
  createTodo,
};
