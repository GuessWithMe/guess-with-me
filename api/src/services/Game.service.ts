import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

import { Room, Song, Artist, Album } from 'models';
import redis from 'config/redis';


class GameService {
  public static initRoomStatuses = async () => {
    const rooms = await Room.findAll();

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

    const prevRoomStatus = JSON.parse(await redis.get('rooms'));

    const processedRooms = rooms.reduce((sum, room, idx) => {
      return {
        ...sum,
        [room.slug]: {
          song: songs[idx],
          players: {},
          prevSongs: (prevRoomStatus && prevRoomStatus[room.slug].prevSongs) || []
        }
      };
    }, {});

    await Promise.all([redis.set('rooms', '.', processedRooms), redis.set('socketRooms', '.', {})]);
  };
}

export default GameService;
