import { Router } from 'express';
import TaskController from '../controllers/task.controller';

const router = Router();

const taskController = new TaskController();

router.get('/getTasks', taskController.getAll);

export default router;
