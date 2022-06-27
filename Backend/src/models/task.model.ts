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

  public async getAllStatus(): Promise<Task[]> {
    const result = await this.connection
      .execute(`
      SELECT T.task_id, T.task_name, T.task_message, T.task_date, s.status_name
      FROM Tasks AS T
      INNER JOIN Task_Status AS s 
      ON s.status_id = T.task_status_id`);
    const [rows] = result;
    return rows as Task[];
  }
}
