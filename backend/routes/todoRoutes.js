const express = require("express");
const Todo = require("../models/Todo");
const router = express.Router();

// GET /api/todos - Get all todos for the logged-in user
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find(); // Adjust to filter by user if necessary
    let todoHtml = todos
      .map((todo) => {
        return `
        <li id="todo-${todo._id}">
          ${todo.text}
          <button hx-delete="/api/todos/${todo._id}" hx-target="#todo-${todo._id}" hx-swap="outerHTML">Delete</button>
        </li>`;
      })
      .join("");
    res.send(todoHtml);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// POST /api/todos - Create a new todo
router.post("/", async (req, res) => {
  const { text } = req.body;
  try {
    const newTodo = new Todo({
      text,
    });
    const todo = await newTodo.save();
    res.send(`
      <li id="todo-${todo._id}">
        ${todo.text}
        <button hx-delete="/api/todos/${todo._id}" hx-target="#todo-${todo._id}" hx-swap="outerHTML">Delete</button>
      </li>
    `);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// DELETE /api/todos/:id - Delete a todo
router.delete("/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.send("Todo deleted");
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
