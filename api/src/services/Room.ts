import WebSocket from 'ws';

import wsClient from 'lib/Websocket';

import { RoomModel } from 'models';
import { User, Room } from '@types';
import state from 'state';

class RoomService {
  public onJoin = async (ws: WebSocket, slug: RoomModel['slug'], user: User) => {
    const roomInfo = await RoomModel.findOne({
      where: {
        slug,
      },
    });

    const currentRoomSockets = state.roomSockets.onSocketJoin(slug, ws);
    const room = await state.rooms.onPlayerJoin(slug, user);

    currentRoomSockets.forEach((socket) => {
      socket.send(
        JSON.stringify({
          type: 'JOIN_ROOM_SOCKET',
          payload: {
            room: {
              ...room,
              info: roomInfo.toJSON(),
            },
          },
        })
      );
    });
  };

  public sendStatus = async (slug: Room['slug'], status: object) => {
    const currentRoomSockets = state.roomSockets.state[slug];

    currentRoomSockets.forEach((socket) => {
      wsClient.send(socket, {
        type: 'ROOM_STATUS_UPDATE',
        payload: {
          status,
        },
      });
    });
  };
}

export default RoomService;
