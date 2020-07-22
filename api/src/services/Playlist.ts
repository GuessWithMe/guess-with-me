import WebSocket from 'ws';

import { Room } from 'models';
import { User, SpotifyPlaylist } from '@types';
import state from 'state';
import { worker } from 'worker';

class PlaylistService {
  public import = async (ws: WebSocket, id: SpotifyPlaylist['id'], user: User) => {
    console.log('import', id, user);

    // worker.importPlaylist();
    // const roomInfo = await Room.findOne({
    //   where: {
    //     slug,
    //   },
    // });

    // const currentRoomSockets = state.roomSockets.onSocketJoin(slug, ws);
    // const room = state.rooms.onPlayerJoin(slug, user);

    // currentRoomSockets.forEach((socket) => {
    //   socket.send(
    //     JSON.stringify({
    //       type: 'JOIN_ROOM_SOCKET',
    //       payload: {
    //         room: {
    //           ...room,
    //           ...roomInfo.toJSON(),
    //         },
    //       },
    //     })
    //   );
    // });
  };
}

export default PlaylistService;
