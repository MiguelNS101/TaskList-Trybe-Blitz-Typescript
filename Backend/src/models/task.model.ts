import { Pool, ResultSetHeader } from 'mysql2/promise';
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
    const result = await this.connection.execute(`
      SELECT T.task_id, T.task_name, T.task_message, T.task_date, s.status_name
      FROM Tasks AS T
      INNER JOIN Task_Status AS s 
      ON s.status_id = T.task_status_id
      ORDER BY task_id;`);
    const [rows] = result;
    return rows as Task[];
  }

  public async create(task: Task): Promise<Task> {
    const {
      taskName, taskMessage,
    } = task;
    const result = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Tasks (task_name, task_message) VALUES (?, ?)',
      [taskName, taskMessage],
    );
    const [dataInserted] = result;
    const { insertId } = dataInserted;
    return { taskId: insertId, ...task };
  }

  public async getById(id: number): Promise<Task> {
    const result = await this.connection
      .execute('SELECT * FROM Tasks WHERE task_id=?', [id]);
    const [rows] = result;
    const [book] = rows as Task[];
    return book;
  }

  public async remove(id: number) {
    await this.connection.execute(
      'DELETE FROM Tasks WHERE task_id=?',
      [id],
    );
  }

  public async update(id: number, task: Task) {
    const { taskName, taskMessage } = task;
    await this.connection.execute(
      'UPDATE Tasks SET task_name=?, task_message=? WHERE task_id=?',
      [taskName, taskMessage, id],
    );
  }

  public async updateStatus(id: number, task: Task) {
    const { taskStatusId } = task;
    await this.connection.execute(
      'UPDATE Tasks SET task_status_id=? WHERE task_id=?',
      [taskStatusId, id],
    );
  }
}
