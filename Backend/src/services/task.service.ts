import { NotFoundError } from 'restify-errors';
import connection from '../models/connection';
import TaskModel from '../models/task.model';
import Task from '../interfaces/task.interface';

class TaskService {
  public model: TaskModel;

  constructor() {
    this.model = new TaskModel(connection);
  }

  public async getAll(): Promise<Task[]> {
    const result = await this.model.getAllStatus();
    return result;
  }

  public create(task: Task): Promise<Task> {
    return this.model.create(task);
  }

  public async remove(id: number): Promise<void> {
    const found = await this.model.getById(id);
    if (!found) {
      throw new NotFoundError('NotFoundError');
    }

    this.model.remove(id);
  }
}

export default TaskService;
