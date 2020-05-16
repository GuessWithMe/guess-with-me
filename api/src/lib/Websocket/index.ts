import http from 'http';
import WebSocket from 'ws';

import sessionStore from 'config/session';

class WebsocketClient {
  public ws: WebSocket.Server;

  public open = (express: http.Server) => {
    if (!this.ws) {
      this.ws = new WebSocket.Server({ server: express });

      this.ws.on('connection', (ws: WebSocket, req: http.IncomingMessage) => {
        ws.on('message', async data => {
          const session = await sessionStore.get(req);
          console.log(data);
        });
      });
    }

    return this.ws;
  };
}

export default new WebsocketClient();
