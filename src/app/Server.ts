import compress from 'compression';
import express, { Express, Router } from 'express';
import helmet from 'helmet';
import * as http from 'http';
import { glob } from 'glob';
import loggerMiddleware from './middlewares/logger.middleware';
import Logger from '../Shared/domain/Logger';

export class Server {
  private readonly express: Express;
  private readonly router: Router;

  httpServer?: http.Server;

  constructor(
    private readonly port: string,
    private readonly logger: Logger,
  ) {
    this.port = port;
    this.logger = logger;
    this.express = express();
    this.router = Router();
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(helmet.xssFilter());
    this.express.use(helmet.noSniff());
    this.express.use(helmet.hidePoweredBy());
    this.express.use(helmet.frameguard({ action: 'deny' }));
    this.express.use(compress());
    this.express.use(loggerMiddleware);
    this.express.use(this.router);
  }

  private async registerRoutes(): Promise<void> {
    this.logger.info('Registering routes');

    const routesRootPath = __dirname.replace('/src/app/routes', '');
    const routeFiles = glob.sync(`${routesRootPath}/**/*.route.*`);
    this.logger.info(`Found ${routeFiles.length} route files`);

    for (const file of routeFiles) {
      try {
        const routeModule = await import(file);
        routeModule.register(this.router);
      } catch (error) {
        this.logger.error(`Failed to load route ${file}: ${error}`);
      }
    }

    this.logger.info('✔️  Application routes have been registered');
  }

  async listen(): Promise<void> {
    await this.registerRoutes();
    return new Promise((resolve) => {
      this.httpServer = this.express.listen(this.port, () => {
        this.logger.info(`🚀 Server listening on port: [${this.port}]`);
        this.logger.info(`   Running environment: [${this.express.get('env')}]`);
        resolve();
      });
    });
  }

  stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.httpServer) {
        this.httpServer.close((error) => {
          if (error) {
            return reject(error);
          }
          return resolve();
        });
      }

      return resolve();
    });
  }
}
