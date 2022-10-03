import Logger from './Logger';
import loadEnvConfig from '../../../config';
import injectDependencies from '../../app/dependency-injection';

const logger = new Logger('Bootstrap');

function boostrap() {
  logger.info('🚧 Starting boostrap process');

  loadEnvConfig();
  injectDependencies();

  logger.info('🏁 Finished bootsrap process\n');
}

boostrap();
