import { Server } from './Server';
import Logger from '../Shared/infrastructure/Logger';

const logger = new Logger('App');

function handleError(err: Error) {
  logger.error(err);
  process.exit(1);
}

try {
  const port = process.env.NODE_PORT || '3000';
  new Server(port, logger).listen().catch(handleError);
} catch (error: any) {
  handleError(error);
}
