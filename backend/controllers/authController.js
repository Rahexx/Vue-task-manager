import jwt from 'jsonwebtoken';
import { users } from '../data/users.js';

export const login = (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password,
  );

  if (!user) return res.status(401).json({ message: 'Błędne dane logowania' });

  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
  );
  res.json({ token });
};

export const getProfile = (req, res) => {
  const user = users.find((u) => u.id === req.user.id);
  if (!user) return res.sendStatus(404);
  res.json({ name: user.name, username: user.username });
};
