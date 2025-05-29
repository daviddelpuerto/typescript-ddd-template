import { ContainerBuilder, YamlFileLoader } from 'node-dependency-injection';
import { SharedLogger as Logger } from '../../Shared/infrastructure/Logger';

export const container = new ContainerBuilder();
const loader = new YamlFileLoader(container);

export async function injectDependencies(): Promise<void> {
  const logger = new Logger('Dependency-Injection');

  logger.info('💉 Starting dependency injection');

  const applicationDependenciesFile = `${__dirname}/application.dependencies.yaml`;
  await loader.load(applicationDependenciesFile);

  logger.info('✔️  Loaded dependencies on container');
}
