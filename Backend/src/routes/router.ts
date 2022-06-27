import { Router } from 'express';
import TaskController from '../controllers/task.controller';
import StatusController from '../controllers/status.controller';
import validationTask from '../middlewares/task.middlewares';

const router = Router();

const taskController = new TaskController();
const statusController = new StatusController();

router.get('/getTasks', taskController.getAll);
router.get('/getStatus', statusController.getAll);
router.post('/createTask', validationTask, taskController.create);

export default router;
