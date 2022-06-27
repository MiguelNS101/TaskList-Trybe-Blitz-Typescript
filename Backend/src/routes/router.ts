import { Router } from 'express';
import TaskController from '../controllers/task.controller';
import StatusController from '../controllers/status.controller';

const router = Router();

const taskController = new TaskController();
const statusController = new StatusController();

router.get('/getTasks', taskController.getAll);
router.get('/getStatus', statusController.getAll);

export default router;
