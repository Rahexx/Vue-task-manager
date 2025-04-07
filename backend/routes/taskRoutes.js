import express from 'express';
import {
  getTasks,
  addTask,
  deleteTask,
} from '../controllers/taskController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authenticateToken);
router.get('/', getTasks);
router.post('/', addTask);
router.delete('/:id', deleteTask);

export default router;
