// import express from 'express';
// import sharedSession from 'express-socket.io-session';
// import SocketIO from 'socket.io';
// import http from 'http';

// import { ActivePlayerHelper } from 'helpers';
// import { GameService } from 'services';

// import { worker } from './../../src/worker';
// import { Room } from '@types';

// let io: SocketIO.Server;

// class Websockets {
//   public static initialize(server: http.Server, session: express.RequestHandler) {
//     io = SocketIO(server);

//     io.use(
//       sharedSession(session, {
//         autoSave: true
//       })
//     );

//     io.of('/rooms')
//       .use(
//         sharedSession(session, {
//           autoSave: true
//         })
//       )
//       .on('connection', socket => {
//         socket.on('join', (data: { roomId: Room['id'] }) => {
//           console.log(socket.handshake.session);

//           console.log(data);
//         });
//         // socket.on('leave', data => {
//         //   console.log(data);
//         // });
//       });

//     // io.on('connection', async socket => {
//     //   console.log('standart connection');

//     // socket.on('message',);
//     // socket.on('disconnect', async () => {
//     //   await GameService.removeActiveUser(socket.id);
//     // });
//     // socket.on('importPlaylist', async ({ playlist }) => {
//     //   worker.importPlaylist(socket.handshake.session.passport.user, playlist.id, socket.id);
//     // });
//     // socket.on('guessProgressUpdate', async guessData => {
//     //   await GameService.updatePlayersGuessProgress(socket.id, guessData);
//     // });
//     // socket.on('join', async roomId => {
//     //   console.log(roomId);
//     //   socket.join(roomId);
//     //   const players = await ActivePlayerHelper.getActivePlayers(roomId);
//     //   players[socket.id] = socket.handshake.session.passport.user;
//     //   await ActivePlayerHelper.setActivePlayers(roomId, players);
//     //   io.in('general').emit('players', ActivePlayerHelper.filterActivePlayerListForClient(players));
//     //   const status = await GameService.getStatus();
//     //   socket.emit('status', status);
//     // });
//     // socket.on('leave', async roomId => {
//     //   socket.leave(roomId);
//     //   const players = await ActivePlayerHelper.getActivePlayers(roomId);
//     //   delete players[socket.id];
//     //   await ActivePlayerHelper.setActivePlayers(roomId, players);
//     //   io.in('general').emit('players', ActivePlayerHelper.filterActivePlayerListForClient(players));
//     // });
//     // });

//     return server;
//   }

//   private namespaces = {};

//   public static close() {
//     io.close();
//   }

//   public static getIo(): SocketIO.Server {
//     return io;
//   }
// }

// export default Websockets;

// import http from 'http';
// import SocketIO from 'socket.io';
// import { RequestHandler } from 'express';
// import SocketIOSession from 'express-socket.io-session';
// import { Namespaces } from 'src/lib/SocketWrapper/types';

// class SocketWrapper {
//   public server!: SocketIO.Server;
//   public namespaces!: Record<Namespaces, SocketIO.Namespace>;

//   public init = (httpServer: http.Server, expressSession: RequestHandler) => {
//     const session = SocketIOSession(expressSession, { autoSave: true });
//     this.server = SocketIO(httpServer, { transports: ['websocket'] });
//     this.server.use(session);

//     this.namespaces = {
//       rooms: this.server.of('/rooms').use(session)
//     };

//     return this.server;
//   };
// }

// export default new SocketWrapper();
