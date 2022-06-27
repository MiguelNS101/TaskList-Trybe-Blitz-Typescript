import connection from '../models/connection';
import StatusModel from '../models/status.model';
import Status from '../interfaces/status.interface';

class StatusService {
  public model: StatusModel;

  constructor() {
    this.model = new StatusModel(connection);
  }

  public async getAll(): Promise<Status[]> {
    const result = await this.model.getAll();
    return result;
  }
}

export default StatusService;
