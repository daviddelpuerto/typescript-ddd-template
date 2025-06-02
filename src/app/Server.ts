import compress from 'compression';
import express, { Express, Router } from 'express';
import helmet from 'helmet';
import * as http from 'http';
import { glob } from 'glob';
import { loggerMiddleware } from './middlewares/logger.middleware';
import Logger from '../Shared/domain/Logger';

interface ServerOptions {
  port: string;
  logger: Logger;
  routesPath?: string;
}

export class Server {
  private readonly express: Express;
  private readonly router: Router;
  private readonly logger: Logger;
  private readonly port: string;
  private readonly routesPath: string;

  httpServer?: http.Server;

  constructor(options: ServerOptions) {
    this.logger = options.logger;
    this.port = options.port;
    this.routesPath = options.routesPath ?? './src/app/routes';

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

    const routesRootPath = __dirname.replace(this.routesPath, '');
    const routeFiles = glob.sync(`${routesRootPath}/**/*.route.*`);
    this.logger.info(`Found ${routeFiles.length} route files`);

    routeFiles.forEach((file) =>
      import(file)
        .then((route) => route.register(this.router))
        .catch((error: Error) => this.logger.error(`Failed to load route ${file}: ${error}`)),
    );

    this.logger.info('✔️  Application routes have been registered');
  }

  async run(): Promise<void> {
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
