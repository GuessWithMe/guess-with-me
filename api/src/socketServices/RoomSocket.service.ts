import { Room } from 'models';

import { roomHelper } from 'helpers';

import { RoomStatus, Guess } from '@types';

import redis from 'config/redis';

import SongDistributer from 'lib/SongDistributer';
import SocketWrapper from 'lib/SocketWrapper';



class RoomSocketService {
  public static allRooms = async () => {
    const rooms: Record<Room['slug'], RoomStatus> = JSON.parse(await redis.get('rooms'));
    return rooms;
  };

  public slug: Room['slug'];

  constructor(slug: Room['slug']) {
    this.slug = slug;
  }

  public join = async () => {
    const rooms: Record<Room['slug'], RoomStatus> = JSON.parse(await redis.get('rooms'));

    return rooms[this.slug];
  };

  public status = async (): Promise<RoomStatus> => {
    const room = await redis.get('rooms', `["${this.slug}"]`);
    return JSON.parse(room);
  };

  public setStatus = async (roomId: Room['slug'], status: RoomStatus) => {
    // const rooms: Record<Room['id'], RoomStatus> = JSON.parse(await redis.set('rooms'));
    // rooms[] = status;

    await redis.set('rooms', roomId, status);
  };

  public async updateProgress(socketId: string, guessData: Guess) {
    console.log(guessData);
    

    const players = JSON.parse(await redis.get('rooms', `["${guessData.room}"].players`));


    players[socketId] = {
      ...players[socketId],
      titleCorrect: guessData.titleCorrect || false,
      artistCorrect: guessData.artistCorrect || false
    };


    if (
      roomHelper.allPlayersFinished(
        Object.values(players).map(({ titleCorrect, artistCorrect }) => ({ titleCorrect, artistCorrect }))
      )
    ) {
      // Set all active player guess statuses as false.
      // activePlayers = await GameService.resetGuessStatuses(activePlayers);

      const newPlayers = Object.entries(players).reduce((sum, [key, player]) => {
        return {
          ...sum,
          [key]: {
            ...(player as any),
            titleCorrect: false,
            artistCorrect: false
          }
        };
      }, {});

      SongDistributer.restartAfterPause();
      return;
    } else {
      await redis.set('rooms', `["${guessData.room}"].players`, players);
    }

    SocketWrapper.namespaces.rooms.in(guessData.room).emit('players', Object.values(players));
  }
}

export default RoomSocketService;
