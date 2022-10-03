import { Container } from 'typedi';
import dependencies from './dependencies';
import Logger from '../../Shared/infrastructure/Logger';

const logger = new Logger('Dependency-Injection');

export default function injectDependencies() {
  logger.info('💉 Starting dependency injection');

  Object.entries(dependencies).forEach(([key, value]) => {
    Container.set(key, value);
    logger.info(`✔️  Registered {${key}}`);
  });
}