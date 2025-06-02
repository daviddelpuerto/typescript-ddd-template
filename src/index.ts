import { injectDependencies } from './app/dependency-injection';
import { Server } from './app/Server';
import { SharedLogger as Logger } from './Shared/infrastructure/Logger';

const logger = new Logger('App');

process.on('unhandledRejection', (reason) => {
  logger.error(`Unhandled Rejection: ${reason}`);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  logger.error(`Uncaught Exception: ${error}`);
  process.exit(1);
});

(async () => {
  try {
    logger.info('💉 Starting dependency injection');
    await injectDependencies();
    logger.info('Loaded dependencies on container');

    logger.info('Creating Server instance');
    const server = new Server({
      port: process.env.NODE_PORT ?? '3000',
      logger: new Logger('Server'),
    });
    await server.listen();
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
})();
