import { Container } from 'typedi';
import { Router } from 'express';
import StatusGetController from './StatusGetController';

const apiRouter = Router();

const statusGetController: StatusGetController = Container.get('App.Controllers.StatusGetController');
apiRouter.get('/', statusGetController.run);

export default apiRouter;