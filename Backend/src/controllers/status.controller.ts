import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import StatusService from '../services/status.service';

class StatusController {
  constructor(private statusService = new StatusService()) { }

  public getAll = async (_req: Request, res: Response) => {
    const result = await this.statusService.getAll();
    res.status(StatusCodes.OK).json(result);
  };
}

export default StatusController;
