import { Router } from 'express';
import glob from 'glob';
import Logger from '../../Shared/infrastructure/Logger';

function register(routeFilePath: string, app: Router) {
  const route = require(routeFilePath);
  route.register(app);
}

export function registerRoutes(router: Router) {
  const logger = new Logger('Router');

  logger.info('Registering application routes');

  const routesFiles = glob.sync(__dirname + './**/*.route.*');
  routesFiles.map(route => register(route, router));

  logger.info('✔️  Application routes have been registered');
}
