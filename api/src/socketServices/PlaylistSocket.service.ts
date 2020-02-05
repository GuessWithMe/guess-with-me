import { Socket } from 'socket.io';
import SocketWrapper from 'lib/SocketWrapper';

class PlaylistSocketService {
  private socket: Socket;

  constructor(socket?: Socket) {
    this.socket = socket;
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
    SocketWrapper.namespaces.playlists.to(`${socketId}`).emit('playlistProgress', progress);
  }
}

export default PlaylistSocketService;
