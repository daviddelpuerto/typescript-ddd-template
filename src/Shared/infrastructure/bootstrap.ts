import Logger from './Logger';
import loadEnvConfig from '../../../config';

const logger = new Logger('Bootstrap');

function boostrap() {
  logger.info('🚧 Starting boostrap process');

  loadEnvConfig();

  logger.info('🏁 Finished bootsrap process\n');
}

boostrap();
