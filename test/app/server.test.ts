import { Server } from '../../src/app/Server';
import request from 'supertest';
import Logger from '../../src/Shared/infrastructure/Logger';

const logger = new Logger('Test-App');

const port = process.env.NODE_PORT || '3000';
const server = new Server(port, logger);

beforeAll(async () => {
  await server.listen();
});

afterAll(async () => {
  await server.stop();
});

test('Sending a GET request to the root endpoint returns status code 200', async () => {
  await request(server.httpServer).get('/api').expect(200);
});
