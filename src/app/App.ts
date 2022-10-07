import { Server } from './Server';
import Logger from '../Shared/infrastructure/Logger';

export default class App {
  readonly port: string;

  private logger: Logger;

  readonly server: Server;

  constructor(port: string) {
    this.port = port;
    this.logger = new Logger('App');
    this.server = new Server(this.port, this.logger);
  }

  async start(): Promise<void> {
    try {
      await this.server.listen().catch(this.handleError);
    } catch (error: any) {
      this.handleError(error);
    }
  }

  async stop(): Promise<void> {
    await this.server.stop();
  }

  handleError(err: Error): void {
    this.logger.error(err);
    process.exit(1);
  }
}