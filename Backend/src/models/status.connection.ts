import { Pool, ResultSetHeader } from 'mysql2/promise';
import Status from '../interfaces/status.interface';

export default class StatusModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<Status[]> {
    const result = await this.connection
      .execute('SELECT * FROM Task_Status');
    const [rows] = result;
    return rows as Status[];
  }
}