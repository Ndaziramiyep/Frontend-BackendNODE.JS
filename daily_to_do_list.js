const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Simple in-memory array to store todo items
let todos = [];

// Route to get all todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// Route to add a todo
app.post('/todos', (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }
  const todo = { id: todos.length + 1, text };
  todos.push(todo);
  res.status(201).json(todo);
});

// Route to delete a todo
app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  todos = todos.filter(todo => todo.id !== parseInt(id));
  res.sendStatus(204);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
