import winston, { Logger as WinstonLoggerType } from 'winston';
import Logger from '../domain/Logger';

export default class SharedLogger implements Logger {
  private logger: WinstonLoggerType;

  readonly level = 'debug';

  private levels = {
    error: 0,
    info: 1,
    http: 2,
    debug: 3,
  };

  private colors = {
    error: 'red',
    info: 'green',
    http: 'magenta',
    debug: 'white',
  };

  constructor(private name = '') {
    winston.addColors(this.colors);

    this.logger = winston.createLogger({
      level: this.level,
      levels: this.levels,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize({ all: true }),
        winston.format.printf((log) => `${log.timestamp} [${log.level}] ${this.name ? `[${this.name}] ` : ''}${log.message}`),
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({
          filename: 'logs/error.log',
          level: 'error',
        }),
        new winston.transports.File({ filename: 'logs/access.log' }),
      ],
    });
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  info(message: string) {
    this.logger.info(message);
  }

  http(message: string) {
    this.logger.http(message);
  }

  error(message: string | Error) {
    /* eslint-disable-next-line @typescript-eslint/no-unused-expressions */
    message instanceof Error ? this.logger.error(message.stack) : this.logger.error(message);
  }
}
