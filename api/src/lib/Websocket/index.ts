import http from 'http';
import WebSocket from 'ws';

import sessionStore from 'config/session';
import state from 'state';
import { Room } from 'models';
import roomSockets from 'state/roomSockets';

interface RoomJoinAction {
  action: 'JOIN_ROOM';
  payload: { slug: Room['slug'] };
}

interface RoomLeaveAction {
  action: 'LEAVE_ROOM';
  payload: { slug: Room['slug'] };
}

type SocketData = RoomJoinAction | RoomLeaveAction;

class WebsocketClient {
  public ws: WebSocket.Server;

  public open = (express: http.Server) => {
    if (!this.ws) {
      this.ws = new WebSocket.Server({ server: express });

      this.ws.on('connection', (ws: WebSocket, req: http.IncomingMessage) => {
        ws.on('message', async (json: string) => {
          const user = await sessionStore.get(req);

          const data: SocketData = JSON.parse(json);
          switch (data.action) {
            case 'JOIN_ROOM': {
              const { slug } = data.payload;

              const roomInfo = await Room.findOne({
                where: {
                  slug
                }
              });

              const roomSockets = state.roomSockets.onSocketJoin(slug, ws);
              const room = state.rooms.onPlayerJoin(slug, user);

              roomSockets.forEach(socket => {
                socket.send(
                  JSON.stringify({
                    type: 'JOIN_ROOM_SOCKET',
                    payload: {
                      room: {
                        ...room,
                        ...roomInfo.toJSON()
                      }
                    }
                  })
                );
              });
              break;
            }
            case 'LEAVE_ROOM': {
              const { slug } = data.payload;
              break;
            }
          }
        });

        ws.on('close', async () => {
          const user = await sessionStore.get(req);

          Object.entries(roomSockets.state).map(([slug, sockets]) => {
            const socket = sockets.find(s => s === ws);

            if (socket) {
              const status = state.rooms.onPlayerLeave(slug, user);

              state.roomSockets.state[slug].forEach(roomSocket => {
                roomSocket.send(
                  JSON.stringify({
                    type: 'JOIN_ROOM_SOCKET',
                    payload: {
                      room: status
                    }
                  })
                );
              });
            }
          });
        });
      });
    }

    return this.ws;
  };
}

export default new WebsocketClient();
