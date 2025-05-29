import { Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import Controller from '../../../Shared/infrastructure/Controller';

export default class GetStatusController implements Controller {
  async run(_req: Request, res: Response) {
    res.sendStatus(httpStatus.OK);
  }
}
