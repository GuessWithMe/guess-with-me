import WebSocket from 'ws';

import { Room } from 'models';
import { User } from '@types';
import state from 'state';

class RoomService {
  public onJoin = async (ws: WebSocket, slug: Room['slug'], user: User) => {
    const roomInfo = await Room.findOne({
      where: {
        slug,
      },
    });

    const currentRoomSockets = state.roomSockets.onSocketJoin(slug, ws);
    const room = state.rooms.onPlayerJoin(slug, user);

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
