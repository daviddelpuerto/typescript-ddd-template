import { injectDependencies } from './app/dependency-injection';
import { Server } from './app/Server';
import { SharedLogger as Logger } from './Shared/infrastructure/Logger';

const logger = new Logger('App');

(async () => {
  try {
    logger.info('🚧 Starting app...');

    await injectDependencies();

    const port = process.env.NODE_PORT ?? '3000';
    await new Server(port, new Logger('Server')).listen();
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
})();
