import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Task from '../interfaces/task.interface';

const properties = ['taskName', 'taskMessage'];

function validateProperties(task: Task): [boolean, string | null] {
  for (let i = 0; i < properties.length; i += 1) {
    if (!Object.prototype.hasOwnProperty.call(task, properties[i])) {
      return [false, properties[i]];
    }
  }
  return [true, null];
}

function validateValues(task: Task): [boolean, string | null] {
  const entries = Object.entries(task);
  for (let i = 0; i < entries.length; i += 1) {
    const [property, value] = entries[i];
    if (!value) {
      return [false, property];
    }
  }
  return [true, null];
}

// eslint-disable-next-line consistent-return
function validationTask(req: Request, res: Response, next: NextFunction) {
  const task: Task = req.body;

  let [valid, property] = validateProperties(task);

  if (!valid) {
    return res.status(StatusCodes.BAD_REQUEST).send(
      `O campo ${property} é obrigatório.`,
    );
  }

  [valid, property] = validateValues(task);

  if (!valid) {
    return res.status(StatusCodes.BAD_REQUEST).send(
      `O campo ${property} não pode ser nulo ou vazio.`,
    );
  }

  next();
}

export default validationTask;
