import http from 'http';
import SocketIO from 'socket.io';
import { RequestHandler } from 'express';
import SocketIOSession from 'express-socket.io-session';

import { Namespaces } from './types';

class SocketWrapper {
  public server!: SocketIO.Server;
  public namespaces!: Record<Namespaces, SocketIO.Namespace>;

  public init = (httpServer: http.Server, expressSession: RequestHandler) => {
    const session = SocketIOSession(expressSession, { autoSave: true });
    this.server = SocketIO(httpServer);
    this.server.use(session);

    this.namespaces = {
      rooms: this.server.of('rooms').use(session),
      playlists: this.server.of('playlists').use(session)
    };

    return this.server;
  };
}

export default new SocketWrapper();
