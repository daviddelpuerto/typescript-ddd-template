import Logger from '../../Shared/infrastructure/Logger';
import StatusGetController from '../routes/StatusGetController';

export default {
  'Shared.Logger': new Logger(),

  'App.Controllers.StatusGetController': new StatusGetController(),
};