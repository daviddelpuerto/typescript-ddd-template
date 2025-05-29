import Logger from './Logger';
import injectDependencies from '../../app/dependency-injection';

export default async function boostrap() {
  const logger = new Logger('Bootstrap');

  logger.info('🚧 Starting boostrap process');

  await injectDependencies();

  logger.info('🏁 Finished bootsrap process');
}
