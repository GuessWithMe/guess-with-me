import http from 'http';
import WebSocket from 'ws';

import { RoomService, PlaylistService } from 'services';
import sessionStore from 'config/session';
import state from 'state';

import { SocketData } from './types';

class WebsocketClient {
  public ws: WebSocket.Server;

  public open = (express: http.Server) => {
    if (!this.ws) {
      this.ws = new WebSocket.Server({ server: express });

      this.ws.on('connection', (ws: WebSocket, req: http.IncomingMessage) => {
        ws.on('message', (json: string) => this.onMessage(ws, req, json));
        ws.on('close', () => this.onClose(ws, req));
      });
    }

    return this.ws;
  };

  public onMessage = async (ws: WebSocket, req: http.IncomingMessage, json: string) => {
    const user = await sessionStore.get(req);
    const data: SocketData = JSON.parse(json);

    switch (data.action) {
      case 'JOIN_ROOM': {
        new RoomService().onJoin(ws, data.payload.slug, user);
        break;
      }
      case 'PLAYLIST_IMPORT': {
        new PlaylistService().import(ws, data.payload.id, user);
        break;
      }
      case 'LEAVE_ROOM': {
        const { slug } = data.payload;
        break;
      }
    }
  };

  public onClose = async (ws: WebSocket, req: http.IncomingMessage) => {
    const user = await sessionStore.get(req);

    Object.entries(state.roomSockets.state).map(([slug, sockets]) => {
      const socket = sockets.find((s) => s === ws);

      if (socket) {
        const status = state.rooms.onPlayerLeave(slug, user);

        state.roomSockets.state[slug].forEach((roomSocket) => {
          roomSocket.send(
            JSON.stringify({
              type: 'JOIN_ROOM_SOCKET',
              payload: {
                room: status,
              },
            })
          );
        });
      }
    });
  };
}

export default new WebsocketClient();
