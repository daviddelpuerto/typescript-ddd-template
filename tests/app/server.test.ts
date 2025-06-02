import request from 'supertest';
import { Server } from '../../src/app/Server';
import { SharedLogger as Logger } from '../../src/Shared/infrastructure/Logger';
import { injectDependencies } from '../../src/app/dependency-injection';

describe('Server (integration)', () => {
  let server: Server;

  beforeAll(async () => {
    await injectDependencies();

    const logger = new Logger('Test-App');
    const port = process.env.NODE_PORT ?? '3000';
    server = new Server({ port, logger });
    await server.run();
  });

  afterAll(async () => {
    await server.stop();
  });

  test('GET /api returns 200', async () => {
    await request(server.httpServer).get('/api').expect(200);
  });

  test('GET /api/nonexistent returns 404', async () => {
    await request(server.httpServer).get('/api/nonexistent').expect(404);
  });
});
