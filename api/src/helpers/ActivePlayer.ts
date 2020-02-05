import { PLAYERS } from 'consts/redis';
import { ActivePlayers } from 'types/Game';
import redis from 'config/redis';
import redisHelper from './Redis';
import { Room } from 'models';

class ActivePlayerHelper {
  public static async setActivePlayers(roomId: Room['id']) {
    await redis.open();
    const key = redisHelper.buildKey(['rooms', roomId.toString(), PLAYERS]);
    // await redis.setAsync(key, JSON.stringify(activePlayers));
  }

  public static async getActivePlayers(roomId: Room['id']) {
    await redis.open();
    const key = redisHelper.buildKey(['rooms', roomId.toString(), PLAYERS]);
    const activePlayers = await redis.get(key);

    if (activePlayers) {
      return JSON.parse(activePlayers) as ActivePlayers;
    }
  }

  /**
   * Changes active player list from object to array, filters sensitive data
   */
  public static filterActivePlayerListForClient(activePlayers: ActivePlayers) {
    return Object.keys(activePlayers).map(key => {
      return {
        id: activePlayers[key].id,
        spotifyUsername: activePlayers[key].spotifyUsername,
        titleCorrect: activePlayers[key].titleCorrect || false,
        artistCorrect: activePlayers[key].artistCorrect || false,
        avatar: activePlayers[key].spotifyImageUrl
      };
    });
  }
}

export default ActivePlayerHelper;
