import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import TaskService from '../services/task.service';

class TaskController {
  constructor(private taskService = new TaskService()) { }

  public getAll = async (_req: Request, res: Response) => {
    const result = await this.taskService.getAll();
    res.status(StatusCodes.OK).json(result);
  };
}

export default TaskController;
