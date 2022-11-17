import { Router } from 'express';
import glob from 'glob';
import Logger from '../../Shared/infrastructure/Logger';

function register(routeFilePath: string, app: Router) {
  const route = require(routeFilePath);
  route.register(app);
}

function getProjectPath() {
  return __dirname.replace('/src/app/routes', '');
}

export function registerRoutes(router: Router) {
  const logger = new Logger('Router');

  logger.info('Registering application routes');

  const projectPath = getProjectPath();
  const routesFiles = glob.sync(`${projectPath}/**/*.route.*`);

  logger.info(`Found ${routesFiles.length} routes files`);

  routesFiles.map(route => register(route, router));

  logger.info('✔️  Application routes have been registered');
}
