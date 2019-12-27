import { SongDistributer, SocketService } from '@services';
import { Guess, ActivePlayer } from '@types';
import { ActivePlayerHelper, PreviousTracksHelper } from '@helpers';

export default class GameService {
  public static async removeActiveUser(socketId: string) {
    let activePlayers = await ActivePlayerHelper.getActivePlayers();

    if (!activePlayers) {
      activePlayers = {};
    }
    delete activePlayers[socketId];

    await ActivePlayerHelper.setActivePlayers(activePlayers);
    new SocketService().broadcastActivePlayerList(activePlayers);
  }

  public static getStatus = async () => {
    const status = await SongDistributer.getStatus();
    let activePlayers = await ActivePlayerHelper.getActivePlayers();
    activePlayers = ActivePlayerHelper.filterActivePlayerListForClient(activePlayers);

    const previousTracks = await PreviousTracksHelper.get();

    return {
      status,
      activePlayers,
      previousTracks
    };
  };

  public static async updatePlayersGuessProgress(socketId: string, guessData: Guess) {
    let activePlayers = await ActivePlayerHelper.getActivePlayers();

    if (!activePlayers) {
      activePlayers = {};
    }

    activePlayers[socketId] = {
      ...activePlayers[socketId],
      titleCorrect: guessData.titleCorrect || false,
      artistCorrect: guessData.artistCorrect || false
    };

    if (GameService.areAllPlayersFinished(activePlayers)) {
      // Set all active player guess statuses as false.
      activePlayers = await GameService.resetGuessStatuses(activePlayers);
      SongDistributer.restartAfterPause();
      return;
    }

    await ActivePlayerHelper.setActivePlayers(activePlayers);
    new SocketService().broadcastActivePlayerList(activePlayers);
  }

  private static areAllPlayersFinished(activePlayers: object) {
    for (const socketId in activePlayers) {
      if (!activePlayers[socketId].titleCorrect || !activePlayers[socketId].artistCorrect) {
        return false;
      }
    }

    return true;
  }

  private static async resetGuessStatuses(activePlayers: object) {
    const newActivePlayers = {};
    for (const socketId in activePlayers) {
      if (activePlayers[socketId]) {
        newActivePlayers[socketId] = {
          ...activePlayers[socketId],
          titleCorrect: false,
          artistCorrect: false
        };
      }
    }

    await ActivePlayerHelper.setActivePlayers(newActivePlayers);
    new SocketService().broadcastActivePlayerList(newActivePlayers);

    return newActivePlayers;
  }
}
