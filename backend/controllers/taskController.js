import { users } from '../data/users.js';

export const getTasks = (req, res) => {
  const user = users.find((u) => u.id === req.user.id);
  res.json(user.tasks);
};

export const addTask = (req, res) => {
  const user = users.find((u) => u.id === req.user.id);
  const newTask = { id: Date.now(), text: req.body.text };
  user.tasks.push(newTask);
  res.status(201).json(newTask);
};

export const deleteTask = (req, res) => {
  const user = users.find((u) => u.id === req.user.id);
  user.tasks = user.tasks.filter((task) => task.id !== parseInt(req.params.id));
  res.sendStatus(204);
};
