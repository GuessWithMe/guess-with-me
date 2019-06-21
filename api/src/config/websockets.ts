import express from 'express';
import sharedSession from 'express-socket.io-session';
import SocketIO from 'socket.io';

import { ActivePlayerHelper } from '@helpers/ActivePlayerHelper';
import GameService from '@services/Game.service';
import { getStatus } from '@services/SongDistributer.service';
import { worker } from 'src/worker';

let io: SocketIO.Server;

export default class Websockets {
  public static initialize(server: any, session: express.RequestHandler) {
    io = SocketIO(server);

    io.use(
      sharedSession(session, {
        autoSave: true
      })
    );

    io.on('connection', async (socket: any) => {
      socket.on('event', data => {});

      socket.on('disconnect', async () => {
        await GameService.removeActiveUser(socket.id);
      });

      socket.on('importPlaylist', async ({ playlist }) => {
        worker.importPlaylist(socket.handshake.session.passport.user, playlist.id, socket.id);
      });

      socket.on('guessProgressUpdate', async guessData => {
        await GameService.updatePlayersGuessProgress(socket.id, guessData);
      });

      socket.on('join', async data => {
        socket.join('general');

        const players = await ActivePlayerHelper.getActivePlayers();
        players[socket.id] = socket.handshake.session.passport.user;
        await ActivePlayerHelper.setActivePlayers(players);

        io.in('general').emit('players', ActivePlayerHelper.filterActivePlayerListForClient(players));

        const status = await getStatus();
        socket.emit('status', status);
      });

      socket.on('leave', async data => {
        socket.leave('general');

        const players = await ActivePlayerHelper.getActivePlayers();
        delete players[socket.id];
        await ActivePlayerHelper.setActivePlayers(players);

        io.in('general').emit('players', ActivePlayerHelper.filterActivePlayerListForClient(players));
      });
    });

    return server;
  }

  public static getIo(): SocketIO.Server {
    return io;
  }
}
