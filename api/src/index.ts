import { ActivePlayerHelper } from '@helpers/ActivePlayerHelper';
import app from './app';

app.server.listen(3000, (err: Error) => {
  console.log(err);
});

process.on('SIGTERM', async () => {
  console.info('SIGTERM signal received.');
  gracefulShutdown();
});

process.on('SIGINT', () => {
  console.info('SIGINT signal received.');
  gracefulShutdown();
});

const gracefulShutdown = async () => {
  await ActivePlayerHelper.setActivePlayers({});
};
