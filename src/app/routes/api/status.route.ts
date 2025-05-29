import { Express } from 'express';
import { container } from '../../dependency-injection';
import GetStatusController from './GetStatusController';

export function register(app: Express) {
  const getStatusController: GetStatusController = container.get(
    'App.Controllers.GetStatusController',
  );
  app.get('/api', getStatusController.run.bind(getStatusController));
}
