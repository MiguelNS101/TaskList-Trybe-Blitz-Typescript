import connection from '../models/connection';
import TaskModel from '../models/task.model';
import Task from '../interfaces/task.interface';

class TaskService {
  public model: TaskModel;

  constructor() {
    this.model = new TaskModel(connection);
  }

  public async getAll(): Promise<Task[]> {
    const result = await this.model.getAll();
    return result;
  }
}

export default TaskService;
