import Logger from './Logger';
import loadEnvConfig from '../../../config';
import injectDependencies from '../../app/dependency-injection';

export default async function boostrap() {
  const logger = new Logger('Bootstrap');

  logger.info('🚧 Starting boostrap process');

  loadEnvConfig();
  await injectDependencies();

  logger.info('🏁 Finished bootsrap process');
}
