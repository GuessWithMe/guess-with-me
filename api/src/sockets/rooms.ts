import { Socket } from 'socket.io';
import { Room } from 'models/Room';

import { RoomSocketService } from 'socketServices';
import { SongDistributer, GameService } from 'services';
import { RoomStatus, RoomStatusResponse } from '../../../types/RoomStatus';
import redis from 'config/redis';
import { ActivePlayerHelper } from 'helpers';
import SocketWrapper from 'lib/SocketWrapper';

const roomsEvents = (socket: Socket) => {
  socket.on('join', async ({ roomId }: { roomId: Room['slug'] }) => {
    const slug = roomId;
    const room = new RoomSocketService(slug);

    socket.join(slug.toString());

    const status: Partial<RoomStatus> = await room.status();
    const socketRooms = JSON.parse(await redis.get('socketRooms'));

    status.players[socket.id] = socket.handshake.session.passport.user;
    socketRooms[socket.id] = room.slug;

    await redis.set('rooms', `["${slug}"].players`, status.players);
    await redis.set('socketRooms', '.', socketRooms);

    (status as RoomStatusResponse).startTime = SongDistributer.getCurrentStartTime();

    SocketWrapper.namespaces.rooms.in(room.slug).emit('status', status);
  });

  socket.on('leave', async ({ roomId }: { roomId: Room['slug'] }) => {
    const slug = roomId;

    const roomsRes = await redis.get('rooms');
    const rooms = JSON.parse(roomsRes) as Record<Room['slug'], RoomStatus>;

    const roomPlayers = rooms[slug].players;
    delete roomPlayers[socket.id];

    await redis.set('rooms', `["${slug}"].players`, roomPlayers);

    // @ts-ignore
    await redis.client.json_del('socketRooms', `['${socket.id}']`);

    SocketWrapper.namespaces.rooms.in(slug).emit('players', Object.values(roomPlayers));
    socket.leave(slug);
  });

  socket.on('disconnect', async reason => {
    const roomsRes = await redis.get('rooms');
    const socketRoomsRes = await redis.get('socketRooms');

    const rooms = JSON.parse(roomsRes) as Record<Room['slug'], RoomStatus>;
    const socketRooms = JSON.parse(socketRoomsRes) as Record<Socket['id'], Room['slug']>;

    const slug = socketRooms[socket.id];

    if (!slug) {
      return;
    }

    const roomPlayers = rooms[slug].players;
    delete roomPlayers[socket.id];

    await redis.set('rooms', `["${slug}"].players`, roomPlayers);

    SocketWrapper.namespaces.rooms.in(slug).emit('players', Object.values(roomPlayers));
    socket.leave(slug);
  });

  socket.on('progressUpdate', async guessData => {
    await GameService.updatePlayersGuessProgress(socket.id, guessData);
  });
};

export default roomsEvents;
