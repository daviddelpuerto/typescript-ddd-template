import bootstrap from './Shared/infrastructure/bootstrap';
import App from './app/App';

async function main() {
  await bootstrap();

  const app = new App(process.env.NODE_PORT || '3000');
  await app.start();
}

main();