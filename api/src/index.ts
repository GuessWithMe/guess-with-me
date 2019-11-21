import { createTerminus } from '@godaddy/terminus';

import { ActivePlayerHelper } from '@helpers';
import app from './app';

app.server.listen(3000, (err: Error) => {});

const gracefulShutdown = async () => {
  await ActivePlayerHelper.setActivePlayers({});
};
