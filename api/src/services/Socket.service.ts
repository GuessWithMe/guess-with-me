import SocketIO from 'socket.io';

import Websockets from '@config/websockets';
import { ActivePlayerHelper } from '@helpers';
import { Song } from '@models';

export default class SocketService {
  private socket: SocketIO.Server;

  constructor() {
    this.socket = Websockets.getIo();
  }

  public sendNextSong(song: Song) {
    this.socket.in('general').emit('song', song);
  }

  /**
   * Sends a pause event with the last song played for displaying the correct
   * answer
   */
  public sendPause(previousTracks: Song[]) {
    this.socket.emit('pause', previousTracks);
  }

  /**
   * Broadcasts active player list to all clients using websockets.
   *
   * @param activePlayers
   */
  public broadcastActivePlayerList(activePlayers: object): void {
    activePlayers = ActivePlayerHelper.filterActivePlayerListForClient(activePlayers);
    this.socket.to('general').emit('players', activePlayers);
  }

  /**
   * Emits playlist import progress to the importer.
   *
   * @param progress
   */
  public sendPlaylistImportProgress(socketId: string, progress: any): void {
    this.socket.sockets.connected[socketId].emit('playlistProgress', progress);
  }
}
