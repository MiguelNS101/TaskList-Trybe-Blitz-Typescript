import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import TaskService from '../services/task.service';

class TaskController {
  constructor(private taskService = new TaskService()) { }

  public getAll = async (_req: Request, res: Response) => {
    const result = await this.taskService.getAll();
    res.status(StatusCodes.OK).json(result);
  };

  public create = async (req: Request, res: Response) => {
    const task = req.body;

    const taskCreated = await this.taskService.create(task);
    res.status(StatusCodes.CREATED).json(taskCreated);
  };

  public remove = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    await this.taskService.remove(id);

    res.status(StatusCodes.OK).json({ message: 'Book deleted successfully' });
  };

  public update = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const task = req.body;
    await this.taskService.update(id, task);

    res.status(StatusCodes.NO_CONTENT).end();
  };

  public updateStatus = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const task = req.body;
    await this.taskService.updateStatus(id, task);

    res.status(StatusCodes.NO_CONTENT).end();
  };
}

export default TaskController;
