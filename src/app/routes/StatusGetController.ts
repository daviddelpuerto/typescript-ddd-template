import { Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import Controller from '../../Shared/infrastructure/Controller';


export default class StatusGetController implements Controller {

  async run(_req: Request, res: Response) {
    try {
      res.sendStatus(httpStatus.OK);
    } catch (error) {
      res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}