import { Socket } from 'socket.io';

import { Playlist } from 'models';

import { worker } from './../../src/worker';

const playlistsEvents = (socket: Socket) => {
  socket.on('join', async () => {
    console.log('joined playlists socket');
  });

  socket.on('importPlaylist', async (playlistId: Playlist['id']) => {
    worker.importPlaylist(socket.handshake.session.passport.user, playlistId, socket.id);
  });
};

export default playlistsEvents;
