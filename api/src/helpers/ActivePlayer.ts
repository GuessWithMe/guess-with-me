import redis from '@config/redis';
import { ACTIVE_PLAYERS } from '@consts/redis';
import { User } from '@types';
import { ActivePlayers } from '@t/Game';

class ActivePlayerHelper {
  public static async setActivePlayers(activePlayers: object) {
    await redis.open();
    await redis.setAsync(`${ACTIVE_PLAYERS}`, JSON.stringify(activePlayers));
  }

  public static async getActivePlayers() {
    await redis.open();
    const activePlayers = await redis.getAsync(`${ACTIVE_PLAYERS}`);

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
