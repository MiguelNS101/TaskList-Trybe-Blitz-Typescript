import { Pool } from 'mysql2/promise';
import Task from '../interfaces/task.interface';

export default class TaskModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<Task[]> {
    const result = await this.connection.execute('SELECT * FROM Tasks');
    const [rows] = result;
    return rows as Task[];
  }
}
