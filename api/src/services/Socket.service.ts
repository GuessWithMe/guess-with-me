import SocketIO from 'socket.io';

// import Websockets from 'config/websockets';
import { ActivePlayerHelper } from 'helpers';
import { Song } from 'models';
import { ActivePlayers } from 'types/Game';

export default class SocketService {
  private socket: SocketIO.Server;

  constructor() {
    // this.socket = Websockets.getIo();
  }

  public sendNextSong(song: Song) {
    // this.socket.in('general').emit('song', song);
  }

  /**
   * Sends a pause event with the last song played for displaying the correct
   * answer
   */
  public sendPause(previousTracks: Song[]) {
    // this.socket.emit('pause', previousTracks);
  }

  /**
   * Broadcasts active player list to all clients using websockets.
   *
   * @param activePlayers
   */
  public broadcastActivePlayerList(activePlayers: ActivePlayers): void {
    // this.socket.to('general').emit('players', ActivePlayerHelper.filterActivePlayerListForClient(activePlayers));
  }

  /**
   * Emits playlist import progress to the importer.
   */
  public sendPlaylistImportProgress(
    socketId: string,
    progress: {
      playlist: {
        spotifyId: string;
        name: string;
      };
      progress: number;
    }
  ): void {
    // this.socket.sockets.connected[socketId].emit('playlistProgress', progress);
  }
}
