import { SocketService } from 'services';
import { ActivePlayerHelper } from 'helpers';

import { Guess } from '@types';
import { ActivePlayers } from 'types/Game';
import { Room, Song, Artist, Album } from 'models';
import redis from 'config/redis';
import { Sequelize } from 'sequelize-typescript';
import { Op } from 'sequelize';

class GameService {
  public static async removeActiveUser(socketId: string) {
    // let activePlayers = await ActivePlayerHelper.getActivePlayers();
    // if (!activePlayers) {
    //   activePlayers = {};
    // }
    // delete activePlayers[socketId];
    // await ActivePlayerHelper.setActivePlayers(activePlayers);
    // new SocketService().broadcastActivePlayerList(activePlayers);
  }

  public static getStatus = async () => {
    // const [status, activePlayers, previousTracks] = await Promise.all([
    //   SongDistributer.getStatus(),
    //   ActivePlayerHelper.getActivePlayers(),
    //   PreviousTracksHelper.get()
    // ]);
    // return {
    //   status,
    //   activePlayers: ActivePlayerHelper.filterActivePlayerListForClient(activePlayers),
    //   previousTracks
    // };
  };

  public static async updatePlayersGuessProgress(socketId: string, guessData: Guess) {
    // let activePlayers = await ActivePlayerHelper.getActivePlayers();
    // if (!activePlayers) {
    //   activePlayers = {};
    // }
    // activePlayers[socketId] = {
    //   ...activePlayers[socketId],
    //   titleCorrect: guessData.titleCorrect || false,
    //   artistCorrect: guessData.artistCorrect || false
    // };
    // if (GameService.areAllPlayersFinished(activePlayers)) {
    //   // Set all active player guess statuses as false.
    //   activePlayers = await GameService.resetGuessStatuses(activePlayers);
    //   SongDistributer.restartAfterPause();
    //   return;
    // }
    // await ActivePlayerHelper.setActivePlayers(activePlayers);
    // new SocketService().broadcastActivePlayerList(activePlayers);
  }

  public static initRoomStatuses = async () => {
    const rooms = await Room.findAll();
    // const songPromises = rooms.map(room => {
    //   return Song.findOne({
    //     include: [Artist, Album],
    //     order: [Sequelize.fn('RAND')],
    //     where: {
    //       previewUrl: { [Op.ne]: null }
    //     }
    //   });
    // });
    // const songs = await Promise.all(songPromises);
    // const promises = rooms.reduce((sum, room, idx) => {
    //   return [
    //     ...sum,
    //     redis.hset(`room:${room.slug}`, 'song', JSON.stringify(songs[idx])),
    //     redis.hset(`room:${room.slug}`, 'players', JSON.stringify({})),
    //     redis.hset(`room:${room.slug}`, 'prevSongs', JSON.stringify([]))
    //   ];
    // }, []);
    // await Promise.all(promises);

    const songPromises = rooms.map(room => {
      return Song.findOne({
        include: [Artist, Album],
        order: [Sequelize.fn('RAND')],
        where: {
          previewUrl: { [Op.ne]: null }
        }
      });
    });
    const songs = await Promise.all(songPromises);

    const processedRooms = rooms.reduce((sum, room, idx) => {
      return {
        ...sum,
        [room.slug]: {
          song: songs[idx],
          players: {}
        }
      };
    }, {});

    await Promise.all([redis.set('rooms', '.', processedRooms), redis.set('socketRooms', '.', {})]);
  };

  private static areAllPlayersFinished(activePlayers: ActivePlayers) {
    for (const socketId in activePlayers) {
      if (!activePlayers[socketId].titleCorrect || !activePlayers[socketId].artistCorrect) {
        return false;
      }
    }

    return true;
  }

  // private static async resetGuessStatuses(activePlayers: ActivePlayers) {
  //   const newActivePlayers: ActivePlayers = {};
  //   for (const socketId in activePlayers) {
  //     if (activePlayers[socketId]) {
  //       newActivePlayers[socketId] = {
  //         ...activePlayers[socketId],
  //         titleCorrect: false,
  //         artistCorrect: false
  //       };
  //     }
  //   }

  //   await ActivePlayerHelper.setActivePlayers(newActivePlayers);
  //   new SocketService().broadcastActivePlayerList(newActivePlayers);

  //   return newActivePlayers;
  // }
}

export default GameService;
