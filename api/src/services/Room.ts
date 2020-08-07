import WebSocket from 'ws';

import { RoomModel } from 'models';
import { User } from '@types';
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
              ...roomInfo.toJSON(),
            },
          },
        })
      );
    });
  };
}

export default RoomService;
